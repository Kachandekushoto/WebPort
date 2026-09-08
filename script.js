(function(){
  // ─── CURSOR ───
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (cursor && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animRing(){
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();
  }

  // ─── NAV SCROLL ───
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ─── HAMBURGER ───
  const ham  = document.getElementById('hamburger');
  const mmenu = document.getElementById('mobileMenu');
  if (ham && mmenu) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mmenu.classList.toggle('open');
      document.body.style.overflow = mmenu.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-link').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        mmenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── SCROLL REVEAL ───
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('visible'); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
  reveals.forEach(el => io.observe(el));

  // ─── SKILL BARS ───
  const bars = document.querySelectorAll('.skill-fill');
  const barIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const fill = e.target;
        fill.style.setProperty('--skill-width', fill.getAttribute('data-width'));
        fill.classList.add('animate');
        barIO.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });
  bars.forEach(b => barIO.observe(b));

  // ─── CONTACT FORM ───
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('.submit-btn');
      if (!btn) return;
      const email = form.querySelector('#email');
      const replyTo = form.querySelector('#replyTo');
      if (email && replyTo) replyTo.value = email.value;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      status.textContent = 'Sending your message...';
      status.classList.add('show');
    });
  }

  // ─── ACTIVE NAV LINK ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  function updateActiveNav(){
    let current = '';
    sections.forEach(s => {
      if(window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ─── COUNTER ANIMATION ───
  function animateCounters(){
    document.querySelectorAll('.stat-num').forEach(el => {
      const text = el.textContent;
      const num  = parseInt(text);
      const suffix = text.replace(/[0-9]/g, '');
      let start = 0;
      const step = num / 40;
      const timer = setInterval(() => {
        start = Math.min(start + step, num);
        el.textContent = Math.floor(start) + suffix;
        if(start >= num) clearInterval(timer);
      }, 40);
    });
  }
  const heroIO = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){ animateCounters(); heroIO.disconnect(); }
  }, { threshold: 0.5 });
  const statsEl = document.querySelector('.hero-stats');
  if(statsEl) heroIO.observe(statsEl);

})();
