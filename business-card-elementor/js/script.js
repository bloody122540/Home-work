/* ==========================================================
   SCRIPT.JS — финальная версия
   ========================================================== */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* ================= ПРОГРЕСС-БАР ================= */
    var scrollProgress = document.getElementById("scrollProgress");
    if (scrollProgress) {
        var updateProgress = function () {
            var top =
                window.pageYOffset || document.documentElement.scrollTop || 0;
            var h = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress.style.width = h > 0 ? (top / h) * 100 + "%" : "0%";
        };
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress, { passive: true });
        updateProgress();
    }

    /* ================= 3D-НАКЛОН ВИЗИТОК ================= */
    function applyTiltEffect(el) {
        if (!el) return;
        var reset = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        el.addEventListener("mousemove", function (e) {
            var r = el.getBoundingClientRect();
            var x = e.clientX - r.left;
            var y = e.clientY - r.top;
            var rx = ((y - r.height / 2) / (r.height / 2)) * -12;
            var ry = ((x - r.width / 2) / (r.width / 2)) * 12;
            el.style.transform =
                "perspective(1000px) rotateX(" +
                rx +
                "deg) rotateY(" +
                ry +
                "deg)";
        });
        el.addEventListener("mouseleave", function () {
            el.style.transform = reset;
        });
    }
    applyTiltEffect(document.getElementById("business-card"));
    applyTiltEffect(document.querySelector(".mini-card"));

    /* ================= ЭЛЕМЕНТЫ ================= */
    var overlay = document.getElementById("intro-overlay");
    var enterBtn = document.getElementById("enter-btn");
    var mainSite = document.getElementById("main-site");
    var logoTrigger = document.getElementById("logo-trigger");
    var miniCardModal = document.getElementById("mini-card-modal");
    var closeModal = document.querySelector(".close-modal");

    /* ================= ПЕРЕХОД НА САЙТ ================= */
    var siteOpened = false;
    function openSite() {
        if (siteOpened) return;
        siteOpened = true;
        if (!overlay || !mainSite) return;
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
        window.setTimeout(function () {
            overlay.classList.add("hidden");
            mainSite.classList.remove("hidden");
            window.setTimeout(initReveal, 50);
        }, 800);
    }
    if (overlay) overlay.addEventListener("click", openSite);
    if (enterBtn) {
        enterBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            openSite();
        });
    }

    /* ================= МИНИ-ВИЗИТКА ================= */
    if (logoTrigger && miniCardModal) {
        logoTrigger.addEventListener("click", function () {
            miniCardModal.classList.remove("hidden");
        });
    }
    if (closeModal && miniCardModal) {
        closeModal.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            miniCardModal.classList.add("hidden");
        });
    }
    if (miniCardModal) {
        miniCardModal.addEventListener("click", function (e) {
            if (e.target === miniCardModal)
                miniCardModal.classList.add("hidden");
        });
    }

    /* ================= ПЛАВНАЯ ПРОКРУТКА МЕНЮ ================= */
    Array.prototype.forEach.call(
        document.querySelectorAll(".nav a"),
        function (link) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                var href = link.getAttribute("href");
                if (!href || href.charAt(0) !== "#") return;
                var target = document.querySelector(href);
                if (target) {
                    var offset =
                        target.getBoundingClientRect().top +
                        window.pageYOffset -
                        80;
                    window.scrollTo({ top: offset, behavior: "smooth" });
                }
            });
        },
    );

    /* ================= REVEAL-АНИМАЦИИ ================= */
    var revealInitialized = false;
    function initReveal() {
        if (revealInitialized) return;
        revealInitialized = true;

        var selectors = [
            "#about .section-title",
            "#about .about-text p",
            "#portfolio .section-title",
            "#pricing .section-title",
            "#contacts .section-title",
            ".stats-grid",
            ".contact-links",
        ];
        selectors.forEach(function (sel, idx) {
            Array.prototype.forEach.call(
                document.querySelectorAll(sel),
                function (el) {
                    if (!el.classList.contains("reveal")) {
                        el.classList.add("reveal");
                        if (idx > 0)
                            el.classList.add(
                                "reveal-delay-" + Math.min(idx, 8),
                            );
                    }
                },
            );
        });
        Array.prototype.forEach.call(
            document.querySelectorAll(".price-card"),
            function (el, i) {
                if (!el.classList.contains("reveal")) {
                    el.classList.add("reveal");
                    el.classList.add("reveal-delay-" + ((i % 8) + 1));
                }
            },
        );

        if ("IntersectionObserver" in window) {
            var observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("visible");
                            var rt = entry.target.querySelector(".reveal-text");
                            if (rt) rt.classList.add("visible");
                            if (entry.target.classList.contains("stats-grid"))
                                animateCounters();
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
            );
            Array.prototype.forEach.call(
                document.querySelectorAll(".reveal"),
                function (el) {
                    observer.observe(el);
                },
            );
        } else {
            Array.prototype.forEach.call(
                document.querySelectorAll(".reveal"),
                function (el) {
                    el.classList.add("visible");
                },
            );
        }
    }

    /* ================= СЧЁТЧИКИ ================= */
    var countersDone = false;
    function animateCounters() {
        if (countersDone) return;
        countersDone = true;
        Array.prototype.forEach.call(
            document.querySelectorAll(".stat-number"),
            function (counter) {
                var target =
                    parseInt(counter.getAttribute("data-target"), 10) || 0;
                var start = performance.now();
                (function tick(now) {
                    var p = Math.min((now - start) / 1800, 1);
                    var ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
                    counter.textContent = Math.floor(target * ease);
                    if (p < 1) requestAnimationFrame(tick);
                    else counter.textContent = target;
                })(start);
            },
        );
    }

    /* ================= ШАПКА ПРИ СКРОЛЛЕ ================= */
    var header = document.querySelector(".header");
    if (header) {
        window.addEventListener(
            "scroll",
            function () {
                if (window.pageYOffset > 80) {
                    header.style.padding = "12px 50px";
                    header.style.backgroundColor = "rgba(244, 243, 241, 0.95)";
                } else {
                    header.style.padding = "20px 50px";
                    header.style.backgroundColor = "rgba(244, 243, 241, 0.9)";
                }
            },
            { passive: true },
        );
    }

    /* ==========================================================
       ПОРТФОЛИО — MARQUEE
       Авто-прокрутка + драг мышью/пальцем + колесо мыши
       ========================================================== */
    function initMarquee() {
        try {
            var wrapper = document.querySelector(".marquee-wrapper");
            var content = document.querySelector(".marquee-content");
            if (!wrapper || !content) return;

            /* ---- Создаём трек и клонируем контент ---- */
            var track = document.createElement("div");
            track.className = "marquee-track";
            wrapper.appendChild(track);
            track.appendChild(content);

            var originalWidth = content.getBoundingClientRect().width;
            if (originalWidth < 10) {
                // картинки могли ещё не загрузиться — попробуем позже
                window.setTimeout(initMarquee, 300);
                return;
            }

            var neededWidth = window.innerWidth * 2;
            var copies = Math.ceil(neededWidth / originalWidth) + 1;
            for (var i = 1; i < copies; i++) {
                var clone = content.cloneNode(true);
                clone.setAttribute("aria-hidden", "true");
                track.appendChild(clone);
            }

            /* ---- Переменные движения ---- */
            var offset = 0;
            var AUTO_SPEED = 0.6; // скорость авто-прокрутки
            var WHEEL_FACTOR = 0.4; // чувствительность колеса
            var FRICTION = 0.94; // затухание инерции
            var wheelVelocity = 0;
            var MAX_WHEEL = 25;

            var dragging = false;
            var startX = 0;
            var startOffset = 0;
            var dragMoved = false;

            function normalize() {
                while (offset <= -originalWidth) offset += originalWidth;
                while (offset > 0) offset -= originalWidth;
            }

            function loop() {
                if (!dragging) {
                    offset -= AUTO_SPEED;
                    offset -= wheelVelocity;
                    wheelVelocity *= FRICTION;
                    if (Math.abs(wheelVelocity) < 0.05) wheelVelocity = 0;
                }
                normalize();
                track.style.transform =
                    "translate3d(" + offset.toFixed(2) + "px,0,0)";
                requestAnimationFrame(loop);
            }
            loop();

            /* ---- Драг мышью ---- */
            wrapper.addEventListener("mousedown", function (e) {
                dragging = true;
                dragMoved = false;
                startX = e.clientX;
                startOffset = offset;
                wheelVelocity = 0;
                wrapper.classList.add("is-dragging");
                e.preventDefault();
            });
            window.addEventListener("mousemove", function (e) {
                if (!dragging) return;
                var dx = e.clientX - startX;
                if (Math.abs(dx) > 5) dragMoved = true;
                offset = startOffset + dx;
                normalize();
            });
            window.addEventListener("mouseup", function () {
                if (!dragging) return;
                dragging = false;
                wrapper.classList.remove("is-dragging");
            });

            /* ---- Драг пальцем ---- */
            wrapper.addEventListener(
                "touchstart",
                function (e) {
                    dragging = true;
                    dragMoved = false;
                    startX = e.touches[0].clientX;
                    startOffset = offset;
                    wheelVelocity = 0;
                },
                { passive: true },
            );
            wrapper.addEventListener(
                "touchmove",
                function (e) {
                    if (!dragging) return;
                    var dx = e.touches[0].clientX - startX;
                    if (Math.abs(dx) > 5) dragMoved = true;
                    offset = startOffset + dx;
                    normalize();
                },
                { passive: true },
            );
            wrapper.addEventListener("touchend", function () {
                dragging = false;
            });

            /* ---- Колесо мыши ----
               Обычное колесо / свайп вверх-вниз → двигает ленту.
               Shift + колесо → обычная прокрутка страницы.  */
            wrapper.addEventListener(
                "wheel",
                function (e) {
                    if (e.shiftKey) return; // Shift → отдаём событие странице
                    var delta =
                        Math.abs(e.deltaX) > Math.abs(e.deltaY)
                            ? e.deltaX
                            : e.deltaY;
                    if (Math.abs(delta) < 1) return;

                    wheelVelocity += delta * WHEEL_FACTOR;
                    if (wheelVelocity > MAX_WHEEL) wheelVelocity = MAX_WHEEL;
                    if (wheelVelocity < -MAX_WHEEL) wheelVelocity = -MAX_WHEEL;

                    e.preventDefault();
                },
                { passive: false },
            );

            /* ---- Защита от ложного клика после драга ---- */
            wrapper.addEventListener(
                "click",
                function (e) {
                    if (dragMoved) {
                        e.preventDefault();
                        e.stopPropagation();
                        dragMoved = false;
                    }
                },
                true,
            );

            /* ---- Запрет перетаскивания картинок ---- */
            Array.prototype.forEach.call(
                wrapper.querySelectorAll("img"),
                function (img) {
                    img.addEventListener("dragstart", function (e) {
                        e.preventDefault();
                    });
                },
            );
        } catch (err) {
            console.warn("Marquee init error:", err);
        }
    }

    /* Запускаем marquee после полной загрузки картинок */
    if (document.readyState === "complete") {
        initMarquee();
    } else {
        window.addEventListener("load", initMarquee);
    }
});
