// ===============================
// Toggle carta (anti doble-disparo)
// ===============================
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open-letter]");
  if (!btn) return;

  e.preventDefault();
  e.stopPropagation();

  // bloqueo anti-doble ejecución
  if (btn.dataset.lock === "1") return;
  btn.dataset.lock = "1";
  setTimeout(() => (btn.dataset.lock = "0"), 200);

  const section = btn.closest("section");
  const letter = section?.querySelector("[data-letter]");
  if (!letter) return;

  const isHidden = letter.hasAttribute("hidden");

  if (isHidden) {
    letter.removeAttribute("hidden");
    letter.classList.remove("letter-out");
    letter.classList.add("letter-in");
  } else {
    letter.classList.remove("letter-in");
    letter.classList.add("letter-out");
    setTimeout(() => letter.setAttribute("hidden", ""), 240);
  }
});

// ===============================
// Música de fondo ON / OFF
// ===============================
const musicBtn = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

if (musicBtn && bgMusic) {
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      bgMusic.volume = 0.4; // volumen suave
      bgMusic.play();
      musicBtn.textContent = "Música: ON";
      isPlaying = true;
    } else {
      bgMusic.pause();
      musicBtn.textContent = "Música: OFF";
      isPlaying = false;
    }
  });
}
