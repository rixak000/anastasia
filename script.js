/* ========================================
   Apply Saved Content from Admin Panel
   ======================================== */
(function applySavedContent() {
    // Apply section visibility
    try {
        const sections = JSON.parse(localStorage.getItem('siteSections') || '{}');
        const sectionMap = {
            hero: '#hero',
            about: '#about',
            services: '#services',
            pricing: '#pricing',
            afterschool: '#afterschool',
            gallery: '#gallery',
            cta: '.cta-section',
            contact: '#contact',
            miniGame: '#miniGame',
        };
        for (const [key, sel] of Object.entries(sectionMap)) {
            if (sections[key] === false) {
                const el = document.querySelector(sel);
                if (el) el.style.display = 'none';
            }
        }
    } catch (e) {}

    // Apply content overrides
    try {
        const content = JSON.parse(localStorage.getItem('siteContent') || '{}');
        const fieldMap = {
            // Navbar
            navbar_logo_icon: { sel: '.logo-icon', prop: 'text' },
            navbar_logo_text: { sel: '.logo-text', prop: 'text' },
            navbar_preloader_text: { sel: '.preloader-text', prop: 'text' },
            // Hero
            hero_badge: { sel: '.hero-badge', prop: 'textOnly', icon: 'location_on' },
            hero_name1: { sel: '.hero-title-line:not(.accent)', prop: 'text' },
            hero_name2: { sel: '.hero-title-line.accent', prop: 'text' },
            hero_subtitle: { sel: '.hero-subtitle', prop: 'text' },
            hero_description: { sel: '.hero-description', prop: 'text' },
            hero_btn1_href: { sel: '.hero-buttons .btn-primary', prop: 'href' },
            hero_btn2_href: { sel: '.hero-buttons .btn-outline-white', prop: 'href' },
            hero_image: { sel: '.hero-image-frame img', prop: 'src' },
            hero_placeholder_initials: { sel: '.placeholder-initials', prop: 'text' },
            hero_placeholder_role: { sel: '.placeholder-role', prop: 'text' },
            hero_card1: { sel: '.floating-card-1 span:last-child', prop: 'text' },
            hero_card2: { sel: '.floating-card-2 span:last-child', prop: 'text' },
            hero_card3: { sel: '.floating-card-3 span:last-child', prop: 'text' },
            // About
            about_tag: { sel: '#about .section-tag', prop: 'text' },
            about_title: { sel: '#about .section-title', prop: 'html' },
            about_image: { sel: '#about .about-image-wrapper > img', prop: 'src' },
            about_lead: { sel: '.about-lead', prop: 'text' },
            about_text: { sel: '.about-text', prop: 'text' },
            about_stat1_label: { sel: '.stat-item:nth-child(1) .stat-label', prop: 'text' },
            about_stat1_value: { sel: '.stat-item:nth-child(1) .stat-value', prop: 'text' },
            about_stat2_label: { sel: '.stat-item:nth-child(2) .stat-label', prop: 'text' },
            about_stat2_value: { sel: '.stat-item:nth-child(2) .stat-value', prop: 'text' },
            about_stat3_label: { sel: '.stat-item:nth-child(3) .stat-label', prop: 'text' },
            about_stat3_value: { sel: '.stat-item:nth-child(3) .stat-value', prop: 'text' },
            about_stat4_label: { sel: '.stat-item:nth-child(4) .stat-label', prop: 'text' },
            about_stat4_value: { sel: '.stat-item:nth-child(4) .stat-value', prop: 'text' },
            about_btn: { sel: '.about-content > .btn', prop: 'text' },
            about_btn_href: { sel: '.about-content > .btn', prop: 'href' },
            // Services
            services_tag: { sel: '#services .section-tag', prop: 'text' },
            services_title: { sel: '#services .section-title', prop: 'html' },
            services_subtitle: { sel: '#services .section-subtitle', prop: 'text' },
            // Pricing
            pricing_tag: { sel: '#pricing .section-tag', prop: 'text' },
            pricing_title: { sel: '#pricing .section-title', prop: 'html' },
            trial_badge: { sel: '.trial-badge', prop: 'text' },
            trial_title: { sel: '.trial-card h3', prop: 'text' },
            trial_desc: { sel: '.trial-desc', prop: 'text' },
            trial_price1: { sel: '.trial-price:nth-child(1) .price-amount', prop: 'text' },
            trial_note1: { sel: '.trial-price:nth-child(1) .price-note', prop: 'text' },
            trial_price2: { sel: '.trial-price:nth-child(3) .price-amount', prop: 'text' },
            trial_note2: { sel: '.trial-price:nth-child(3) .price-note', prop: 'text' },
            trial_btn: { sel: '.trial-card .btn', prop: 'text' },
            pricing_cta: { sel: '.pricing-cta .btn', prop: 'text' },
            pricing_children_note: { sel: '#tab-children .pricing-note', prop: 'text' },
            pricing_adults_note: { sel: '#tab-adults .pricing-note', prop: 'text' },
            // After School
            as_tag: { sel: '#afterschool .section-tag', prop: 'text' },
            as_title: { sel: '#afterschool .section-title', prop: 'html' },
            as_subtitle: { sel: '#afterschool .section-subtitle', prop: 'text' },
            as_weekday_title: { sel: '.schedule-item--main h4', prop: 'text' },
            as_weekday_time: { sel: '.schedule-item--main .schedule-time', prop: 'text' },
            as_weekday_note: { sel: '.schedule-item--main .schedule-note', prop: 'text' },
            as_weekday_prices: { sel: '.schedule-item--main .schedule-prices', prop: 'html' },
            as_saturday_title: { sel: '.schedule-item--saturday h4', prop: 'text' },
            as_saturday_time: { sel: '.schedule-item--saturday .schedule-time', prop: 'text' },
            as_saturday_note: { sel: '.schedule-item--saturday .schedule-note', prop: 'text' },
            as_saturday_prices: { sel: '.schedule-item--saturday .schedule-prices', prop: 'html' },
            as_activities: { sel: '.afterschool-activities', prop: 'html' },
            as_cta_text: { sel: '.afterschool-cta > p', prop: 'text' },
            // Gallery
            gallery_tag: { sel: '#gallery .section-tag', prop: 'text' },
            gallery_title: { sel: '#gallery .section-title', prop: 'html' },
            gallery_subtitle: { sel: '#gallery .section-subtitle', prop: 'text' },
            // CTA
            cta_heading: { sel: '.cta-content h2', prop: 'text' },
            cta_subheading: { sel: '.cta-content > p', prop: 'text' },
            // Contact
            contact_tag: { sel: '#contact .section-tag', prop: 'text' },
            contact_title: { sel: '#contact .section-title', prop: 'html' },
            contact_loc_title: { sel: '.contact-card:nth-child(1) h4', prop: 'text' },
            contact_loc_text: { sel: '.contact-card:nth-child(1) > p', prop: 'text' },
            contact_loc_note: { sel: '.contact-card:nth-child(1) .contact-note', prop: 'text' },
            contact_phone_title: { sel: '.contact-card:nth-child(2) h4', prop: 'text' },
            contact_phone: { sel: '.contact-card:nth-child(2) .contact-link', prop: 'text' },
            contact_phone_href: { sel: '.contact-card:nth-child(2) .contact-link', prop: 'href' },
            contact_insta_title: { sel: '.contact-card:nth-child(3) h4', prop: 'text' },
            contact_insta: { sel: '.contact-card:nth-child(3) .contact-link', prop: 'text' },
            contact_insta_href: { sel: '.contact-card:nth-child(3) .contact-link', prop: 'href' },
            contact_insta_note: { sel: '.contact-card:nth-child(3) .contact-note', prop: 'text' },
            contact_cta_title: { sel: '.contact-cta-card h3', prop: 'text' },
            contact_cta_desc: { sel: '.contact-cta-card > p', prop: 'text' },
            // Footer
            footer_name: { sel: '.footer-name', prop: 'text' },
            footer_desc: { sel: '.footer-desc', prop: 'text' },
            footer_copyright: { sel: '.footer-bottom p', prop: 'html' },
        };

        for (const [key, val] of Object.entries(content)) {
            if (!val) continue;
            const mapping = fieldMap[key];
            if (mapping) {
                const el = document.querySelector(mapping.sel);
                if (!el) continue;
                switch (mapping.prop) {
                    case 'text': el.textContent = val; break;
                    case 'textOnly': {
                        // Preserve child elements, replace only text
                        const children = Array.from(el.children);
                        el.textContent = val;
                        children.forEach(c => el.insertBefore(c, el.firstChild));
                        break;
                    }
                    case 'html': el.innerHTML = val; break;
                    case 'src':
                        el.setAttribute('src', val);
                        el.style.display = '';
                        // Hide placeholder sibling
                        const placeholder = el.nextElementSibling;
                        if (placeholder && placeholder.style.display === 'flex') {
                            placeholder.style.display = 'none';
                        }
                        break;
                    case 'href': el.setAttribute('href', val); break;
                }
                continue;
            }

            // Handle dynamic card keys (services_card0_title, etc.)
            if (key.includes('_card') || key.includes('_fcard')) {
                applyCardContent(key, val);
            }
        }
    } catch (e) {}

    // Apply gallery images
    try {
        const gallery = JSON.parse(localStorage.getItem('galleryImages') || '[]');
        if (gallery.length > 0) {
            const grid = document.querySelector('.gallery-grid');
            if (grid) {
                grid.innerHTML = '';
                gallery.forEach(img => {
                    const item = document.createElement('div');
                    item.className = 'gallery-item';
                    item.innerHTML = `<div class="gallery-placeholder"><img src="${img.src}" alt="${img.alt || ''}"></div>`;
                    grid.appendChild(item);
                });
            }
        }
    } catch (e) {}

    function applyCardContent(key, val) {
        // Parse key like: services_card0_title or pricing_children_card1_body
        const parts = key.split('_');
        let cardType, cardIndex, fieldName;

        if (key.includes('_fcard')) {
            // Feature card: afterschool_fcard0_title
            const match = key.match(/^(\w+)_fcard(\d+)_(\w+)$/);
            if (!match) return;
            const [, section, idx, field] = match;
            const selMap = { afterschool: '.feature-card' };
            const sel = selMap[section];
            if (!sel) return;
            const cards = document.querySelectorAll(sel);
            const card = cards[parseInt(idx)];
            if (!card) return;
            const fieldSelMap = { title: 'h4', desc: 'p' };
            const el = card.querySelector(fieldSelMap[field]);
            if (el) el.textContent = val;
            return;
        }

        // Service cards: services_card0_title
        const simpleMatch = key.match(/^(\w+)_card(\d+)_(\w+)$/);
        if (simpleMatch) {
            const [, section, idx, field] = simpleMatch;
            const selMap = {
                services: '.service-card',
            };
            const sel = selMap[section];
            if (sel) {
                const cards = document.querySelectorAll(sel);
                const card = cards[parseInt(idx)];
                if (!card) return;
                const fieldSelMap = { title: '.service-title', age: '.service-age', details: '.service-details' };
                const el = card.querySelector(fieldSelMap[field]);
                if (el) {
                    if (field === 'details') el.innerHTML = val;
                    else el.textContent = val;
                }
                return;
            }
        }

        // Pricing tab cards: pricing_children_card0_title
        const tabMatch = key.match(/^pricing_(\w+)_card(\d+)_(\w+)$/);
        if (tabMatch) {
            const [, tab, idx, field] = tabMatch;
            const cards = document.querySelectorAll(`#tab-${tab} .price-card`);
            const card = cards[parseInt(idx)];
            if (!card) return;
            const fieldSelMap = { title: 'h4', body: '.price-card-body' };
            const el = card.querySelector(fieldSelMap[field]);
            if (el) {
                if (field === 'body') el.innerHTML = val;
                else el.textContent = val;
            }
        }
    }
})();

/* ========================================
   Preloader
   ======================================== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initAnimations();
    }, 800);
});

document.body.style.overflow = 'hidden';

/* ========================================
   Navbar Scroll Effect
   ======================================== */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Floating CTA visibility
    const floatingCta = document.getElementById('floatingCta');
    if (currentScroll > 600) {
        floatingCta.classList.add('visible');
    } else {
        floatingCta.classList.remove('visible');
    }

    lastScroll = currentScroll;
});

/* ========================================
   Mobile Navigation
   ======================================== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu on link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/* ========================================
   Scroll Animations (Intersection Observer)
   ======================================== */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* ========================================
   Pricing Tabs
   ======================================== */
const pricingTabs = document.querySelectorAll('.pricing-tab');
const pricingContents = document.querySelectorAll('.pricing-content');

pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        pricingTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        pricingContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `tab-${targetTab}`) {
                content.classList.add('active');
            }
        });
    });
});

/* ========================================
   Smooth Scroll for anchor links
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ========================================
   Interactive Particle Network Canvas
   ======================================== */
(function() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const hero = document.querySelector('.hero');
    let mouse = { x: -9999, y: -9999 };
    let particles = [];
    const isMobile = window.innerWidth <= 768;
    const PARTICLE_COUNT = isMobile ? 25 : 60;
    const CONNECT_DIST = isMobile ? 100 : 150;
    const MOUSE_RADIUS = 180;
    const colors = ['#E879F9', '#F5A623', '#38BDF8', '#86EFAC'];

    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.r = Math.random() * 2.5 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.5 + 0.3;
        }
        update() {
            // Mouse repulsion
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS && dist > 0) {
                const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.8;
                this.vx += (dx / dist) * force;
                this.vy += (dy / dist) * force;
            }
            this.vx *= 0.98;
            this.vy *= 0.98;
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = (1 - dist / CONNECT_DIST) * 0.15;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    let animId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        animId = requestAnimationFrame(animate);
    }
    animate();

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    // Pause when not visible
    const io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) { cancelAnimationFrame(animId); }
        else { animate(); }
    }, { threshold: 0.1 });
    io.observe(hero);
})();

/* ========================================
   Split-Text Letter Animation
   ======================================== */
function splitTextAnimate() {
    const lines = document.querySelectorAll('.hero-title-line');
    let totalDelay = 0;

    lines.forEach((line) => {
        const text = line.textContent.trim();
        line.textContent = '';
        const isAccent = line.classList.contains('accent');

        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${(totalDelay + i) * 0.04 + 0.5}s`;
            if (isAccent) span.style.color = '#E879F9';
            line.appendChild(span);
        });
        totalDelay += text.length;
    });
}

/* ========================================
   Staggered Element Reveal
   ======================================== */
function revealHeroElements() {
    const selectors = ['.hero-badge', '.hero-subtitle', '.hero-description', '.hero-buttons', '.hero-image'];
    const baseDelay = 1.6; // after title finishes
    selectors.forEach((sel, i) => {
        const el = document.querySelector(`.hero ${sel}`);
        if (el) {
            el.style.animationDelay = `${baseDelay + i * 0.15}s`;
            el.classList.add('revealed');
        }
    });
}

/* ========================================
   Magnetic Floating Cards
   ======================================== */
(function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const cards = document.querySelectorAll('.floating-card');
    const cardPositions = [];
    let mx = -9999, my = -9999;

    cards.forEach(card => {
        cardPositions.push({ x: 0, y: 0, tx: 0, ty: 0 });
    });

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });

    function tick() {
        cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const heroRect = hero.getBoundingClientRect();
            const cx = rect.left - heroRect.left + rect.width / 2;
            const cy = rect.top - heroRect.top + rect.height / 2;
            const dx = mx - cx;
            const dy = my - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200 && dist > 0) {
                const strength = (200 - dist) / 200 * 25;
                cardPositions[i].tx = (dx / dist) * strength;
                cardPositions[i].ty = (dy / dist) * strength;
            } else {
                cardPositions[i].tx = 0;
                cardPositions[i].ty = 0;
            }

            // Lerp
            cardPositions[i].x += (cardPositions[i].tx - cardPositions[i].x) * 0.08;
            cardPositions[i].y += (cardPositions[i].ty - cardPositions[i].y) * 0.08;

            card.style.transform = `translate(${cardPositions[i].x}px, ${cardPositions[i].y}px)`;
        });
        requestAnimationFrame(tick);
    }
    tick();
})();

/* ========================================
   3D Tilt on Hero Photo
   ======================================== */
(function() {
    const wrapper = document.querySelector('.hero-image-wrapper');
    const frame = document.querySelector('.hero-image-frame');
    if (!wrapper || !frame) return;

    // Add shine overlay
    const shine = document.createElement('div');
    shine.className = 'shine-overlay';
    frame.appendChild(shine);

    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        frame.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
        shine.style.opacity = '1';
        shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        frame.style.transform = 'rotateY(0) rotateX(0)';
        shine.style.opacity = '0';
    });
})();

/* ========================================
   Hero Entrance Orchestrator
   ======================================== */
function animateHeroEntrance() {
    splitTextAnimate();
    revealHeroElements();
}

setTimeout(animateHeroEntrance, 900);

/* ========================================
   Counter Animation
   ======================================== */
function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const update = () => {
        start += step;
        if (start >= target) {
            el.textContent = target.toLocaleString();
            return;
        }
        el.textContent = Math.floor(start).toLocaleString();
        requestAnimationFrame(update);
    };
    update();
}

/* Tilt effect removed — cards stay calm on hover */

/* ========================================
   Active nav link on scroll
   ======================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ========================================
   Typed Text Effect for Hero
   ======================================== */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

/* ========================================
   Ripple effect on buttons
   ======================================== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ========================================
   Gradient text color shift on scroll
   ======================================== */
const textGradients = document.querySelectorAll('.text-gradient');
let hueRotate = 0;

function animateGradients() {
    hueRotate = (hueRotate + 0.3) % 360;
    textGradients.forEach(el => {
        el.style.filter = `hue-rotate(${hueRotate}deg)`;
    });
    requestAnimationFrame(animateGradients);
}
animateGradients();

/* ========================================
   Cursor glow trail effect
   ======================================== */
function createCursorGlow() {
    const glow = document.createElement('div');
    glow.id = 'cursorGlow';
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(232,121,249,0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
        opacity: 0;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
}

if (window.innerWidth > 768) {
    createCursorGlow();
}

/* ========================================
   Section reveal with stagger
   ======================================== */
function initStaggerAnimations() {
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('.service-card, .price-card, .feature-card, .contact-card, .activity-group, .stat-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.services-grid, .pricing-grid, .afterschool-features, .contact-info, .afterschool-activities, .about-stats').forEach(grid => {
        const children = grid.querySelectorAll('.service-card, .price-card, .feature-card, .contact-card, .activity-group, .stat-item');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        staggerObserver.observe(grid);
    });
}

initStaggerAnimations();

/* Text scramble removed — too jumpy for service cards */

/* ========================================
   Smooth number counting on price cards
   ======================================== */
function animatePriceOnScroll() {
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceEl = entry.target;
                const text = priceEl.textContent;
                const match = text.match(/(\d[\d\s]*)/);
                if (match) {
                    const numStr = match[1].replace(/\s/g, '');
                    const target = parseInt(numStr);
                    const suffix = text.replace(match[0], '');
                    const prefix = text.substring(0, text.indexOf(match[0]));
                    let current = 0;
                    const step = target / 40;
                    const animate = () => {
                        current += step;
                        if (current >= target) {
                            priceEl.textContent = text;
                            return;
                        }
                        priceEl.textContent = prefix + Math.floor(current).toLocaleString('ru-RU') + suffix;
                        requestAnimationFrame(animate);
                    };
                    animate();
                }
                priceObserver.unobserve(priceEl);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.price-amount').forEach(el => {
        priceObserver.observe(el);
    });
}

animatePriceOnScroll();

/* ========================================
   Navbar active link highlight with sliding indicator
   ======================================== */

/* Gallery reveal handled by .animate-on-scroll on the grid */

/* ========================================
   Magnetic effect on CTA buttons
   ======================================== */
document.querySelectorAll('.btn-pulse, .floating-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

/* ========================================
   Floating Bubbles on Sections
   ======================================== */
(function() {
    const sections = document.querySelectorAll('.about, .services, .pricing, .afterschool, .gallery, .contact');
    const bubbleColors = [
        'rgba(232,121,249,0.15)',
        'rgba(245,166,35,0.12)',
        'rgba(56,189,248,0.12)',
        'rgba(134,239,172,0.1)',
        'rgba(192,38,211,0.1)',
    ];

    sections.forEach(section => {
        section.style.position = 'relative';
        const container = document.createElement('div');
        container.className = 'section-bubbles';
        section.insertBefore(container, section.firstChild);

        function spawnBubble() {
            if (!document.querySelector('.section-bubbles')) return;
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            const size = Math.random() * 30 + 10;
            const x = Math.random() * 100;
            const duration = Math.random() * 8 + 8;
            const delay = Math.random() * 2;
            const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
            const isBorder = Math.random() > 0.5;

            bubble.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                bottom: -${size}px;
                ${isBorder ? `border: 2px solid ${color}; background: transparent;` : `background: ${color};`}
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;
            container.appendChild(bubble);
            setTimeout(() => bubble.remove(), (duration + delay) * 1000);
        }

        // Spawn bubbles when section is visible
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                for (let i = 0; i < 6; i++) setTimeout(() => spawnBubble(), i * 600);
                const interval = setInterval(() => {
                    if (!entry.isIntersecting) { clearInterval(interval); return; }
                    spawnBubble();
                }, 2000);
                io.disconnect();
                // Stop after 30s to save resources
                setTimeout(() => clearInterval(interval), 30000);
            }
        }, { threshold: 0.1 });
        io.observe(section);
    });
})();

/* ========================================
   Icon Wiggle on Scroll
   ======================================== */
(function() {
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icons = entry.target.querySelectorAll('.service-mat-icon, .feature-mat-icon, .contact-mat-icon');
                icons.forEach((icon, i) => {
                    setTimeout(() => {
                        icon.classList.add('wiggle');
                        icon.addEventListener('animationend', () => icon.classList.remove('wiggle'), { once: true });
                    }, i * 150);
                });
                iconObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.services-grid, .afterschool-features, .contact-info').forEach(el => {
        iconObserver.observe(el);
    });
})();

/* ========================================
   Mini Game — Catch the Notes & Brushes
   ======================================== */
(function() {
    const area = document.getElementById('gameArea');
    const startOverlay = document.getElementById('gameStartOverlay');
    const endOverlay = document.getElementById('gameEndOverlay');
    const startBtn = document.getElementById('gameStartBtn');
    const restartBtn = document.getElementById('gameRestartBtn');
    const scoreEl = document.getElementById('gameScore');
    const timerEl = document.getElementById('gameTimer');
    const resultEl = document.getElementById('gameResult');
    if (!area || !startBtn) return;

    const ITEMS = [
        { emoji: '\uD83C\uDFB5', points: 10, color: '#E879F9' },
        { emoji: '\uD83C\uDFB6', points: 10, color: '#D946EF' },
        { emoji: '\uD83C\uDFA8', points: 15, color: '#F5A623' },
        { emoji: '\uD83C\uDFB8', points: 20, color: '#38BDF8' },
        { emoji: '\u2B50', points: 25, color: '#FBBF24' },
        { emoji: '\uD83E\uDDD1\u200D\uD83C\uDFA8', points: 30, color: '#86EFAC' },
    ];

    let score = 0;
    let timeLeft = 30;
    let gameInterval = null;
    let spawnInterval = null;
    let fallIntervals = [];
    let running = false;

    function reset() {
        score = 0;
        timeLeft = 30;
        scoreEl.textContent = '0';
        timerEl.textContent = '30';
        area.querySelectorAll('.game-item, .game-catch-effect, .game-points-popup').forEach(el => el.remove());
        fallIntervals.forEach(id => cancelAnimationFrame(id));
        fallIntervals = [];
    }

    function spawnItem() {
        if (!running) return;
        const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
        const el = document.createElement('div');
        el.className = 'game-item';
        el.textContent = item.emoji;
        const areaW = area.offsetWidth;
        const x = Math.random() * (areaW - 60) + 6;
        el.style.left = x + 'px';
        el.style.top = '-50px';
        area.appendChild(el);

        const speed = Math.random() * 1.5 + 1.2;
        let posY = -50;

        function fall() {
            if (!running) { el.remove(); return; }
            posY += speed;
            el.style.top = posY + 'px';
            if (posY > area.offsetHeight + 10) {
                el.remove();
                return;
            }
            const id = requestAnimationFrame(fall);
            fallIntervals.push(id);
        }
        fall();

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!running) return;
            score += item.points;
            scoreEl.textContent = score;

            // Burst effect
            const burst = document.createElement('div');
            burst.className = 'game-catch-effect';
            burst.style.left = (parseFloat(el.style.left) - 6) + 'px';
            burst.style.top = (posY - 6) + 'px';
            burst.style.background = `radial-gradient(circle, ${item.color}66 0%, transparent 70%)`;
            area.appendChild(burst);
            setTimeout(() => burst.remove(), 500);

            // Points popup
            const popup = document.createElement('div');
            popup.className = 'game-points-popup';
            popup.textContent = '+' + item.points;
            popup.style.left = el.style.left;
            popup.style.top = posY + 'px';
            popup.style.color = item.color;
            area.appendChild(popup);
            setTimeout(() => popup.remove(), 800);

            el.remove();
        });
    }

    function getResult(s) {
        if (s >= 300) return { title: '\uD83C\uDFC6 \u0412\u0438\u0440\u0442\u0443\u043E\u0437!', desc: '\u0412\u044B \u043F\u0440\u0438\u0440\u043E\u0436\u0434\u0451\u043D\u043D\u044B\u0439 \u0442\u0430\u043B\u0430\u043D\u0442! \u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0439\u0442\u0435\u0441\u044C \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u044F \u2014 \u0440\u0430\u0437\u0432\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043F\u043E\u0442\u0435\u043D\u0446\u0438\u0430\u043B!' };
        if (s >= 200) return { title: '\uD83C\uDF1F \u041E\u0442\u043B\u0438\u0447\u043D\u043E!', desc: '\u0423 \u0432\u0430\u0441 \u043E\u0442\u043B\u0438\u0447\u043D\u0430\u044F \u0440\u0435\u0430\u043A\u0446\u0438\u044F \u0438 \u0447\u0443\u0432\u0441\u0442\u0432\u043E \u0440\u0438\u0442\u043C\u0430!' };
        if (s >= 100) return { title: '\uD83D\uDE0A \u0425\u043E\u0440\u043E\u0448\u043E!', desc: '\u041D\u0435\u043C\u043D\u043E\u0433\u043E \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438 \u2014 \u0438 \u0431\u0443\u0434\u0435\u0442 \u0441\u0443\u043F\u0435\u0440!' };
        return { title: '\uD83C\uDF31 \u041D\u0430\u0447\u0430\u043B\u043E \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u043E!', desc: '\u041A\u0430\u0436\u0434\u044B\u0439 \u043C\u0430\u0441\u0442\u0435\u0440 \u043A\u043E\u0433\u0434\u0430-\u0442\u043E \u043D\u0430\u0447\u0438\u043D\u0430\u043B. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451!' };
    }

    function endGame() {
        running = false;
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        const r = getResult(score);
        resultEl.innerHTML = `
            <span class="result-score">${score}</span>
            <span class="result-title">${r.title}</span>
            <span class="result-desc">${r.desc}</span>
            <a href="https://t.me/anastasiia_wolf_1" target="_blank" class="game-cta-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Написать в Telegram
            </a>
        `;
        endOverlay.style.display = 'flex';
    }

    function startGame() {
        reset();
        startOverlay.style.display = 'none';
        endOverlay.style.display = 'none';
        running = true;

        spawnInterval = setInterval(spawnItem, 600);

        // Speed up spawning over time
        setTimeout(() => { if (running) { clearInterval(spawnInterval); spawnInterval = setInterval(spawnItem, 400); } }, 10000);
        setTimeout(() => { if (running) { clearInterval(spawnInterval); spawnInterval = setInterval(spawnItem, 280); } }, 20000);

        gameInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft <= 0) endGame();
        }, 1000);
    }

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
})();
