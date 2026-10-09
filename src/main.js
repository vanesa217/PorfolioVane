// ==========================================================================
// PORTAFOLIO VANESA CAROLINA TARELLI - LÓGICA INTERACTIVA
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. SELECTOR DE TEMAS (DARK / LIGHT)
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const htmlEl = document.documentElement;

  // Cargar preferencia guardada o respetar dark por defecto
  const savedTheme = localStorage.getItem('vt_theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('vt_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Tema cambiado a modo ${newTheme === 'dark' ? 'oscuro' : 'claro'}`);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.textContent = '◐';
    } else {
      themeIcon.textContent = '◑';
    }
  }

  // 2. MENÚ RESPONSIVE EN MÓVILES
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar al hacer clic en cualquier enlace móvil
    mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. NAVEGACIÓN ACTIVA (SCROLL SPY)
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. ACCIONES DE COPIADO AL PORTAPAPELES
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailVal = document.getElementById('emailVal');

  if (copyEmailBtn && emailVal) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailVal.textContent.trim();
      copyToClipboard(email, '✓ Email copiado al portapapeles');
    });
  }

  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  const phoneVal = document.getElementById('phoneVal');

  if (copyPhoneBtn && phoneVal) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = phoneVal.textContent.trim();
      copyToClipboard(phone, '✓ Celular copiado: 221 561 5096');
    });
  }

  function copyToClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
      }).catch(() => {
        fallbackCopy(text, successMessage);
      });
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMessage);
    } catch (err) {
      showToast('No se pudo copiar automáticamente');
    }
    document.body.removeChild(textArea);
  }

  // 5. MODAL DE VISUALIZACIÓN DEL CV ("que el boton de cv funcione y se vea el cv")
  const cvModal = document.getElementById('cvModal');
  const cvCloseBtn = document.getElementById('cvCloseBtn');
  const cvPrintBtn = document.getElementById('cvPrintBtn');
  const cvOpenBtns = document.querySelectorAll('.cv-open-btn');

  function openCVModal() {
    if (!cvModal) return;
    cvModal.classList.add('active');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
  }

  function closeCVModal() {
    if (!cvModal) return;
    cvModal.classList.remove('active');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cvOpenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCVModal();
    });
  });

  if (cvCloseBtn) {
    cvCloseBtn.addEventListener('click', closeCVModal);
  }

  // Cerrar haciendo clic fuera de la ventana
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        closeCVModal();
      }
    });
  }

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
      closeCVModal();
    }
  });

  // Imprimir o guardar como PDF desde el modal
  if (cvPrintBtn) {
    cvPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 6. SISTEMA DE NOTIFICACIONES TOAST
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    // Animación de entrada
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-eliminación tras 3.2 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }
});
