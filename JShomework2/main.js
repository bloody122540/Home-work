let x = 7;
let y = 2;

let isEven; //четное
let isOdd; // не четное

if (x % 2 === 0) {
    isEven = true;
} else {
    isEven = false;
}

console.log(isEven);
console.log(isOdd);

let age = 20;
let discount = age < 18 ? 10 : age <= 65 ? 20 : 30;

console.log(`Ваша скидка: ${discount}%`);

// let age = 1;
// if (age < 18) {
//     discount = 10;
// } else if (age <= 65) {
//     discount = 20;
// } else {
//     discount = 30;
// }
// console.log(`Ваша скидка: ${discount}%`);

switch (true) {
    case age < 18:
        discount = 10;
        break;
    case age <= 65:
        discount = 20;
        break;
    default:
        discount = 30;
}
    console.log(`Ваша скидка: ${discount}%`);

const username = prompt("Введите имя пользователя:");
const password = prompt("Введите пароль:");

if ((username === "admin" || username === "user") && password === "123456") {
    console.log("Доступ разрешён");
} else {
    console.log("Доступ запрещён");
}


const packageWeight = Number(prompt("Введите вес посылки (кг)"));
const deliveryType = prompt("Тип доставки (standard, express, premium)");

const isWeightValid = !isNaN(packageWeight) && packageWeight > 0;
const isTypeValid = deliveryType === "standard" || deliveryType === "express" || deliveryType === "premium";

if (!isWeightValid) {
    console.log("Некорректный вес");
} else if (!isTypeValid) {
    console.log("Неверный тип доставки");
} else {
    console.log("Данные введены корректно");

    let price;
    if (packageWeight < 1) {
        price = 5;
    } else if (packageWeight <= 5) {
        price = 10;
    } else {
        price = 15;
    }

let coefficient;
switch (deliveryType) {
    case "standard":
        coefficient = 1;
        break;
    case "express":
        coefficient = 1.5;
        break;
    case "premium":
        coefficient = 2;
        break;
}

    const total = price * coefficient;

    console.log(`Базовая стоимость: ${price}$`);
    console.log(`Коэффициент доставки: ${coefficient}`);
    console.log(`Итоговая стоимость: ${total}$`);
}


