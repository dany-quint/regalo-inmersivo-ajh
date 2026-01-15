document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.getElementById("journeyArrow");
  const track = document.querySelector(".journey-track");
  if (!arrow || !track) return;

  // capítulo actual (1..8) — para chapter-1 será 1
  const current = Number(document.body.dataset.chapter || "1");

  const dots = [...track.querySelectorAll(".journey-dot")];
  dots.forEach((d, i) => {
    if (i < current) d.classList.add("is-done");
  });

  // animación: flecha va al dot del capítulo
  const target = dots[Math.max(0, Math.min(current - 1, dots.length - 1))];
  const trackRect = track.getBoundingClientRect();
  const dotRect = target.getBoundingClientRect();
  const targetLeft = (dotRect.left - trackRect.left) + (dotRect.width / 2) - 8;

  // pequeño delay para que se vea el movimiento al cargar
  setTimeout(() => {
    arrow.style.left = `${targetLeft}px`;
  }, 300);
});

