const greetUser = require('../../index');
const readline = require('readline');

// Test the greetUser function
test('Greet the user with their name', () => {
  // Mock readline interface
  const mockInterface = {
    question: jest.fn(),
    close: jest.fn()
  };

  // Mock readline.createInterface
  readline.createInterface = jest.fn().mockReturnValue(mockInterface);

  const name = 'John';
  mockInterface.question.mockImplementationOnce((question, cb) => {
    cb(name);
  });

  const consoleSpy = jest.spyOn(console, 'log');
  const closeSpy = jest.spyOn(mockInterface, 'close');

  greetUser();

  expect(readline.createInterface).toHaveBeenCalled();
  expect(mockInterface.question).toHaveBeenCalledWith(
    'Enter your name: ',
    expect.any(Function)
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    `Hello, ${name}! Welcome to the To-Do List App!`
  );
  expect(closeSpy).toHaveBeenCalled();

  // Restore console and interface
  consoleSpy.mockRestore();
  closeSpy.mockRestore();
});
