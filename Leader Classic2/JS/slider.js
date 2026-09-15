const input = document.querySelector('.input');
const output = document.querySelector('.input__value');
const arcFill = document.getElementById('arcFill');
const valueLabel = document.getElementById('valueLabel');

// длина полуокружности радиуса 317: π*R
const ARC_LENGTH = Math.PI * 317;
arcFill.style.strokeDasharray = ARC_LENGTH;

// Линейная зависимость: 25→5%, 50→10%, 75→15%, 100→20%
// т.е. отображаемое значение = percent / 5
function toDisplayValue(percent) {
    return Math.round(percent / 5);
}

function update() {
    const percent = Number(input.value); // 0..100

    // 1. заливка самого слайдера (та самая CSS-переменная --fill)
    document.documentElement.style.setProperty('--fill', percent + '%');

    // 2. заливка дуги (SVG dashoffset)
    const offset = ARC_LENGTH * (1 - percent / 100);
    arcFill.style.strokeDashoffset = offset;

    // 3. подпись — считаем формулой, поэтому плавно меняется вместе с ползунком,
    // а на 25/50/75/100 автоматически даёт ровно 5%/10%/15%/20%
    const text = toDisplayValue(percent) + '%';
    valueLabel.textContent = text;
    output.textContent = text;
    output.classList.add('is-visible');
}

input.addEventListener('input', update);
update(); // начальное состояние