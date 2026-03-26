/* ========== MENU DATA ========== */
const menuData = {
  antipasti: [
    { name: 'Bruschetta al Pomodoro', desc: 'Toasted bread with fresh tomato, basil, garlic, and extra virgin olive oil', price: '€8.50', img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80' },
    { name: 'Carpaccio di Manzo', desc: 'Thinly sliced beef with arugula, parmesan, and lemon vinaigrette', price: '€14.90', img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80' },
    { name: 'Caprese di Bufala', desc: 'Buffalo mozzarella DOP, beefsteak tomato, fresh basil, and balsamic reduction', price: '€12.50', img: 'https://images.unsplash.com/photo-1608032077018-c9aad9565d29?w=400&q=80' },
    { name: 'Arancini Siciliani', desc: 'Rice croquettes stuffed with ragù, mozzarella, and peas with marinara sauce', price: '€10.90', img: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&q=80' },
    { name: 'Vitello Tonnato', desc: 'Thinly sliced roasted veal with creamy tuna sauce and capers', price: '€13.50', img: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&q=80' }
  ],
  pasta: [
    { name: 'Spaghetti Carbonara', desc: 'Classic Roman recipe with guanciale, pecorino romano, egg yolk, and black pepper', price: '€16.50', img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80' },
    { name: 'Penne all\'Arrabbiata', desc: 'Penne rigate with spicy tomato sauce, garlic, chili, and fresh parsley', price: '€13.90', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80' },
    { name: 'Risotto ai Funghi', desc: 'Creamy carnaroli rice with fresh porcini mushrooms, butter, and parmigiano reggiano', price: '€18.50', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80' },
    { name: 'Tagliatelle al Ragù', desc: 'Fresh egg pasta with authentic Bolognese ragù, slow-cooked for 6 hours', price: '€17.90', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80' },
    { name: 'Gnocchi al Pesto', desc: 'Handmade potato gnocchi with Genovese pesto, toasted pine nuts, and pecorino', price: '€15.50', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' }
  ],
  pizzas: [
    { name: 'Margherita DOP', desc: 'The classic Neapolitan with san marzano DOP, fior di latte, basil, and olive oil', price: '€12.90', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80' },
    { name: 'Quattro Formaggi', desc: 'Mozzarella, gorgonzola, fontina, and parmigiano reggiano with truffle honey', price: '€16.50', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
    { name: 'Diavola', desc: 'Tomato sauce, mozzarella, spicy Calabrian salami, and chili oil', price: '€14.90', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' },
    { name: 'Prosciutto e Rucola', desc: 'Mozzarella base, prosciutto di Parma, fresh arugula, and shaved grana padano', price: '€17.50', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80' },
    { name: 'Truffle Bianca', desc: 'Truffle cream base, mozzarella, mushrooms, potato, and fresh rosemary', price: '€19.90', img: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&q=80' }
  ],
  postres: [
    { name: 'Tiramisú Classico', desc: 'Layers of savoiardi, espresso, mascarpone, and bitter cocoa. Nonna\'s recipe', price: '€9.50', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80' },
    { name: 'Panna Cotta', desc: 'Silky vanilla cream with seasonal berry coulis', price: '€8.50', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
    { name: 'Cannoli Siciliani', desc: 'Crispy shells filled with sweet ricotta, pistachios, and candied orange', price: '€7.90', img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80' },
    { name: 'Affogato al Caffè', desc: 'Artisan vanilla gelato drowned in hot espresso with amaretti biscuits', price: '€7.50', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&q=80' }
  ]
};

/* ========== NAVBAR SCROLL ========== */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 60);
  lastScroll = scrollY;
}, { passive: true });

/* ========== MOBILE MENU ========== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ========== MENU TABS ========== */
const menuGrid = document.getElementById('menuGrid');
const tabs = document.querySelectorAll('.menu__tab');

function renderMenu(category) {
  const items = menuData[category];
  menuGrid.style.opacity = '0';
  menuGrid.style.transform = 'translateY(10px)';

  setTimeout(() => {
    menuGrid.innerHTML = items.map(item => `
      <article class="menu__card">
        <div class="menu__card-img">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
        </div>
        <div class="menu__card-body">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="menu__card-footer">
            <span class="price">${item.price}</span>
            <span class="price-badge">Nuevo</span>
          </div>
        </div>
      </article>
    `).join('');

    requestAnimationFrame(() => {
      menuGrid.style.transition = 'opacity .4s ease, transform .4s ease';
      menuGrid.style.opacity = '1';
      menuGrid.style.transform = 'translateY(0)';
    });
  }, 200);
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderMenu(tab.dataset.category);
  });
});

renderMenu('antipasti');

/* ========== SCROLL ANIMATIONS ========== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('[data-anim]').forEach(el => {
    observer.observe(el);
  });
}

/* ========== FORM VALIDATION ========== */
const form = document.getElementById('reservaForm');

function showError(id, message) {
  const el = document.getElementById(id);
  el.textContent = message;
  el.previousElementSibling.classList.add('invalid');
}

function clearErrors() {
  form.querySelectorAll('.form__error').forEach(e => e.textContent = '');
  form.querySelectorAll('.invalid').forEach(e => e.classList.remove('invalid'));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  let valid = true;

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const telefono = form.telefono.value.trim();
  const personas = form.personas.value;
  const fecha = form.fecha.value;
  const hora = form.hora.value;

  if (!nombre || nombre.length < 2) {
    showError('errorNombre', 'Please enter your full name');
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showError('errorEmail', 'Please enter a valid email address');
    valid = false;
  }

  const phoneRegex = /^[\d\s+()-]{7,}$/;
  if (!telefono || !phoneRegex.test(telefono)) {
    showError('errorTelefono', 'Please enter a valid phone number');
    valid = false;
  }

  if (!personas) {
    showError('errorPersonas', 'Please select the number of guests');
    valid = false;
  }

  if (!fecha) {
    showError('errorFecha', 'Please select a date');
    valid = false;
  } else {
    const selected = new Date(fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      showError('errorFecha', 'Date cannot be in the past');
      valid = false;
    }
  }

  if (!hora) {
    showError('errorHora', 'Please select a time');
    valid = false;
  }

  if (valid) {
    form.innerHTML = `
      <div class="form__success show">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h3>Reservation Received!</h3>
        <p>Thank you, ${nombre}. We've received your request for ${personas} guest${personas > 1 ? 's' : ''} on ${fecha} at ${hora}. We'll send a confirmation to <strong>${email}</strong>.</p>
      </div>
    `;
  }
});

/* ========== PARALLAX HERO ========== */
function initParallax() {
  const heroBg = document.querySelector('.hero__bg-img');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(${1.05 + scrollY * 0.0002}) translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initParallax();
});
