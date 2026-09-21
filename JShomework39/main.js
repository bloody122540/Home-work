//Задание 1 

const person = {
    firstName: "Антон",
    lastName: "Власов",
    age: 31,
    isStudents: "Aroken.ru"
};

console.log(person.firstName);
console.log(person.lastName);
console.log(person.age);
console.log(person.isStudents);

// Задание 2

function isEmpty(obj) {
    if (Object.keys(obj).length === 0) {
    return true;
    }
    return false;
}

//Задание 3

const task = {
    title: "Закончить курс JS",
    description: "ЗАкончить курс Арокен",
    isCompleted: false,
};

function cloneAndModify(object, modification) {
    return { ...object, ...modification };
}

const updatedTask = cloneAndModify(task, {
    title: "Закончить курс JS",
    isCompleted: true,
});

for (let key in updatedTask) {
    if (Object.hasOwn(updatedTask, key)) {
    console.log(`${key}: ${updatedTask[key]}`);
    }
}
console.log(task);

// Задание 4

function callAllMethods(obj) {
    for (let key in obj) {
    if (Object.hasOwn(obj, key) && typeof obj[key] === "function") {
        obj[key]();
    }
    }
}
const myObject = {
    method1() {
    console.log("Метод 1 вызван");
    },
    method2() {
    console.log("Метод 2 вызван");
    },
    property: "Это не метод",
};
callAllMethods(myObject);