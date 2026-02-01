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

document.addEventListener("DOMContentLoaded", () => {
  const musicBtn = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");

  if (!musicBtn || !bgMusic) return;

  let isPlaying = false;

  musicBtn.addEventListener("click", async () => {
    try {
      if (!isPlaying) {
        bgMusic.volume = 0.4;
        await bgMusic.play(); // importante: await + try/catch
        musicBtn.textContent = "Música: ON";
        isPlaying = true;
      } else {
        bgMusic.pause();
        musicBtn.textContent = "Música: OFF";
        isPlaying = false;
      }
    } catch (err) {
      console.error("No se pudo reproducir:", err);
      alert("No se pudo reproducir la música. Revisa si el archivo existe y si estás en HTTPS (GitHub Pages).");
    }
  });
});
