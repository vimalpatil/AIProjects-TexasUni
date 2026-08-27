// Part 1 Exercises (use Copilot inline suggestions)

// Exercise 1: Comment-Driven Development

//function to calculate the factorial of a number
function factorial(n) {
    if (n < 0) {
        return "Factorial is not defined for negative numbers.";
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}               

cosole.log(factorial(5)); // Output: 120



// Exercise 2: Array Operations
const numList = [1, 2, 3, 4, 5];

// Filter even numbers
//Exercise 3: Function from Signature
const evenNumbers = numList.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]

// Map to square each number
const squaredNumbers = numList.map(num => num * num);
console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]

// Reduce to sum all numbers
const sum = numList.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // Output: 15 

// Type this on a new line and press Enter:
//function reverseString(str) {
function reverseString(str) {
    return str.split('').reverse().join('');
}
console.log(reverseString("hello")); // Output: "olleh" 



// Exercise 4: Process User Data 

function processUserData(users) {
    let result = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].age >= 18) {
            result.push({
                name: users[i].name,
                email: users[i].email,
            });
        }
    }
    return result;
}