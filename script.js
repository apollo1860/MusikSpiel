// ===========================
// Musik-Trinkspiel – Logik
// ===========================
console.log("Check Songs geladen:", {
  songs50s: typeof window.songs50s,
  songs60s: typeof window.songs60s,
  songs70s: typeof window.songs70s,
  songs80s: typeof window.songs80s,
  songs90s: typeof window.songs90s,
  songs00s: typeof window.songs00s,
  songs10s: typeof window.songs10s,
  songs20s: typeof window.songs20s
});

// Feste Audio-Elemente (stabil für paralleles Abspielen)
const mainAudio = document.getElementById('mainAudio');
const rickAudio = document.getElementById('rickAudio');

// *** HIER: exakter Pfad relativ zur index.html ***
const RICK_SRC = 'assets/rickroll.mp3';
rickAudio.src = RICK_SRC;
rickAudio.preload = 'auto';
rickAudio.volume = 0.6;

// (optional, aber hilfreich)
let rickReady = false;
rickAudio.addEventListener('canplaythrough', () => rickReady = true);
rickAudio.addEventListener('error', () => {
  rickReady = false;
  console.warn('Rick MP3 nicht gefunden:', rickAudio.src);
});

function setPreservePitch(el, keep){
  if ('preservesPitch' in el) el.preservesPitch = keep;
  if ('mozPreservesPitch' in el) el.mozPreservesPitch = keep;
  if ('webkitPreservesPitch' in el) el.webkitPreservesPitch = keep;
}

// --- Spiel-States ---
let players = [];
let scores = [];
let roundIndex = 0;               // 0..decades.length-1
let starterIndex = 0;             // wer startet die Runde (rotiert)
let turnInRound = 0;              // 0..players.length-1 innerhalb einer Runde
let currentPlayerIndex = 0;

let currentSong = null;           // fest je Zug
let turnStarted = false;          // wurde in diesem Zug schon gestartet?
let clipTimer = null;

let needRoundOverlay = false;     // Dekaden-Animation vor Start einer Runde?
let selectedEffect = null;        // optionaler Effekt
let turnBasePoints = 0;

let summaryPending = false;       // Zwischenbilanz soll gezeigt werden
let lastFinishedRoundNum = 0;     // für Subtitle "Nach Runde X von Y"

// pro Runde: bereits verwendete Songs (key = id||src)
let usedSrcThisRound = new Set();

// --- DOM Refs ---
const elStartMenu   = document.getElementById('startMenu');
const elPlayerList  = document.getElementById('playerList');
const elAddPlayer   = document.getElementById('addPlayer');
const correctYearBtn = document.getElementById('correctYearBtn');
const elStartGame   = document.getElementById('startGame');

const elDecadeOverlay = document.getElementById('decadeOverlay');
const elDecadeText    = document.getElementById('decadeText');

const elSummaryOverlay = document.getElementById('summaryOverlay');
const elSummarySubtitle= document.getElementById('summarySubtitle');
const elSummaryList    = document.getElementById('summaryList');
const elSummaryContinue= document.getElementById('summaryContinue');

const elHandoff     = document.getElementById('handoff');
const elHandoffText = document.getElementById('handoffText');

const elGame        = document.getElementById('game');
const elRoundInfo   = document.getElementById('round-info');
const elTurnInfo    = document.getElementById('turn-info');
const elCurrentName = document.getElementById('currentPlayerName');

const playBtn           = document.getElementById('playBtn');
const pauseBtn          = document.getElementById('pauseBtn');
const revealCard        = document.getElementById('revealCard');
const scoreValue        = document.getElementById('scoreValue');
const correctTitleBtn   = document.getElementById('correctTitleBtn');
const correctArtistBtn  = document.getElementById('correctArtistBtn');
const wrongBtn          = document.getElementById('wrongBtn');
const nextBtn           = document.getElementById('nextBtn');

const chipGrid          = document.getElementById('chipGrid');
const chipHint          = document.getElementById('chipHint');
const turnPointsEl      = document.getElementById('turnPoints');
const effectNote        = document.getElementById('effectNote');

// FX
const fxOverlay = document.getElementById('fxOverlay');
const fxText    = document.getElementById('fxText');

// --- Dekaden ermitteln (nur die, die du eingebunden hast) ---
const decades = [];
if (typeof songs50s   !== 'undefined') decades.push({key:'50s', label:'1950er', list:songs50s});
if (typeof songs60s   !== 'undefined') decades.push({key:'60s', label:'1960er', list:songs60s});
if (typeof songs70s   !== 'undefined') decades.push({key:'70s', label:'1970er', list:songs70s});
if (typeof songs80s   !== 'undefined') decades.push({key:'80s', label:'1980er', list:songs80s});
if (typeof songs90s   !== 'undefined') decades.push({key:'90s', label:'1990er', list:songs90s});
if (typeof songs2000s !== 'undefined') decades.push({key:'00s', label:'2000er', list:songs2000s});
if (typeof songs2010s !== 'undefined') decades.push({key:'10s', label:'2010er', list:songs2010s});
if (typeof songs2020s !== 'undefined') decades.push({key:'20s', label:'2020er', list:songs2020s});
if (decades.length === 0) decades.push({key:'local', label:'Songs', list: []}); // Fallback

// ------------------------
// Chips / Effekte
// ------------------------
const CHIPS = [
  { id:'first10',  label:'Erste 10s',   sub:'+2 Punkte',        score:{add:2}, type:'segment', start:'first', duration:10 },
  { id:'last10',   label:'Letzte 10s',  sub:'+3 Punkte',        score:{add:3}, type:'segment', start:'last',  duration:10 },
  { id:'random10', label:'Random 10s',  sub:'+2 Punkte',        score:{add:2},  type:'segment', start:'random',duration:10 },
  { id:'rickroll', label:'Rick Roll',   sub:'+4 Punkte',     score:{add:4}, type:'overlay', duration:10 },
  { id:'double',   label:'2× Speed',    sub:'+2 Punkte',         score:{add:2},  type:'speed',   rate:2 },
  { id:'first20',  label:'Erste 20s',   sub:'+1 Punkt',        score:{add:1},  type:'segment', start:'first', duration:20 },
];

function buildChips(){
  chipGrid.innerHTML = '';
  CHIPS.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.id = ch.id;
    btn.innerHTML = `<div class="title">${ch.label}</div><div class="sub">${ch.sub}</div>`;
    btn.addEventListener('click', ()=>{
      if (chipGrid.classList.contains('disabled')) return; // nach erstem Play gesperrt
      if (selectedEffect && selectedEffect.id === ch.id) {
        selectedEffect = null;
        btn.classList.remove('selected');
        chipHint.textContent = 'Kein Effekt gewählt.';
        effectNote.textContent = '';
        [...chipGrid.querySelectorAll('.chip')].forEach(b=>b.classList.remove('selected'));
      } else {
        selectedEffect = ch;
        [...chipGrid.querySelectorAll('.chip')].forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected');
        chipHint.textContent = `${ch.label} – ${ch.sub}`;
        effectNote.textContent = `Effekt aktiv: ${ch.sub}`;
      }
    });
    chipGrid.appendChild(btn);
  });
}

// ------------------------
// Helpers
// ------------------------
function songKey(s){ return s?.id ?? s?.src; }

function stopAllAudio(){
  clearClipTimer();
  mainAudio.pause(); mainAudio.currentTime = 0;
  rickAudio.pause(); rickAudio.currentTime = 0;
  setPreservePitch(mainAudio, true);
  mainAudio.playbackRate = 1;
}
function clearClipTimer(){
  if (clipTimer){ clearTimeout(clipTimer); clipTimer = null; }
}
function updateRoundAndTurnLabels() {
  const dec = decades[roundIndex];
  const label = dec ? dec.label : `Runde ${roundIndex+1}`;
  elRoundInfo.textContent = `Runde ${roundIndex+1} – ${label}`;
  elTurnInfo.textContent  = `Dran: ${players[currentPlayerIndex] || '—'}`;
  elCurrentName.textContent = players[currentPlayerIndex] || '—';
  scoreValue.textContent = scores[currentPlayerIndex] ?? 0;
  turnPointsEl.textContent = turnBasePoints;
}
function getActiveDecadeSongs(){
  const dec = decades[roundIndex];
  return (dec && dec.list && dec.list.length) ? dec.list : [];
}
function pickSongForTurnAvoidingUsed(){
  const list = getActiveDecadeSongs();
  if (!list.length) return null;
  const unused = list.filter(s => !usedSrcThisRound.has(songKey(s)));
  const pool = unused.length ? unused : list; // fallback, falls zu wenige Songs
  const chosen = pool[Math.floor(Math.random()*pool.length)];
  const key = songKey(chosen);
  if (!usedSrcThisRound.has(key)) usedSrcThisRound.add(key);
  return chosen;
}
function assignSongForCurrentTurn(){
  currentSong = pickSongForTurnAvoidingUsed();
  if (currentSong){
    mainAudio.src = currentSong.src;
    setPreservePitch(mainAudio, true);
    mainAudio.playbackRate = 1;
  }
}

// Scrabble-Style FX
function showFx(label){
  if (!label) return;
  fxText.textContent = label;
  fxOverlay.classList.remove('hidden');
  fxText.style.animation = 'none'; void fxText.offsetWidth; fxText.style.animation = '';
  setTimeout(()=>{ fxOverlay.classList.add('hidden'); }, 1200);
}
function effectBadgeForCurrentTurn(){
  if (turnBasePoints <= 0 || !selectedEffect) return null;
  if (selectedEffect.score?.mult) return `×${selectedEffect.score.mult}`;
  if (selectedEffect.score?.add)  return `+${selectedEffect.score.add}`;
  return null;
}

// ------------------------
// Startmenü
// ------------------------
elAddPlayer.addEventListener('click', () => {
  const row = document.createElement('div');
  row.className = 'name-row';
  row.innerHTML = `<input class="nameInput" type="text" placeholder="Spielername">`;
  elPlayerList.appendChild(row);
});

elStartGame.addEventListener('click', () => {
  const names = [...document.querySelectorAll('.nameInput')]
    .map(i => (i.value || '').trim())
    .filter(Boolean);

  if (names.length < 1) {
    alert('Bitte mindestens einen Spielernamen eingeben.');
    return;
  }

  players = names;
  scores = new Array(players.length).fill(0);

  elStartMenu.classList.add('hidden');

  roundIndex = 0;
  starterIndex = 0;
  turnInRound = 0;
  usedSrcThisRound = new Set();      // neue Runde → Set leeren
  currentPlayerIndex = (starterIndex + turnInRound) % players.length;

  buildChips();
  resetTurnState(true);
  updateRoundAndTurnLabels();
  needRoundOverlay = true;
  proceedFlow();
});

// ------------------------
// Runden- & Zug-Flow
// ------------------------
function proceedFlow(){
  // 1) Zwischenbilanz zuerst, falls angefordert
  if (summaryPending) { showSummary(); return; }

  // 2) Spielende?
  if (roundIndex >= decades.length) {
    alert('🎉 Spiel beendet! Danke fürs Mitspielen.');
    elGame.classList.add('hidden');
    elHandoff.classList.add('hidden');
    elStartMenu.classList.remove('hidden');
    return;
  }

  // 3) Start der nächsten Runde: erst Dekaden-Animation, dann Handoff
  const decLabel = decades[roundIndex]?.label || `Runde ${roundIndex+1}`;
  if (needRoundOverlay) {
    showDecadeOverlay(decLabel, () => { needRoundOverlay = false; showHandoff(); });
  } else {
    showHandoff();
  }
}

function showDecadeOverlay(label, cb){
  stopAllAudio();
  elDecadeText.textContent = label;
  elDecadeOverlay.classList.remove('hidden');
  elDecadeText.style.animation = 'none'; void elDecadeText.offsetWidth; elDecadeText.style.animation = '';
  setTimeout(()=>{
    elDecadeOverlay.classList.add('hidden');
    if (typeof cb === 'function') cb();
  }, 1600);
}

function showHandoff(){
  stopAllAudio();
  revealCard.textContent = '❓';
  revealCard.classList.remove('flipped');
  nextBtn.classList.add('hidden');

  currentPlayerIndex = (starterIndex + turnInRound) % players.length;
  resetTurnState(true);
  updateRoundAndTurnLabels();

  // Song für diesen Zug jetzt fest auswählen
  assignSongForCurrentTurn();

  const who = players[currentPlayerIndex];
  document.getElementById('handoffText').textContent  = `Bitte das Handy an ${who} geben!`;

  elGame.classList.add('hidden');
  elHandoff.classList.remove('hidden');
}

document.getElementById('handoffContinue').addEventListener('click', () => {
  elHandoff.classList.add('hidden');
  elGame.classList.remove('hidden');
});

// --- Zwischenbilanz Overlay ---
function showSummary(){
  // Liste name/score bauen & sortieren
  const data = players.map((name, i)=>({ name, score: scores[i] ?? 0 }));
  data.sort((a,b)=> b.score - a.score);

  // Subtitle: Nach Runde X von Y
  const totalRounds = decades.length;
  elSummarySubtitle.textContent = `Nach Runde ${lastFinishedRoundNum} von ${totalRounds}`;

  // Einträge rendern
  elSummaryList.innerHTML = '';
  data.forEach((row, idx)=>{
    const li = document.createElement('li');
    li.className = 'summary-item';
    li.innerHTML = `
      <span class="rank">${idx+1}.</span>
      <span class="name">${row.name}</span>
      <span class="pts">${row.score} Punkte</span>
    `;
    elSummaryList.appendChild(li);
  });

  // Overlay zeigen, alles andere aus
  elGame.classList.add('hidden');
  elHandoff.classList.add('hidden');
  elSummaryOverlay.classList.remove('hidden');
}

elSummaryContinue.addEventListener('click', ()=>{
  elSummaryOverlay.classList.add('hidden');
  summaryPending = false;

  // Wenn Spiel schon vorbei, jetzt beenden
  if (roundIndex >= decades.length) {
    proceedFlow(); // führt ins Spielende
    return;
  }

  // Sonst die nächste Dekaden-Animation starten
  needRoundOverlay = true;
  proceedFlow();
});

// ------------------------
// Weiter zum nächsten Spieler / nächste Runde
// ------------------------
nextBtn.addEventListener('click', () => {
  stopAllAudio();

  const badge = effectBadgeForCurrentTurn();
  if (badge) showFx(badge);

  const delta = computeTurnDelta();
  scores[currentPlayerIndex] = (scores[currentPlayerIndex] ?? 0) + delta;

  turnInRound++;
  if (turnInRound >= players.length) {
    // Rundenschluss
    turnInRound = 0;
    starterIndex = (starterIndex + 1) % players.length;
    roundIndex++;
    lastFinishedRoundNum = roundIndex; // für „Nach Runde X“
    usedSrcThisRound = new Set();      // neue Runde → Reset Duplikate

    // Vor nächster Dekaden-Animation erst die Zwischenbilanz zeigen
    summaryPending = true;
  }
  proceedFlow();
});

// ------------------------
// Audio & Abspiel-Logik
// ------------------------
function playSegment(audio, startStrategy, lengthSec){
  const startPlayback = ()=>{
    const dur = audio.duration || 0;
    let start = 0;
    if (startStrategy === 'last') {
      start = Math.max(0, dur - lengthSec);
    } else if (startStrategy === 'random') {
      start = Math.max(0, dur > lengthSec ? Math.random()*(dur - lengthSec) : 0);
    } // else 'first' -> 0
    audio.currentTime = start;
    audio.play().catch(()=>{});
    clearClipTimer();
    clipTimer = setTimeout(()=>{ audio.pause(); }, lengthSec*1000);
  };
  if (isNaN(audio.duration) || !isFinite(audio.duration)){
    audio.addEventListener('loadedmetadata', function once(){
      audio.removeEventListener('loadedmetadata', once);
      startPlayback();
    });
    audio.load();
  } else {
    startPlayback();
  }
}

playBtn.addEventListener('click', () => {
  if (!currentSong) {
    assignSongForCurrentTurn();
    if (!currentSong) {
      alert('Für diese Dekade sind noch keine Songs eingebunden.');
      return;
    }
  }

  if (!turnStarted){
    // Chips sperren (max. 1 Effekt)
    chipGrid.classList.add('disabled');

    // Reset Audio-Zustand
    clearClipTimer();
    rickAudio.pause(); rickAudio.currentTime = 0;
    setPreservePitch(mainAudio, true);
    mainAudio.playbackRate = 1;

    if (selectedEffect){
      const eff = selectedEffect;
      effectNote.textContent = `Effekt aktiv: ${eff.sub}`;

      if (eff.type === 'segment'){
        playSegment(mainAudio, eff.start, eff.duration);
      } else if (eff.type === 'overlay'){
        mainAudio.play().catch(()=>{});
        rickAudio.currentTime = 0;
        rickAudio.play().catch(()=>{});
        clearClipTimer();
        clipTimer = setTimeout(()=>{ rickAudio.pause(); }, (eff.duration || 10)*1000);
      } else if (eff.type === 'speed'){
        setPreservePitch(mainAudio, true);
        mainAudio.playbackRate = eff.rate || 2;
        mainAudio.play().catch(()=>{});
      } else {
        mainAudio.play().catch(()=>{});
      }
    } else {
      effectNote.textContent = '';
      mainAudio.play().catch(()=>{});
    }

    turnStarted = true;
    pauseBtn.textContent = '⏸️ Pause';
    return;
  }

  // Resume (gleicher Song)
  if (mainAudio.paused) {
    mainAudio.play().catch(()=>{});
    if (selectedEffect?.id === 'rickroll' && rickAudio.currentTime > 0 && rickAudio.currentTime < (selectedEffect.duration||10)) {
      rickAudio.play().catch(()=>{});
    }
    pauseBtn.textContent = '⏸️ Pause';
  }
});

// Pause / Weiter
pauseBtn.addEventListener('click', () => {
  if (!turnStarted) return;
  if (!mainAudio.paused) {
    mainAudio.pause();
    if (!rickAudio.paused) rickAudio.pause();
    pauseBtn.textContent = '▶️ Weiter';
  } else {
    mainAudio.play().catch(()=>{});
    if (selectedEffect?.id === 'rickroll' && rickAudio.currentTime > 0 && rickAudio.currentTime < (selectedEffect.duration||10)) {
      rickAudio.play().catch(()=>{});
    }
    pauseBtn.textContent = '⏸️ Pause';
  }
});

// Reveal / Lösung – stoppt Audio & zeigt „Weiter“
revealCard.addEventListener('click', () => {
  if (!currentSong) return;
  const y = currentSong.year ? ` (${currentSong.year})` : '';
  revealCard.textContent = `${currentSong.title} – ${currentSong.artist}${y}`;
  revealCard.classList.add('flipped');
  mainAudio.pause(); rickAudio.pause();
  nextBtn.classList.remove('hidden');
});


// ------------------------
// Punkte-Buttons / Zugpunkte
// ------------------------
function resetTurnState(resetChip=false){
  turnBasePoints = 0;
  turnStarted = false;
  turnPointsEl.textContent = '0';

  correctTitleBtn.disabled = false;
  correctArtistBtn.disabled = false;
  correctYearBtn.disabled  = false;   // ← NEU
  wrongBtn.disabled = false;

  if (resetChip) {
    selectedEffect = null;
    effectNote.textContent = '';
    chipHint.textContent = 'Kein Effekt gewählt.';
    [...chipGrid.querySelectorAll('.chip')].forEach(b=>b.classList.remove('selected'));
    chipGrid.classList.remove('disabled');
  }
}

function applyBasePointChange(delta){
  if (turnBasePoints === -2 && delta > 0) return;
  turnBasePoints += delta;
  turnPointsEl.textContent = String(turnBasePoints);
}
correctTitleBtn.addEventListener('click', () => {
  applyBasePointChange(1);
  wrongBtn.disabled = true;
  correctTitleBtn.disabled = true;
});
correctArtistBtn.addEventListener('click', () => {
  applyBasePointChange(1);
  wrongBtn.disabled = true;
  correctArtistBtn.disabled = true;
});
  
correctYearBtn.addEventListener('click', () => {
  applyBasePointChange(1);
  wrongBtn.disabled = true;      // wenn irgendwas richtig ist, kein „Nichts gewusst“
  correctYearBtn.disabled = true;
});

wrongBtn.addEventListener('click', () => {
  turnBasePoints = -2;
  turnPointsEl.textContent = '-2';
  correctTitleBtn.disabled = true;
  correctArtistBtn.disabled = true;
  correctYearBtn.disabled  = true;   // ← NEU
  wrongBtn.disabled = true;
});

// Endgültige Rundensumme (mit Effekt) berechnen
function computeTurnDelta(){
  let subtotal = turnBasePoints; // -2, 0, 1, 2
  const eff = selectedEffect;

  if (subtotal <= 0) return subtotal;
  if (!eff) return subtotal;

  if (eff.score?.mult) return subtotal * eff.score.mult; // ×2
  if (eff.score?.add)  return subtotal + eff.score.add;  // +1/+2
  return subtotal;
}
