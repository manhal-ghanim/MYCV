// ==========================================================
// script.js — تفاعلات موقع منهل غانم عطية
// كل دالة تتحقق من وجود العناصر قبل استخدامها لتفادي الأخطاء
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- 1) قائمة الجوال (Mobile Menu) ---------- */
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            navToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        var allNavLinks = navLinks.querySelectorAll('a');
        for (var i = 0; i < allNavLinks.length; i++) {
            allNavLinks[i].addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        }
    }

    /* ---------- 2) تأثير الظهور عند التمرير (Scroll Reveal) ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        // fallback: أظهر كل العناصر مباشرة إن لم يكن المتصفح يدعم Observer
        revealEls.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ---------- 3) عداد الإحصائيات المتحرك (Stats Counter) ---------- */
    var statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
        var statObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (el) { statObserver.observe(el); });
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1400;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var current = Math.floor(progress * target);
            el.textContent = current + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        }
        window.requestAnimationFrame(step);
    }

    /* ---------- 4) أشرطة اللغات المتحركة (Language Bars) ---------- */
    var langFills = document.querySelectorAll('.lang-fill');
    if (langFills.length > 0 && 'IntersectionObserver' in window) {
        var langObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var percent = entry.target.getAttribute('data-percent') || '0';
                    entry.target.style.width = percent + '%';
                    langObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        langFills.forEach(function (el) { langObserver.observe(el); });
    }

    /* ---------- 5) زر العودة للأعلى + شريط التقدم ---------- */
    var scrollTopBtn = document.getElementById('scrollTop');
    var progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('show', scrollTop > 400);
        }

        if (progressBar) {
            var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }
    });

    /* ---------- 6) تظليل الرابط النشط في شريط التنقل ---------- */
    var sections = document.querySelectorAll('section[id], header[id]');
    var navAnchors = document.querySelectorAll('.nav-links a');

    if (sections.length > 0 && navAnchors.length > 0 && 'IntersectionObserver' in window) {
        var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navAnchors.forEach(function (a) { a.classList.remove('active'); });
                    var activeLink = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(function (sec) { navObserver.observe(sec); });
    }

    /* ---------- 7) تأثير الكتابة المتحركة (Typing Effect) ---------- */
    var typedTextEl = document.getElementById('typedText');
    if (typedTextEl) {
        var phrases = [
            'مطور ويب وأنظمة برمجية',
            'مختص جمع بيانات ميدانية (MEAL)',
            'ميسّر دعم نفسي اجتماعي (PSS)'
        ];
        var phraseIndex = 0;
        var charIndex = 0;
        var isDeleting = false;

        function typeLoop() {
            var currentPhrase = phrases[phraseIndex];
            if (!isDeleting) {
                charIndex++;
                typedTextEl.textContent = currentPhrase.substring(0, charIndex);
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, 1600);
                    return;
                }
            } else {
                charIndex--;
                typedTextEl.textContent = currentPhrase.substring(0, charIndex);
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            }
            var speed = isDeleting ? 40 : 80;
            setTimeout(typeLoop, speed);
        }
        typeLoop();
    }

});
