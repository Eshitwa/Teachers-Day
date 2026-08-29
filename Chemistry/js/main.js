document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Opening animation
  if (window.anime && !prefersReduced) {
    anime.timeline({ easing: "easeOutExpo" })
      .add({ targets: ".hero .eyebrow", opacity: [0, 1], translateY: [10, 0], duration: 700 })
      .add({ targets: ".hero h1 span", opacity: [0, 1], scale: [.55, 1], filter: ["blur(14px)", "blur(0px)"], duration: 1300, delay: anime.stagger(220) }, "-=350")
      .add({ targets: ".hero-subject", opacity: [0, 1], translateY: [10, 0], duration: 600 }, "-=500");
  } else {
    document.querySelectorAll(".hero .eyebrow, .hero h1 span, .hero-subject").forEach(el => {
      el.style.opacity = 1; el.style.transform = "none"; el.style.filter = "none";
    });
  }

  // Scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (window.anime && !prefersReduced) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [40, 0],
          duration: 900,
          easing: "easeOutCubic"
        });
      } else {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "none";
      }
      observer.unobserve(entry.target);
    });
  }, { threshold: .18 });
  reveals.forEach(el => observer.observe(el));

  // Envelope -> scattered prints
  const envelope = document.getElementById("envelope");
  const prints = [...document.querySelectorAll(".print")];
  let opened = false;

  envelope.addEventListener("click", (event) => {
    event.stopPropagation();
    opened = !opened;
    envelope.classList.toggle("open", opened);
    document.querySelector(".envelope-stage").classList.toggle("opened", opened);

    if (!window.anime || prefersReduced) {
      prints.forEach(p => {
        p.style.opacity = opened ? 1 : 0;
        p.style.transform = opened ? "translate(-50%, 0) scale(1)" : "translate(-50%, 0) scale(.7)";
        p.style.pointerEvents = opened ? "auto" : "none";
      });
      return;
    }

    if (opened) {
      anime({
        targets: prints,
        opacity: [0, 1],
        scale: [.65, 1],
        translateY: [80, 0],
        rotate: () => anime.random(-10, 10),
        delay: anime.stagger(90),
        duration: 1000,
        easing: "easeOutBack",
        complete: () => prints.forEach(p => p.style.pointerEvents = "auto")
      });
    } else {
      anime({
        targets: prints,
        opacity: [1, 0],
        scale: [1, .65],
        translateY: [0, 80],
        delay: anime.stagger(45, { from: "last" }),
        duration: 450,
        easing: "easeInCubic",
        complete: () => prints.forEach(p => p.style.pointerEvents = "none")
      });
    }
  });

  // Gentle print tilt on pointer movement.
  prints.forEach(print => {
    print.addEventListener("pointermove", e => {
      if (!opened) return;
      const r = print.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      print.style.transform = `translate(-50%, 0) perspective(700px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) scale(1.025)`;
    });
    print.addEventListener("pointerleave", () => {
      print.style.transform = "translate(-50%, 0) scale(1)";
    });
  });

  // Confetti on every click, excluding the envelope from duplicate firing.
  document.addEventListener("click", e => {
    if (e.target.closest(".envelope")) return;
    confetti(e.clientX, e.clientY);
  });

  function confetti(x, y) {
    const layer = document.getElementById("confetti-layer");
    const count = prefersReduced ? 8 : 26;
    const pieces = [];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      piece.className = "confetto";
      piece.style.background = i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--accent-2)" : "#fff";
      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;
      piece.style.transform = `rotate(${anime ? anime.random(0, 360) : Math.random()*360}deg)`;
      layer.appendChild(piece);
      pieces.push(piece);
    }
    if (window.anime && !prefersReduced) {
      anime({
        targets: pieces,
        translateX: () => anime.random(-170, 170),
        translateY: () => anime.random(-210, 120),
        rotate: () => anime.random(-540, 540),
        scale: () => anime.random(.5, 1.3),
        opacity: [1, 0],
        duration: 900,
        easing: "easeOutQuad",
        complete: () => pieces.forEach(p => p.remove())
      });
    } else {
      setTimeout(() => pieces.forEach(p => p.remove()), 250);
    }
  }
});
