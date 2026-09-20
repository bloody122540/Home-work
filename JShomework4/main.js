for (let i = 1; i <= 20; i++) {
  if (i % 4 === 0) {
    console.log(i);
  }
}


const n = parseInt(prompt("Введите целое неотрицательное число:"), 10);

if (isNaN(n) || n < 0) {
    console.log("Ошибка: нужно ввести целое число, не меньше 0.");
} else {
    let factorial = 1;
    for (let i = 2; i <= n; i++) {
        factorial *= i;
    }
    console.log(`${n}! = ${factorial}`);
}

const size = 8;
let board = "";

for (let row = 0; row < size; row++) {
    let line = "";

    for (let col = 0; col < size; col++) {
        if ((row + col) % 2 === 0) {
    line += "б";
    } else {
      line += "ч";
      }
    }
    board += line + "\n";
}

console.log(board);