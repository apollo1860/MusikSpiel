// ===========================
// Rate die Dekade – Logik (komplette Datei)
// ===========================
console.log("Check Songs geladen:", {
  songs50s: typeof window.songs50s,
  songs60s: typeof window.songs60s,
  songs70s: typeof window.songs70s,
  songs80s: typeof window.songs80s,
  songs90s: typeof window.songs90s,
  songs00s: typeof window.songs00s || typeof window.songs2000s,
  songs10s: typeof window.songs10s || typeof window.songs2010s,
  songs20s: typeof window.songs20s || typeof window.songs2020s
});

// ---------- Audio ----------
const mainAudio = document.getElementById('mainAudio');
const rickAudio = document.getElementById('rickAudio');

// Rick Roll Pfad relativ zu index.html
const RICK_SRC = 'assets/rickroll.mp3';
rickAudio.src = RICK_SRC;
rickAudio.preload = 'auto';
rickAudio.volume = 1.0;

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

// ---------- Game State ----------
let players = [];
let scores = [];
let roundIndex = 0;               // 0..(roundOrder.length-1)
let starterIndex = 0;             // wer startet die Runde (rotiert)
let turnInRound = 0;              // 0..players.length-1 innerhalb einer Runde
let currentPlayerIndex = 0;

let currentSong = null;           // fest je Zug
let turnStarted = false;          // wurde in diesem Zug schon gestartet?
let clipTimer = null;

let selectedEffect = null;        // optionaler Effekt (Chip)
let turnBasePoints = 0;

let summaryPending = false;       // Zwischenbilanz vor nächster Runde
let lastFinishedRoundNum = 0;     // für Subtitle "Nach Runde X von Y"

// pro DEKADE: bereits verwendete Songs (key = id||src)
const usedByDecade = new Map();

// Rick Overlay State (lauter als Hauptsong)
let rickOverlayActive = false;
let savedMainVol = 1;
function stopRickOverlay(){
  if (!rickOverlayActive) return;
  try {
    rickAudio.pause();
    rickAudio.currentTime = 0;
  } catch(e){}
  if (typeof savedMainVol === 'number') {
    mainAudio.volume = savedMainVol;
  }
  rickOverlayActive = false;
}

// ---------- DOM ----------
const elStartMenu    = document.getElementById('startMenu');
const elPlayerList   = document.getElementById('playerList');
const elAddPlayer    = document.getElementById('addPlayer');
const elStartGame    = document.getElementById('startGame');

const elDecadeOverlay  = document.getElementById('decadeOverlay'); // optional/ungenuzt
const elDecadeText     = document.getElementById('decadeText');

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
const namesBar      = document.getElementById('namesBar'); // Top-Leiste Namen

const playBtn           = document.getElementById('playBtn');
const pauseBtn          = document.getElementById('pauseBtn');
const revealCard        = document.getElementById('revealCard');
const scoreValue        = document.getElementById('scoreValue');
const correctTitleBtn   = document.getElementById('correctTitleBtn');
const correctArtistBtn  = document.getElementById('correctArtistBtn');
const correctYearBtn    = document.getElementById('correctYearBtn');
const wrongBtn          = document.getElementById('wrongBtn');
const nextBtn           = document.getElementById('nextBtn');

const chipGrid          = document.getElementById('chipGrid');
const chipHint          = document.getElementById('chipHint');
const turnPointsEl      = document.getElementById('turnPoints');
const effectNote        = document.getElementById('effectNote');

// FX
const fxOverlay = document.getElementById('fxOverlay');
const fxText    = document.getElementById('fxText');

// Badge-Modal (Popup)
const badgeModal = document.getElementById('badgeModal');
const badgeGrid  = document.getElementById('badgeGrid');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');

// Slot-Overlay (Decade Slot)
const slotOverlay = document.getElementById('slotOverlay');
const slotDecadeLabel = document.getElementById('slotDecadeLabel');
const d0 = document.getElementById('d0');
const d1 = document.getElementById('d1');
const d2 = document.getElementById('d2');
const d3 = document.getElementById('d3');
const SLOT_DIGITS = [d0,d1,d2,d3];

const DIGITS10 = ['0','1','2','3','4','5','6','7','8','9'];
const SLOTS = Array.from({length:4}, () => DIGITS10.slice());

// ---------- Dekaden laden (immer 8 Schlüssel anlegen) ----------
const CHRONO_KEYS = ['50s','60s','70s','80s','90s','00s','10s','20s'];

function arrOrEmpty(x){ return Array.isArray(x) ? x : []; }

// 1) Wenn Registry existiert, übernehmen – danach fehlende Dekaden auffüllen
let decades = [];
if (Array.isArray(window.SONG_DECADES) && window.SONG_DECADES.length){
  const byKey = Object.fromEntries(window.SONG_DECADES.map(d => [d.key, d]));
  CHRONO_KEYS.forEach(k => {
    const d = byKey[k];
    if (d) {
      decades.push({ key: d.key, label: d.label || keyToLabel(k), list: Array.isArray(d.list)? d.list : [] });
    } else {
      decades.push({ key: k, label: keyToLabel(k), list: [] });
    }
  });
} else {
  // 2) Fallback: über globale Arrays – fehlende Dekaden als leere Liste ergänzen
  const D2000 = window.songs2000s ?? window.songs00s ?? window.songs00;
  const D2010 = window.songs2010s ?? window.songs10s ?? window.songs10;
  const D2020 = window.songs2020s ?? window.songs20s ?? window.songs20;

  const guess = {
    '50s': arrOrEmpty(window.songs50s),
    '60s': arrOrEmpty(window.songs60s),
    '70s': arrOrEmpty(window.songs70s),
    '80s': arrOrEmpty(window.songs80s),
    '90s': arrOrEmpty(window.songs90s),
    '00s': arrOrEmpty(D2000),
    '10s': arrOrEmpty(D2010),
    '20s': arrOrEmpty(D2020),
  };
  CHRONO_KEYS.forEach(k => decades.push({ key:k, label:keyToLabel(k), list: guess[k] }));
}

function keyToLabel(key){
  switch(key){
    case '50s': return '1950er';
    case '60s': return '1960er';
    case '70s': return '1970er';
    case '80s': return '1980er';
    case '90s': return '1990er';
    case '00s': return '2000er';
    case '10s': return '2010er';
    case '20s': return '2020er';
    default:    return key;
  }
}

console.log('Geladene Dekaden (mit Längen):',
  decades.map(d => `${d.key}:${d.list?.length||0}`).join(', ')
);

// Map: Dekade-Key -> Index im globalen 'decades'-Array
let DECADE_INDEX_BY_KEY = Object.fromEntries(decades.map((d, i) => [d.key, i]));

// ---------- Rundendekaden (genau 8, zufällig, ohne Wiederholung) ----------
const MAX_ROUNDS = 8;
function shuffle(arr){
  for(let i=arr.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}
// sichere Indizes in CHRONO-Reihenfolge
const ALL_INDICES = CHRONO_KEYS.map(k => DECADE_INDEX_BY_KEY[k]);
let roundOrder = shuffle(ALL_INDICES.slice()); // zufällige Permutation von 8 eindeutigen Indizes

// ---------- Utilities ----------
function getDecadeForRound(rIdx){
  const decIdx = roundOrder[rIdx];
  return decades[decIdx];
}
function getActiveDecade(){
  return getDecadeForRound(roundIndex);
}
function decadeStartYearFromKey(key){
  switch(key){
    case '50s': return 1950;
    case '60s': return 1960;
    case '70s': return 1970;
    case '80s': return 1980;
    case '90s': return 1990;
    case '00s': return 2000;
    case '10s': return 2010;
    case '20s': return 2020;
    default:    return 1950;
  }
}

// ---------- Chips / Effekte ----------
const CHIPS = [
  { id:'first10',  label:'Erste 10s',   sub:'+2 Punkte',  score:{add:2},  type:'segment', start:'first',  duration:10 },
  { id:'last10',   label:'Letzte 10s',  sub:'+3 Punkte',  score:{add:3},  type:'segment', start:'last',   duration:10 },
  { id:'random10', label:'Random 10s',  sub:'+2 Punkte',  score:{add:2},  type:'segment', start:'random', duration:10 },
  { id:'rickroll', label:'Rick Roll',   sub:'+4 Punkte',  score:{add:4},  type:'overlay' },
  { id:'double',   label:'2× Speed',    sub:'+2 Punkte',  score:{add:2},  type:'speed',   rate:2 },
  { id:'first20',  label:'Erste 20s',   sub:'+1 Punkt',   score:{add:1},  type:'segment', start:'first',  duration:20 },
  { id:'first3',   label:'Erste 3s',    sub:'+10 Punkte', score:{add:10}, type:'segment', start:'first',  duration:3 },
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

// ---------- Helpers ----------
function songKey(s){ return s?.id ?? s?.src; }

function clearClipTimer(){
  if (clipTimer){ clearTimeout(clipTimer); clipTimer = null; }
}

function stopAllAudio(){
  clearClipTimer();
  mainAudio.pause(); mainAudio.currentTime = 0;
  rickAudio.pause(); rickAudio.currentTime = 0;
  setPreservePitch(mainAudio, true);
  mainAudio.playbackRate = 1;
  stopRickOverlay();
}

function updateRoundAndTurnLabels() {
  const dec = getActiveDecade();
  const label = dec ? dec.label : `Runde ${roundIndex+1}`;
  elRoundInfo.textContent = `Runde ${roundIndex+1}/${roundOrder.length} – ${label}`;
  elTurnInfo.textContent  = `Dran: ${players[currentPlayerIndex] || '—'}`;
  elCurrentName.textContent = players[currentPlayerIndex] || '—';
  scoreValue.textContent = scores[currentPlayerIndex] ?? 0;
  turnPointsEl.textContent = turnBasePoints;
  highlightCurrentName();
}

function assignSongForCurrentTurn(){
  const dec = getActiveDecade();
  if (!dec){ currentSong = null; return; }
  const list = dec.list || [];
  if (!list.length){
    console.warn('Keine Songs in Dekade:', dec.key, dec.label);
    currentSong = null; 
    return;
  }

  const set = usedByDecade.get(dec.key) || new Set();
  const unused = list.filter(s => !set.has(songKey(s)));
  const pool = unused.length ? unused : list; // Fallback, falls mehr Züge als Songs
  const chosen = pool[Math.floor(Math.random()*pool.length)];
  set.add(songKey(chosen));
  usedByDecade.set(dec.key, set);

  currentSong = chosen;
  mainAudio.src = chosen.src;
  setPreservePitch(mainAudio, true);
  mainAudio.playbackRate = 1;
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

// ---------- Namenleiste + Badges ----------
function buildNamesBar(){
  if (!namesBar) return;
  namesBar.innerHTML = '';
  players.forEach((name, idx)=>{
    const b = document.createElement('button');
    b.className = 'namebtn';
    b.textContent = name;
    b.addEventListener('click', ()=> openBadgeModal(idx));
    namesBar.appendChild(b);
  });
  highlightCurrentName();
}
function highlightCurrentName(){
  if (!namesBar) return;
  [...namesBar.querySelectorAll('.namebtn')].forEach((b,i)=>{
    b.classList.toggle('current', i===currentPlayerIndex);
  });
}

// ► Badge-Modal (chronologische Anzeige; Fortschritt anhand globaler roundOrder)
function openBadgeModal(pIdx){
  if (!badgeModal) return;
  modalTitle.textContent = `Dekaden von ${players[pIdx]}`;
  badgeGrid.innerHTML = '';

  // Chronologische Anzeige nach CHRONO_KEYS (immer 8)
  const chronoDecs = CHRONO_KEYS
    .map(key => decades[DECADE_INDEX_BY_KEY[key]])
    .filter(Boolean);

  chronoDecs.forEach((dec) => {
    const div = document.createElement('div');
    div.className = 'badge';
    div.dataset.dec = dec.key;
    div.textContent = dec.key; // oder dec.label

    const decIdx = DECADE_INDEX_BY_KEY[dec.key];
    const posInRounds = roundOrder.indexOf(decIdx); // 0..7

    // done, wenn diese Dekade vor der aktuellen Runde dran war
    const done = posInRounds !== -1 && (
      posInRounds < roundIndex ||
      (posInRounds === roundIndex && pIdx < currentPlayerIndex)
    );
    const isCurrent = (posInRounds === roundIndex && pIdx === currentPlayerIndex);

    if (done)     div.classList.add('done');
    if (isCurrent) div.classList.add('current');

    badgeGrid.appendChild(div);
  });

  badgeModal.style.display = 'flex';
}

if (closeModal) closeModal.addEventListener('click', ()=> badgeModal.style.display = 'none');
if (badgeModal) badgeModal.addEventListener('click', (e)=>{
  if (e.target === badgeModal) badgeModal.style.display = 'none';
});

// ---------- Slot-Animation (bunt/quer; Größe via CSS gesteuert) ----------
function showSlotForDecade(dec, onDone){
  if (!slotOverlay) { onDone && onDone(); return; }
  const baseYear = decadeStartYearFromKey(dec?.key || '50s'); // 1950, 1960, ...
  slotDecadeLabel.textContent = dec?.label || '—';
  slotOverlay.style.display = 'flex'; // CSS macht es bunt/quer/kleiner

  const target = String(baseYear).padStart(4,'0').split(''); // ["1","9","5","0"]

  const idx = [0,0,0,0];
  const tick = [60, 75, 90, 105];
  let last = [0,0,0,0];
  let startTime = performance.now();
  let spinning = true;

  function raf(now){
    if (!spinning) return;
    for (let i=0;i<4;i++){
      if (now - last[i] >= tick[i]){
        idx[i] = (idx[i] + 1) % SLOTS[i].length;
        SLOT_DIGITS[i].textContent = SLOTS[i][idx[i]];
        last[i] = now;
      }
    }
    if (now - startTime >= 2000){
      spinning = false; settleAll(); return;
    }
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  function settleAll(){
    let finished = 0;
    const stagger = [0,120,240,360];
    for (let i=0;i<4;i++){
      setTimeout(()=>{
        const settleTick = 45;
        const tChar = target[i];
        const step = ()=>{
          if (SLOTS[i][idx[i]] === tChar){
            finished++;
            if (finished === 4){
              setTimeout(()=>{ 
                slotOverlay.style.display = 'none'; 
                onDone && onDone(); 
              }, 500);
            }
            return;
          }
          idx[i] = (idx[i] + 1) % SLOTS[i].length;
          SLOT_DIGITS[i].textContent = SLOTS[i][idx[i]];
          setTimeout(step, settleTick);
        };
        step();
      }, stagger[i]);
    }
  }
}

// ---------- Startmenü ----------
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

  // Globale Reihenfolge von GENAU 8 Dekaden (ohne Wiederholung), in CHRONO-Basis
  DECADE_INDEX_BY_KEY = Object.fromEntries(decades.map((d, i) => [d.key, i]));
  const allIdx = CHRONO_KEYS.map(k => DECADE_INDEX_BY_KEY[k]); // 8 Indizes
  roundOrder = shuffle(allIdx.slice());
  console.log('Rundenreihenfolge (keys):', roundOrder.map(i => decades[i].key).join(', '));

  // UI vorbereiten
  elStartMenu.classList.add('hidden');
  buildNamesBar();

  roundIndex = 0;
  starterIndex = 0;
  turnInRound = 0;
  currentPlayerIndex = (starterIndex + turnInRound) % players.length;

  buildChips();
  resetTurnState(true);
  updateRoundAndTurnLabels();

  proceedFlow();
});

// ---------- Flow ----------
function proceedFlow(){
  if (summaryPending) { showSummary(); return; }

  // Spielende?
  if (roundIndex >= roundOrder.length) {
    alert('🎉 Spiel beendet! Danke fürs Mitspielen.');
    elGame.classList.add('hidden');
    elHandoff.classList.add('hidden');
    elStartMenu.classList.remove('hidden');
    return;
  }

  showHandoff();
}

function showHandoff(){
  stopAllAudio();
  revealCard.textContent = '❓';
  revealCard.classList.remove('flipped');
  nextBtn.classList.add('hidden');

  currentPlayerIndex = (starterIndex + turnInRound) % players.length;
  resetTurnState(true);
  updateRoundAndTurnLabels();

  // Song für diesen Zug jetzt fest auswählen (Dekade der aktuellen Runde)
  assignSongForCurrentTurn();

  const who = players[currentPlayerIndex];
  elHandoffText.textContent  = `Bitte das Handy an ${who} geben!`;

  elGame.classList.add('hidden');
  elHandoff.classList.remove('hidden');
}

document.getElementById('handoffContinue').addEventListener('click', () => {
  const dec = getActiveDecade();
  showSlotForDecade(dec, () => {
    elHandoff.classList.add('hidden');
    elGame.classList.remove('hidden');
  });
});

// ---------- Zwischenbilanz ----------
function showSummary(){
  const data = players.map((name, i)=>({ name, score: scores[i] ?? 0 }));
  data.sort((a,b)=> b.score - a.score);

  const totalRounds = roundOrder.length; // = 8
  elSummarySubtitle.textContent = `Nach Runde ${lastFinishedRoundNum} von ${totalRounds}`;

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

  elGame.classList.add('hidden');
  elHandoff.classList.add('hidden');
  elSummaryOverlay.classList.remove('hidden');
}

elSummaryContinue.addEventListener('click', ()=>{
  elSummaryOverlay.classList.add('hidden');
  summaryPending = false;

  if (roundIndex >= roundOrder.length) {
    proceedFlow();
    return;
  }
  proceedFlow();
});

// ---------- Next (nächster Spieler / nächste Runde) ----------
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
    lastFinishedRoundNum = roundIndex;

    // Zwischenbilanz vor nächster Runde
    summaryPending = true;
  }
  proceedFlow();
});

// ---------- Audio / Abspielen ----------
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
    stopRickOverlay(); // falls aus vorherigem Zug noch aktiv
    setPreservePitch(mainAudio, true);
    mainAudio.playbackRate = 1;

    if (selectedEffect){
      const eff = selectedEffect;
      effectNote.textContent = `Effekt aktiv: ${eff.sub}`;

      if (eff.type === 'segment'){
        playSegment(mainAudio, eff.start, eff.duration);

      } else if (eff.type === 'overlay'){
        // Rick lauter als Hauptsong – Hauptsong leicht abducken
        rickAudio.currentTime = 0;

        savedMainVol = mainAudio.volume ?? 1;
        mainAudio.volume = 0.65;   // ducking
        rickAudio.volume = 1.0;    // laut

        rickOverlayActive = true;

        Promise.allSettled([
          mainAudio.play(),
          rickAudio.play()
        ]).then(() => {
          mainAudio.addEventListener('ended', stopRickOverlay, { once: true });
        }).catch(err => console.warn('Parallel play failed:', err));

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
    if (selectedEffect?.id === 'rickroll' && rickOverlayActive) {
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
    if (selectedEffect?.id === 'rickroll' && rickOverlayActive) {
      rickAudio.play().catch(()=>{});
    }
    pauseBtn.textContent = '⏸️ Pause';
  }
});

// Reveal / Lösung – stoppt Audio & zeigt „Weiter“ (robust, auch ohne Song)
revealCard.addEventListener('click', () => {
  // Immer Audio stoppen
  mainAudio.pause();
  stopRickOverlay();

  if (!currentSong) {
    revealCard.textContent = 'Kein Song für diese Dekade hinterlegt';
    revealCard.classList.add('flipped');
    nextBtn.classList.remove('hidden');
    return;
  }

  const y = currentSong.year ? ` (${currentSong.year})` : '';
  revealCard.textContent = `${currentSong.title} – ${currentSong.artist}${y}`;
  revealCard.classList.add('flipped');
  nextBtn.classList.remove('hidden');
});

// ---------- Punkte ----------
function resetTurnState(resetChip=false){
  turnBasePoints = 0;
  turnStarted = false;
  turnPointsEl.textContent = '0';

  correctTitleBtn.disabled = false;
  correctArtistBtn.disabled = false;
  correctYearBtn.disabled  = false;
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
  correctYearBtn.disabled  = true;
  wrongBtn.disabled = true;
});

// Endgültige Rundensumme (mit Effekt) berechnen
function computeTurnDelta(){
  let subtotal = turnBasePoints; // -2, 0, 1, 2, 3 ...
  const eff = selectedEffect;

  if (subtotal <= 0) return subtotal;
  if (!eff) return subtotal;

  if (eff.score?.mult) return subtotal * eff.score.mult; // ×2
  if (eff.score?.add)  return subtotal + eff.score.add;  // +1/+2/… (+10 bei first3)
  return subtotal;
}
