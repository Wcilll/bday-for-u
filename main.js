document.addEventListener("DOMContentLoaded", () => {
  const sections = Array.from(document.querySelectorAll(".card"));
  const prev = document.querySelector(".nav.prev");
  const next = document.querySelector(".nav.next");
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const finalCard = document.querySelector(".card.final");
  let idx = 0;

  function show(i) {
    idx = (i + sections.length) % sections.length;
    sections.forEach((s, si) => {
      s.classList.toggle("active", si === idx);
      s.classList.toggle("inactive", si !== idx);
    });
  }

  show(0); // tampilkan hanya section pertama di awal

  prev.addEventListener("click", () => show(idx - 1));
  next.addEventListener("click", () => show(idx + 1));

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) ent.target.classList.add("enter");
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => io.observe(s));

  function getBounds() {
    const pad = 12;
    const rect = finalCard.getBoundingClientRect();
    return { width: rect.width - 2 * pad, height: rect.height - 2 * pad };
  }

  function placeRandom(el) {
    requestAnimationFrame(() => {
      const b = getBounds();
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const x = Math.round(Math.random() * (b.width - w));
      const y = Math.round(Math.random() * (b.height - h));
      el.style.position = "absolute";
      el.style.left = x + "px";
      el.style.top = y + "px";
    });
  }

  if (noBtn) {
    noBtn.addEventListener("mouseenter", () => placeRandom(noBtn));
    noBtn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        placeRandom(noBtn);
      },
      { passive: false }
    );
    noBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        placeRandom(noBtn);
      }
    });
  }

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      yesBtn.style.transform = "scale(1.5)";
      yesBtn.style.transition = "transform 320ms ease";
      setTimeout(() => (yesBtn.style.transform = "scale(1)"), 800);
    });
  }
});
