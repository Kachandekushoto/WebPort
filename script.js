(function(){
  // ─── CURSOR ───
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

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

  // ─── NAV SCROLL ───
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ─── HAMBURGER ───
  const ham  = document.getElementById('hamburger');
  const mmenu = document.getElementById('mobileMenu');
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
        const w = fill.getAttribute('data-width');
        fill.style.transform = 'scaleX(' + w + ')';
        fill.classList.add('animate');
        barIO.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });
  bars.forEach(b => barIO.observe(b));

  // ─── CONTACT FORM ───
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('.submit-btn');
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('message').value.trim();
    const recipient = 'alaindiazlalu@gmail.com';

    btn.textContent = 'Opening Mail...';
    btn.disabled = true;
    status.textContent = 'Opening your email app with your message...';
    status.classList.add('show');

    const body = [
      'Name: ' + (firstName || 'N/A') + ' ' + (lastName || ''),
      'Email: ' + (email || 'N/A'),
      '',
      'Message:',
      message
    ].join('\n');

    const mailtoLink = 'mailto:' + encodeURIComponent(recipient) +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      status.textContent = 'Your email app should open with a new message.';
    }, 800);
  });

  // ─── ACTIVE NAV LINK ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if(window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--cream)' : '';
    });
  });

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
