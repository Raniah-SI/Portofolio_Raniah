/**
 * PORTOFOLIO RANIAH - JAVASCRIPT RINGAN & SEDERHANA
 * Tanpa animasi berat, tanpa efek lag, murni Vanilla JS cepat
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveScrollSpy();
  initCopyEmail();
});

/* ==========================================================================
   1. MENU NAVIGASI MOBILE (HAMBURGER)
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburgerBtn || !navMenu) return;

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Tutup menu jika klik di luar navbar
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   2. SCROLLSPY SEDERHANA (HIGHLIGHT MENU AKTIF SAAT SCROLL)
   ========================================================================== */
function initActiveScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    let currentId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   3. SALIN EMAIL & NOTIFIKASI TOAST SEDERHANA
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function initCopyEmail() {
  const btnCopy = document.getElementById('btnCopyEmail');
  const emailEl = document.getElementById('contactEmail');

  if (!btnCopy || !emailEl) return;

  btnCopy.addEventListener('click', () => {
    const email = emailEl.textContent.trim();
    if (!email) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast(`Email (${email}) berhasil disalin!`);
        })
        .catch(() => {
          fallbackCopyText(email);
        });
    } else {
      fallbackCopyText(email);
    }
  });
}

function fallbackCopyText(text) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  tempInput.style.position = 'fixed';
  tempInput.style.opacity = '0';
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showToast(`Email (${text}) berhasil disalin!`);
  } catch (err) {
    showToast('Gagal menyalin email.');
  }
  document.body.removeChild(tempInput);
}
