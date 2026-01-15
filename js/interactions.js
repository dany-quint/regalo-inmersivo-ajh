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

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open-letter]");
  if (!btn) return;

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
