// ===========================
// Musik-Trinkspiel – Logik
// ===========================

// Rickroll vorbereiten (Pfad ggf. anpassen)
const rickRoll = new Audio('assets/mp3/rickroll.mp3');
rickRoll.volume = 0.3;

// --- Spiel-States ---
let players = [];                 // ['Name1','Name2',...]
let scores = [];                  // [0,0,...] gleiche Länge wie players
let roundIndex = 0;               // 0..(decades.length-1)
let starterIndex = 0;             // welcher Spieler startet eine Runde (rotiert)
let turnInRound = 0;              // 0..players.length-1 innerhalb einer Runde
let currentPlayerIndex = 0;       // globaler Index (0..players.length-1)
let currentSong = null;
let currentAudio = null;
let needRoundOverlay = false;     // zeigt an, ob vor dem nächsten Zug die Dekaden-Animation gezeigt werden soll

// --- DOM Refs: Startmenü / Decade Overlay / Handoff / Game ---
const elStartMenu   = document.getElementById('startMenu');
const elPlayerList  = document.getElementById('playerList');
const elAddPlayer   = document.getElementById('addPlayer');
const elStartGame   = document.getElementById('startGame');

const elDecadeOverlay = document.getElementById('decadeOverlay');
const elDecadeText    = document.getElementById('decadeText');

const elHandoff     = document.getElementById('handoff');
const elHandoffText = document.getElementById('handoffText');
const elHandoffTitle= document.getElementById('handoffTitle');
const elHandoffGo   = document.getElementById('handoffContinue');

const elGame        = document.getElementById('game');
const elRoundInfo   = document.getElementById('round-info');
const elTurnInfo    = document.getElementById('turn-info');
const elCurrentName = document.getElementById('currentPlayerName');

// Spiel-UI
const playBtn           = document.getElementById('playBtn');
const pauseBtn          = document.getElementById('pauseBtn');
const revealCard        = document.getElementById('revealCard');
const scoreValue        = document.getElementById('scoreValue');
const correctTitleBtn   = document.getElementById('correctTitleBtn');
const correctArtistBtn  = document.getElementById('correctArtistBtn');
const wrongBtn          = document.getElementById('wrongBtn');
const nextBtn           = document.getElementById('nextBtn');

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

if (decades.length === 0) {
  decades.push({key:'local', label:'Songs', list: []}); // Fallback
}

// ------------------------
// Helpers
// ------------------------
function stopAllAudio(){
  if (currentAudio){ currentAudio.pause(); currentAudio.currentTime = 0; }
  if (!rickRoll.paused){ rickRoll.pause(); rickRoll.currentTime = 0; }
}

function updateRoundAndTurnLabels() {
  const dec = decades[roundIndex];
  const label = dec ? dec.label : `Runde ${roundIndex+1}`;
  elRoundInfo.textContent = `Runde ${roundIndex+1} – ${label}`;
  elTurnInfo.textContent  = `Dran: ${players[currentPlayerIndex] || '—'}`;
  elCurrentName.textContent = players[currentPlayerIndex] || '—';
  scoreValue.textContent = scores[currentPlayerIndex] ?? 0;
}

function getActiveDecadeSongs(){
  const dec = decades[roundIndex];
  return (dec && dec.list && dec.list.length) ? dec.list : [];
}

function getRandomSong(){
  const list = getActiveDecadeSongs();
  if (!list.length) return null;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}

// Dekaden-Overlay zeigen (kurz) und dann callback ausführen
function showDecadeOverlay(label, cb){
  stopAllAudio();
  elDecadeText.textContent = label;
  elDecadeOverlay.classList.remove('hidden');

  // Animation neu starten (falls mehrfach)
  elDecadeText.style.animation = 'none';
  // reflow
  void elDecadeText.offsetWidth;
  elDecadeText.style.animation = '';

  // Nach kurzer Zeit ausblenden und fortsetzen
  const DURATION_MS = 1600; // "wenige Sekunden" – knackig kurz
  setTimeout(()=>{
    elDecadeOverlay.classList.add('hidden');
    if (typeof cb === 'function') cb();
  }, DURATION_MS);
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

  // Menü aus -> Erste Rundendekade animieren -> Handoff Spieler 1
  elStartMenu.classList.add('hidden');

  roundIndex = 0;
  starterIndex = 0;   // Runde 1: Spieler 1 startet
  turnInRound = 0;
  currentPlayerIndex = (starterIndex + turnInRound) % players.length;

  updateRoundAndTurnLabels();
  needRoundOverlay = true;
  proceedFlow();
});

// ------------------------
// Runden- & Zug-Flow
// ------------------------
function proceedFlow(){
  // Spielende?
  if (roundIndex >= decades.length) {
    alert('🎉 Spiel beendet! Danke fürs Mitspielen.');
    // zurück zum Start
    elGame.classList.add('hidden');
    elHandoff.classList.add('hidden');
    elStartMenu.classList.remove('hidden');
    return;
  }

  const decLabel = decades[roundIndex]?.label || `Runde ${roundIndex+1}`;

  // Wenn Overlay gewünscht (Start einer Runde): erst Dekade zeigen, dann Handoff
  if (needRoundOverlay) {
    showDecadeOverlay(decLabel, () => {
      needRoundOverlay = false;
      showHandoff();
    });
  } else {
    showHandoff();
  }
}

function showHandoff(){
  stopAllAudio();
  revealCard.textContent = '❓';
  revealCard.classList.remove('flipped');
  nextBtn.classList.add('hidden');

  currentPlayerIndex = (starterIndex + turnInRound) % players.length;
  updateRoundAndTurnLabels();

  const who = players[currentPlayerIndex];
  elHandoffTitle.textContent = `Nächster Spieler`;
  elHandoffText.textContent  = `Bitte das Handy an ${who} geben!`;

  elGame.classList.add('hidden');
  elHandoff.classList.remove('hidden');
}

elHandoffGo.addEventListener('click', () => {
  elHandoff.classList.add('hidden');
  elGame.classList.remove('hidden');
});

// Weiter zum nächsten Spieler / nächste Runde
nextBtn.addEventListener('click', () => {
  stopAllAudio();

  // Nächster Spieler in dieser Runde
  turnInRound++;

  if (turnInRound >= players.length) {
    // Runde fertig -> nächste Runde
    turnInRound = 0;
    starterIndex = (starterIndex + 1) % players.length; // Starter rotiert
    roundIndex++;
    if (roundIndex < decades.length) {
      needRoundOverlay = true;  // beim Start der neuen Runde wieder Animation zeigen
    }
  }

  proceedFlow();
});

// ------------------------
// Audio & Abspiel-Logik
// ------------------------
playBtn.addEventListener('click', () => {
  stopAllAudio();
  currentSong = getRandomSong();
  if (!currentSong) {
    alert('Für diese Dekade sind noch keine Songs eingebunden.');
    return;
  }

  currentAudio = new Audio(currentSong.src);
  currentAudio.play();

  // Pause-Button-Label zurücksetzen
  pauseBtn.textContent = '⏸️ Pause';
});

// Pause / Weiter
pauseBtn.addEventListener('click', () => {
  // normaler Song
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    pauseBtn.textContent = '▶️ Weiter';
  } else if (currentAudio && currentAudio.paused) {
    currentAudio.play();
    pauseBtn.textContent = '⏸️ Pause';
  }

  // Rickroll (falls mal gestartet)
  if (!rickRoll.paused) {
    rickRoll.pause();
    pauseBtn.textContent = '▶️ Weiter';
  } else if (rickRoll.currentTime > 0 && rickRoll.paused) {
    rickRoll.play();
    pauseBtn.textContent = '⏸️ Pause';
  }
});

// Reveal / Lösung – stoppt Audio & zeigt „Weiter“
revealCard.addEventListener('click', () => {
  if (!currentSong) return;

  revealCard.textContent = `${currentSong.title} – ${currentSong.artist}`;
  revealCard.classList.add('flipped');

  stopAllAudio();
  nextBtn.classList.remove('hidden');
});

// Punktevergabe (pro Spieler)
correctTitleBtn.addEventListener('click', () => {
  scores[currentPlayerIndex] = (scores[currentPlayerIndex] ?? 0) + 1;
  scoreValue.textContent = scores[currentPlayerIndex];
});
correctArtistBtn.addEventListener('click', () => {
  scores[currentPlayerIndex] = (scores[currentPlayerIndex] ?? 0) + 1;
  scoreValue.textContent = scores[currentPlayerIndex];
});
wrongBtn.addEventListener('click', () => {
  scores[currentPlayerIndex] = (scores[currentPlayerIndex] ?? 0) - 2;
  scoreValue.textContent = scores[currentPlayerIndex];
});
