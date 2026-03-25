/* ============================================
   FLEX FIT GYM KHULNA - Main JavaScript
   Shared Logic: Nav, Scroll Animations, Utils
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSmoothScroll();
});

/* ---------- Navbar ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Set active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks?.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---------- Counter Animation ---------- */
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current) + (counter.dataset.suffix || '');
    }, 16);
  });
}

/* ---------- Tab Filtering ---------- */
function initTabs(tabSelector, itemSelector, dataAttr = 'data-category') {
  const tabs = document.querySelectorAll(tabSelector);
  const items = document.querySelectorAll(itemSelector);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.getAttribute(dataAttr) === filter) {
          item.style.display = '';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });
}

/* ---------- Modal ---------- */
function showModal(title, message) {
  let overlay = document.querySelector('.modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-icon">✓</div>
        <h3 class="modal-title"></h3>
        <p class="modal-message"></p>
        <button class="btn btn-primary" onclick="closeModal()">Got It</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  overlay.querySelector('.modal-title').textContent = title;
  overlay.querySelector('.modal-message').textContent = message;
  overlay.classList.add('show');
}

function closeModal() {
  document.querySelector('.modal-overlay')?.classList.remove('show');
}

/* ---------- Helper: Check Admin ---------- */
function isAdmin() {
  return new URLSearchParams(window.location.search).get('admin') === 'true';
}

/* ---------- Helper: Get Navbar HTML ---------- */
function getNavbarHTML(basePath = '') {
  return `
  <nav class="navbar">
    <div class="nav-container">
      <a href="${basePath}index.html" class="nav-logo">
        <div class="logo-icon">FF</div>
        <span>FLEX</span><span class="logo-text-red">FIT</span>
      </a>
      <div class="nav-links">
        <a href="${basePath}index.html">Home</a>
        <a href="${basePath}pages/trainers.html">Trainers</a>
        <a href="${basePath}pages/gallery.html">Gallery</a>
        <a href="${basePath}pages/shop.html">Shop</a>
        <a href="${basePath}pages/equipment.html">Equipment</a>
        <a href="${basePath}pages/workout-plan.html">Workout</a>
        <a href="${basePath}pages/food-plan.html">Food Plan</a>
        <a href="${basePath}pages/membership.html" class="nav-cta btn btn-primary btn-sm">Join Now</a>
      </div>
      <div class="hamburger">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>`;
}

/* ---------- Helper: Get Footer HTML ---------- */
function getFooterHTML(basePath = '') {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${basePath}index.html" class="nav-logo">
            <div class="logo-icon">FF</div>
            <span>FLEX</span><span class="logo-text-red">FIT</span>
          </a>
          <p>The most premium gym experience in Khulna. Transform your body, transform your life. Join our community of dedicated fitness enthusiasts.</p>
          <div class="footer-social">
            <a href="https://facebook.com" target="_blank" aria-label="Facebook">📘</a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram">📸</a>
            <a href="https://youtube.com" target="_blank" aria-label="YouTube">▶️</a>
            <a href="https://wa.me/" target="_blank" aria-label="WhatsApp">💬</a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="${basePath}index.html">Home</a></li>
            <li><a href="${basePath}pages/trainers.html">Our Trainers</a></li>
            <li><a href="${basePath}pages/gallery.html">Gallery</a></li>
            <li><a href="${basePath}pages/shop.html">Shop</a></li>
            <li><a href="${basePath}pages/equipment.html">Equipment</a></li>
          </ul>
        </div>
        <div>
          <h4>Programs</h4>
          <ul>
            <li><a href="${basePath}pages/workout-plan.html">Custom Workout Plan</a></li>
            <li><a href="${basePath}pages/food-plan.html">Desi Food Plan</a></li>
            <li><a href="${basePath}pages/membership.html">Membership</a></li>
            <li><a href="${basePath}pages/book-tour.html">Book a Tour</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>📍 Khulna, Bangladesh</li>
            <li>📞 +880 1XXX-XXXXXX</li>
            <li>✉️ info@flexfitkhulna.com</li>
            <li>🕐 6:00 AM – 11:00 PM</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Flex Fit Gym Khulna. All rights reserved.</p>
        <p>Crafted with 💪 for the fitness community</p>
      </div>
    </div>
  </footer>`;
}
