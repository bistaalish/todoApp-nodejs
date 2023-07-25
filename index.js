const readline = require('readline');

// Function to greet the user
function greetUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter your name: ', (name) => {
    console.log(`Hello, ${name}! Welcome to the To-Do List App!`);
    rl.close();
  });
}
greetUser()

module.exports = greetUser;
