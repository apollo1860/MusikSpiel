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

// --- DOM Refs: Startmenü / Handoff / Game ---
const elStartMenu   = document.getElementById('startMenu');
const elPlayerList  = document.getElementById('playerList');
const elAddPlayer   = document.getElementById('addPlayer');
const elStartGame   = document.getElementById('startGame');

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
if (typeof songs50s !== 'undefined') decades.push({key:'50s', label:'1950er', list:songs50s});
if (typeof songs60s !== 'undefined') decades.push({key:'60s', label:'1960er', list:songs60s});
if (typeof songs70s !== 'undefined') decades.push({key:'70s', label:'1970er', list:songs70s});
if (typeof songs80s !== 'undefined') decades.push({key:'80s', label:'1980er', list:songs80s});
if (typeof songs90s !== 'undefined') decades.push({key:'90s', label:'1990er', list:songs90s});
if (typeof songs2000s !== 'undefined') decades.push({key:'00s', label:'2000er', list:songs2000s});
if (typeof songs2010s !== 'undefined') decades.push({key:'10s', label:'2010er', list:songs2010s});
if (typeof songs2020s !== 'undefined') decades.push({key:'20s', label:'2020er', list:songs2020s});

// Fallback, falls nur 50s eingebunden sind
if (decades.length === 0) {
  // Sicherstellen, dass es nicht crasht, wenn noch keine Songs geladen sind
  decades.push({key:'local', label:'Songs', list: []});
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

  // Menü aus -> Handoff zur ersten Person
  elStartMenu.classList.add('hidden');

  // Runde auf 0, Starter auf 0, Zug 0
  roundIndex = 0;
  starterIndex = 0;
  turnInRound = 0;

  beginNextTurn(); // zeigt Handoff für ersten Spieler
});

// ------------------------
// Runden- & Zug-Logik
// ------------------------
function updateRoundAndTurnLabels() {
  const dec = decades[roundIndex];
  const label = dec ? dec.label : `Runde ${roundIndex+1}`;
  elRoundInfo.textContent = `Runde ${roundIndex+1} – ${label}`;
  elTurnInfo.textContent  = `Dran: ${players[currentPlayerIndex] || '—'}`;
  elCurrentName.textContent = players[currentPlayerIndex] || '—';
  scoreValue.textContent = scores[currentPlayerIndex] ?? 0;
}

function beginNextTurn(){
  // Falls Runde fertig: neue Runde starten (Starter rotiert)
  if (turnInRound >= players.length) {
    turnInRound = 0;
    starterIndex = (starterIndex + 1) % players.length;
    roundIndex++;

    // Spielende?
    if (roundIndex >= decades.length) {
      alert('🎉 Spiel beendet! Danke fürs Mitspielen.');
      // Reset zur Startseite (optional)
      elHandoff.classList.add('hidden');
      elGame.classList.add('hidden');
      elStartMenu.classList.remove('hidden');
      return;
    }
  }

  currentPlayerIndex = (starterIndex + turnInRound) % players.length;

  // Handoff anzeigen
  const who = players[currentPlayerIndex];
  elHandoffTitle.textContent = `Nächster Spieler`;
  elHandoffText.textContent  = `Bitte das Handy an ${who} geben!`;
  elHandoff.classList.remove('hidden');
  elGame.classList.add('hidden');

  // Spiel-UI zurücksetzen
  revealCard.textContent = '❓';
  revealCard.classList.remove('flipped');
  nextBtn.classList.add('hidden');

  // Labels updaten
  updateRoundAndTurnLabels();
}

elHandoffGo.addEventListener('click', () => {
  // vom Handoff ins Spiel
  elHandoff.classList.add('hidden');
  elGame.classList.remove('hidden');
});

// ------------------------
// Audio & Abspiel-Logik
// ------------------------
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

// Play
playBtn.addEventListener('click', () => {
  // laufendes Audio stoppen
  if (currentAudio){ currentAudio.pause(); currentAudio.currentTime = 0; }
  if (!rickRoll.paused){ rickRoll.pause(); rickRoll.currentTime = 0; }

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

  if (!rickRoll.paused) { rickRoll.pause(); rickRoll.currentTime = 0; }
  if (currentAudio && !currentAudio.paused) { currentAudio.pause(); currentAudio.currentTime = 0; }

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

// Weiter zum nächsten Spieler
nextBtn.addEventListener('click', () => {
  // Sicherheit: Audio stoppen
  if (currentAudio){ currentAudio.pause(); currentAudio.currentTime = 0; }
  if (!rickRoll.paused){ rickRoll.pause(); rickRoll.currentTime = 0; }

  // Nächster Zug in dieser Runde
  turnInRound++;
  beginNextTurn();
});
