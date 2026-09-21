function calculateFinalPrice(basePrice, discountPercent, taxPercent) {
  const discountedPrice = basePrice - basePrice * (discountPercent / 100);
  const finalPrice = discountedPrice + discountedPrice * (taxPercent / 100);
    return finalPrice;
}

const basePrice = Number(prompt("Введите цену товара:"));
const discountPercent = Number(prompt("Введите скидку в процентах:"));
const taxPercent = Number(prompt("Введите налог в процентах:"));

if (isNaN(basePrice) || isNaN(discountPercent) || isNaN(taxPercent)) {
    console.log("Ошибка: введите числа");
} else {
    const result = calculateFinalPrice(basePrice, discountPercent, taxPercent);
    console.log("Итоговая цена:", result);
}


//Задача 2

function checkAccess(username, password) {
    if (username === "admin" && password === "123456") {
    return "Доступ разрешен";
    }
    return "Доступ запрещен";
}

const username = prompt("Введите имя пользователя:");
const password = prompt("Введите пароль:");

console.log(checkAccess(username, password));

//Задача 3

function getTimeOfDay(hour) {
    if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    return "некорректное время";
    }

    if (hour <= 5) {
    return "ночь";
    } else if (hour <= 11) {
    return "утро";
    } else if (hour <= 17) {
    return "день";
    } else {
    return "вечер";
    }
}
    const hour = Number(prompt("Введите текущий час (от 0 до 23):"));
    console.log(getTimeOfDay(hour));

// Задача 4


function findFirstEven(start, end) {
    for (let i = start; i <= end; i++) {
    if (i % 2 === 0) {
    return i;
    }
    }
    return "Четных чисел нет";
}

const start = Number(prompt("Введите начало диапазона:"));
const end = Number(prompt("Введите конец диапазона:"));

if (!Number.isInteger(start) || !Number.isInteger(end)) {
    console.log("Ошибка: введите целые числа");
} else {
    console.log(findFirstEven(start, end));
}