document.addEventListener('DOMContentLoaded', () => {
    const carts = document.querySelector('.catalog__carts');
    if (!carts) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Обёртка и трек
    const marquee = document.createElement('div');
    marquee.className = 'catalog__marquee';

    const track = document.createElement('div');
    track.className = 'catalog__track';

    carts.parentNode.insertBefore(marquee, carts);
    marquee.appendChild(track);
    track.appendChild(carts);

    // 2. Клонируем, чтобы покрыть 2 экрана
    const originalWidth = carts.scrollWidth;
    const screenWidth = window.innerWidth;
    const copies = Math.ceil((screenWidth * 2) / originalWidth) + 1;

    for (let i = 1; i < copies; i++) {
        const clone = carts.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    }

    // 3. Состояние
    let offset = 0;          // текущий сдвиг
    let speed = 0.5;         // авто-скорость (пикселей за кадр)
    let paused = false;      // пауза (ховер / drag)
    let dragging = false;    // сейчас тащим
    let startX = 0;          // стартовая позиция мыши
    let startOffset = 0;     // offset в момент захвата

    // 4. Анимация
    function animate() {
        if (!paused && !dragging && !reduceMotion) {
            offset -= speed;
        }

        // Бесшовный цикл: держим offset в диапазоне [-originalWidth, 0]
        if (offset <= -originalWidth) offset += originalWidth;
        if (offset > 0) offset -= originalWidth;

        track.style.transform = `translateX(${Math.round(offset)}px)`;
        requestAnimationFrame(animate);
    }

    animate();

    // 5. Пауза при наведении
    marquee.addEventListener('mouseenter', () => paused = true);
    marquee.addEventListener('mouseleave', () => paused = false);

    // 6. Drag мышкой
    marquee.addEventListener('mousedown', (e) => {
        dragging = true;
        startX = e.clientX;
        startOffset = offset;
        marquee.classList.add('is-dragging');
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        offset = startOffset + dx;

        // Нормализуем в диапазон [-originalWidth, 0]
        if (offset <= -originalWidth) offset += originalWidth;
        if (offset > 0) offset -= originalWidth;
    });

    window.addEventListener('mouseup', () => {
        dragging = false;
        marquee.classList.remove('is-dragging');
    });

    // 7. Drag пальцем (тач)
    marquee.addEventListener('touchstart', (e) => {
        dragging = true;
        startX = e.touches[0].clientX;
        startOffset = offset;
    }, { passive: true });

    marquee.addEventListener('touchmove', (e) => {
        if (!dragging) return;
        const dx = e.touches[0].clientX - startX;
        offset = startOffset + dx;

        if (offset <= -originalWidth) offset += originalWidth;
        if (offset > 0) offset -= originalWidth;
    }, { passive: true });

    marquee.addEventListener('touchend', () => {
        dragging = false;
    });
});