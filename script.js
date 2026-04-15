/* ============================================================
   SATYAM KUMAR PORTFOLIO — script.js
   ============================================================ */

/* ── 1. PARTICLE CANVAS ── */
(function () {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H, pts;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    init();
  }

  function init() {
    const density = window.innerWidth < 600 ? 14000 : 9000;
    const count   = Math.floor((W * H) / density);
    pts = Array.from({ length: count }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.38,
      vy:    (Math.random() - 0.5) * 0.38,
      r:     Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.55 + 0.12,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const maxDist = window.innerWidth < 600 ? 80 : 110;

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100,190,255,${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q  = pts[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(56,189,248,${0.18 * (1 - d / maxDist)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
})();


/* ── 2. SCROLL-TRIGGERED FADE-IN ── */
(function () {
  const els = document.querySelectorAll('.fade-up');
  const io  = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  els.forEach((el) => io.observe(el));
})();


/* ── 3. TECH BAR ANIMATION (triggers on scroll) ── */
(function () {
  const bars = document.querySelectorAll('.tbar-fill');
  const io   = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const w = e.target.getAttribute('data-w');
          e.target.style.width = w + '%';
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((b) => io.observe(b));
})();


/* ── 4. STICKY NAV SHADOW ON SCROLL ── */
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.borderBottomColor = 'rgba(56,189,248,0.18)';
    } else {
      nav.style.borderBottomColor = 'rgba(56,189,248,0.12)';
    }
  }, { passive: true });
})();


/* ── 5. HAMBURGER MOBILE MENU ── */
(function () {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });

  /* Close menu when a link is tapped */
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
    });
  });

  /* Close on outside tap */
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      links.classList.remove('open');
      btn.classList.remove('open');
    }
  });

  const nav = document.getElementById('navbar');
})();


/* ── 6. SMOOTH ACTIVE NAV LINK HIGHLIGHT ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function onScroll() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navItems.forEach((a) => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--cyan)'
        : '';
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ── 7. AVATAR — keep initials upright ── */
/* The border animates via hue-rotate on .av-circle,
   but we keep the inner .av-initials totally static. */
(function () {
  const circle   = document.querySelector('.av-circle');
  const initials = document.querySelector('.av-initials');
  if (!circle || !initials) return;

  /* CSS hue-rotate doesn't affect transforms, so
     we just ensure the inner div has no animation.
     Text naturally stays upright because we only
     animate hue-rotate (color shift) on the wrapper,
     not an actual geometric rotation. */
  initials.style.animation = 'none';
  initials.style.transform = 'none';
})();


/* ── 8. CURSOR BLINK (reinforce with JS if CSS blocked) ── */
(function () {
  const cur = document.querySelector('.cursor-blink');
  if (!cur) return;
  setInterval(() => {
    cur.style.opacity = cur.style.opacity === '0' ? '1' : '0';
  }, 550);
})();
