const users = [
    { name: 'Alex', age: 24, isAdmin: false },
    { name: 'Bob', age: 13, isAdmin: false },
    { name: 'John', age: 31, isAdmin: true },
    { name: 'Jane', age: 20, isAdmin: false },
];

users.push(
    { name: 'Ann', age: 19, isAdmin: false },
    { name: 'Jack', age: 43, isAdmin: true }
);

console.log(users);


// задание 2

function getUserAverageAge(users) {
    if (users.length === 0) {
    return 0;
    }

    let totalAge = 0;

    users.forEach((user) => {
    totalAge += user.age;
    });

    return totalAge / users.length;
}

console.log(getUserAverageAge(users)); 

//задание 3

function getAllAdmins(users) {
    const admins = [];

    users.forEach((user) => {
    if (user.isAdmin) {
        admins.push(user);
    }
    });

    return admins;
}

// задание 4

function first(arr, n = 1) {
    return Array.from({ length: Math.min(n, arr.length) }, (_, i) => arr[i]);
}

const numbers = [10, 20, 30, 40, 50];

console.log(first(numbers, 3));  
console.log(first(numbers, 0));  
console.log(first(numbers));     
console.log(first(numbers, 10));  
console.log(first([], 2));      
console.log(numbers);      

