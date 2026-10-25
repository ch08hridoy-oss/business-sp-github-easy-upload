(() => {
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const workCards = document.querySelectorAll('.work-card[data-category]');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      workCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  const projectForm = document.getElementById('projectForm');
  const feedback = document.getElementById('formFeedback');
  if (projectForm) {
    projectForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!projectForm.reportValidity()) return;
      const data = new FormData(projectForm);
      const recipient = 'hridoyakralmulhouqe@gmail.com';
      const subject = `Business SP project enquiry — ${data.get('service')}`;
      const body = [
        'Hello Business SP,',
        '',
        'I would like to discuss a project.',
        '',
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Service: ${data.get('service')}`,
        '',
        'Project details:',
        data.get('message'),
        '',
        'Thank you.'
      ].join('\n');
      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (feedback) feedback.textContent = 'Your email app should open with the enquiry prepared. If it does not, email hridoyakralmulhouqe@gmail.com directly.';
      window.location.href = mailto;
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Stop other videos when a visitor starts playing one, to keep playback tidy.
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    video.addEventListener('play', () => {
      videos.forEach((other) => {
        if (other !== video && !other.paused) other.pause();
      });
    });
  });
})();
