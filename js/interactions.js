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

  if (!bgMusic) return;

  const KEY_ON = "ebenezer_music_on";
  const KEY_TIME = "ebenezer_music_time";

  // Helper: actualizar texto del botón si existe
  function setBtnLabel(on) {
    if (!musicBtn) return;
    musicBtn.textContent = on ? "Música: ON" : "Música: OFF";
  }

  // Intentar reanudar si estaba ON
  const wasOn = localStorage.getItem(KEY_ON) === "1";
  if (wasOn) {
    const savedTime = parseFloat(localStorage.getItem(KEY_TIME) || "0");
    if (!Number.isNaN(savedTime)) bgMusic.currentTime = savedTime;

    bgMusic.volume = 0.4;

    // Reanudar (algunos navegadores requieren 1 click si no hubo interacción antes,
    // pero como el usuario ya activó música en la portada, normalmente sí reanuda)
    bgMusic.play().then(() => {
      setBtnLabel(true);
    }).catch(() => {
      // Si el navegador bloquea, dejamos el botón en OFF para que el usuario lo active
      setBtnLabel(false);
      localStorage.setItem(KEY_ON, "0");
    });
  } else {
    setBtnLabel(false);
  }

  // Guardar tiempo cada cierto rato
  setInterval(() => {
    if (!bgMusic.paused) {
      localStorage.setItem(KEY_TIME, String(bgMusic.currentTime));
    }
  }, 800);

  // Click del botón ON/OFF
  if (musicBtn) {
    musicBtn.addEventListener("click", async () => {
      const isPlaying = !bgMusic.paused;

      try {
        if (!isPlaying) {
          bgMusic.volume = 0.4;
          await bgMusic.play();
          localStorage.setItem(KEY_ON, "1");
          setBtnLabel(true);
        } else {
          bgMusic.pause();
          localStorage.setItem(KEY_ON, "0");
          setBtnLabel(false);
        }
      } catch (err) {
        console.error("No se pudo reproducir:", err);
        alert("No se pudo reproducir la música. Revisa si el archivo existe.");
      }
    });
  }

  // Antes de salir de la página, guarda el tiempo
  window.addEventListener("beforeunload", () => {
    localStorage.setItem(KEY_TIME, String(bgMusic.currentTime || 0));
  });
});
