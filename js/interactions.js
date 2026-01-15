document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open-letter]");
  if (!btn) return;

  const card = btn.closest(".chapter-card");
  const letter = card?.querySelector("[data-letter]");
  if (!letter) return;

  const isHidden = letter.hasAttribute("hidden");
  if (isHidden) letter.removeAttribute("hidden");
  else letter.setAttribute("hidden", "");
});

