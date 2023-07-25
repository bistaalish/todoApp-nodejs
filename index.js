const readline = require('readline'); // Importing realine for input and output
// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to greet the user
function greetUser() {
    rl.question('Enter your name: ', (name)=>{
        console.log(`Hello, ${name}! Welcome to the To-Do List App!`);
        rl.close();
    });
}

// Call the function to start the interaction
greetUser();