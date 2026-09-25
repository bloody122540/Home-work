let targetDate = Date.now()
    + (27 * 24 * 60 * 60 * 1000)
    + (7 * 60 * 60 * 1000)
    + (40 * 60 * 1000)
    + (49 * 1000);

const timer = setInterval(function () {
    const distance = targetDate - Date.now();

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById('days').innerText = "00";
        document.getElementById('hours').innerText = "00";
        document.getElementById('minutes').innerText = "00";
        document.getElementById('seconds').innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const fDays = String(days).padStart(2, '0');
    const fHours = String(hours).padStart(2, '0');
    const fMinutes = String(minutes).padStart(2, '0');
    const fSeconds = String(seconds).padStart(2, '0');

    document.getElementById('days').innerText = fDays;
    document.getElementById('hours').innerText = fHours;
    document.getElementById('minutes').innerText = fMinutes;
    document.getElementById('seconds').innerText = fSeconds;

}, 1000);