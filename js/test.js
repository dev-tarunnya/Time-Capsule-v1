
  // Screen switching logic
  let currentScreen = 'home';

  function switchScreen(screenId) {
    if (screenId === currentScreen) return;
    currentScreen = screenId;

    // Update app screens
    document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('screen-' + screenId);
    if (target) {
      target.classList.add('active');
      target.scrollTop = 0;
    }

    // Update thumbnail cards
    document.querySelectorAll('.screen-card').forEach(c => c.classList.remove('active'));
    const card = document.querySelector(`.screen-card[data-screen="${screenId}"]`);
    if (card) card.classList.add('active');

    // Update nav buttons
    document.querySelectorAll('.screen-nav button[data-screen]').forEach(b => {
      b.classList.toggle('active', b.dataset.screen === screenId);
    });
  }

  // Chip toggle for recipients
  function toggleChip(el) {
    el.classList.toggle('selected');
  }

  // Privacy selection (single select)
  function selectPrivacy(el, container) {
    container.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
  }

  // Filter pill selection
  function selectPill(el) {
    el.parentElement.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
  }

  // Media upload simulation
  const mediaImages = [
    'https://picsum.photos/seed/media1/200/200.jpg',
    'https://picsum.photos/seed/media2/200/200.jpg',
    'https://picsum.photos/seed/media3/200/200.jpg',
    'https://picsum.photos/seed/media4/200/200.jpg'
  ];
  const mediaFilled = [false, false, false, false];

  function addMedia(index) {
    if (mediaFilled[index]) return;
    mediaFilled[index] = true;
    const slot = document.querySelectorAll('.media-slot')[index];
    slot.classList.add('filled');
    slot.innerHTML = `<img src="${mediaImages[index]}" alt="Photo"><button class="remove-media" onclick="event.stopPropagation();removeMedia(${index})"><i class="fa-solid fa-xmark"></i></button>`;
    showToast('Photo added');
  }

  function removeMedia(index) {
    mediaFilled[index] = false;
    const slot = document.querySelectorAll('.media-slot')[index];
    slot.classList.remove('filled');
    slot.innerHTML = '<i class="fa-solid fa-plus"></i>';
  }

  // Seal capsule
  function sealCapsule() {
    const title = document.getElementById('capsuleTitle').value.trim();
    if (!title) {
      showToast('Please add a title for your capsule');
      document.getElementById('capsuleTitle').focus();
      return;
    }
    showToast('Capsule sealed successfully!');
    // Reset form after short delay
    setTimeout(() => {
      document.getElementById('capsuleTitle').value = '';
      document.getElementById('capsuleMessage').value = '';
      for (let i = 0; i < 4; i++) removeMedia(i);
    }, 1000);
  }

  // React to capsule
  function reactToCapsule(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
      icon.style.color = '#8B2323';
      btn.innerHTML = '';
      btn.appendChild(icon);
      btn.append(' Reacted');
      showToast('Reaction added');
    } else {
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
      icon.style.color = '';
      btn.innerHTML = '';
      btn.appendChild(icon);
      btn.append(' React');
    }
  }

  // Toast notification
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // Countdown timer for detail screen
  let countdownTarget = Date.now() + 142 * 86400000 + 8 * 3600000 + 34 * 60000 + 12 * 1000;

  function updateCountdown() {
    const diff = Math.max(0, countdownTarget - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Opening animation
  function triggerOpeningAnimation() {
    const overlay = document.getElementById('openingOverlay');
    const container = document.getElementById('particlesContainer');

    // Generate particles
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const angle = (Math.PI * 2 * i) / 30;
      const dist = 60 + Math.random() * 80;
      const x = 50 + Math.cos(angle) * dist;
      const y = 40 + Math.sin(angle) * dist;
      const size = 2 + Math.random() * 4;
      p.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: ${Math.random() > 0.5 ? '#FEE469' : '#0000CD'};
        animation: particleBurst ${1 + Math.random() * 1.5}s ease-out ${Math.random() * 0.5}s forwards;
      `;
      container.appendChild(p);
    }

    // Add particle burst keyframes dynamically
    if (!document.getElementById('particleStyle')) {
      const style = document.createElement('style');
      style.id = 'particleStyle';
      style.textContent = `
        @keyframes particleBurst {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(${Math.random() > 0.5 ? '' : '-'}${20 + Math.random()*40}px, ${Math.random() > 0.5 ? '' : '-'}${20 + Math.random()*40}px) scale(0); }
        }
      `;
      document.head.appendChild(style);
    }

    overlay.classList.add('visible');

    // Auto-hide after 3 seconds
    setTimeout(() => {
      overlay.classList.remove('visible');
    }, 3500);
  }

  // Set a default unlock date
  const dateInput = document.getElementById('unlockDate');
  if (dateInput) {
    const future = new Date();
    future.setMonth(future.getMonth() + 5);
    dateInput.value = future.toISOString().split('T')[0];
  }

  // Intersection observer for scroll reveal on design system section
  const dsSection = document.getElementById('designSystem');
  if (dsSection) {
    dsSection.style.opacity = '0';
    dsSection.style.transform = 'translateY(40px)';
    dsSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(dsSection);
  }
