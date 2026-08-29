// Part 1 Exercises (use Copilot inline suggestions)

// Exercise 1: Comment-Driven Development
// Function to calculate the factorial of a number

function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}           
// Exercise 2: Array Operations
const numList = [1, 2, 3, 4, 5];

// Filter even numbers
const evenNumbers = numList.filter(num => num % 2 === 0);



// Exercise 3: Function from Signature
// Type this on a new line and press Enter:
// function reverseString(str)
function reverseString(str) {
    return str.split('').reverse().join('');
}

    

// Exercise 4: Process User Data    

function processUserData(users) {
  if (!Array.isArray(users)) {
    throw new TypeError('users must be an array');
  }

  return users
    .filter((user) => {
      if (!user || typeof user !== 'object') {
        return false;
      }
      const { age, name, email } = user;
      return (
        typeof age === 'number' &&
        !Number.isNaN(age) &&
        age >= 18 &&
        typeof name === 'string' &&
        name.trim().length > 0 &&
        typeof email === 'string' &&
        email.trim().length > 0
      );
    })
    .map(({ name, email }) => ({ name, email }));
}