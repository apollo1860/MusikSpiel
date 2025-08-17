let currentSong = null;
let score = 0;

const playBtn = document.getElementById("playBtn");
const revealCard = document.getElementById("revealCard");
const scoreValue = document.getElementById("scoreValue");
const correctTitleBtn = document.getElementById("correctTitleBtn");
const correctArtistBtn = document.getElementById("correctArtistBtn");
const wrongBtn = document.getElementById("wrongBtn");

// Testweise: wir nehmen erstmal nur 50s
let activeDecadeSongs = songs50s;

function getRandomSong() {
  const index = Math.floor(Math.random() * activeDecadeSongs.length);
  return activeDecadeSongs[index];
}

playBtn.addEventListener("click", () => {
  currentSong = getRandomSong();
  const audio = new Audio(currentSong.src);
  audio.play();
});

revealCard.addEventListener("click", () => {
  if (!currentSong) return;
  revealCard.textContent = `${currentSong.title} – ${currentSong.artist}`;
  revealCard.classList.add("flipped");
});

correctTitleBtn.addEventListener("click", () => {
  score++;
  scoreValue.textContent = score;
});

correctArtistBtn.addEventListener("click", () => {
  score++;
  scoreValue.textContent = score;
});

wrongBtn.addEventListener("click", () => {
  score -= 2; // Strafschluck
  scoreValue.textContent = score;
});
