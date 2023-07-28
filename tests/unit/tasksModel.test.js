const { DataTypes } = require('sequelize');
const {sequelize} = require("../../src/config/database");
// var SequelizeMock = require('sequelize-mock');// const  MockSequelize  = require('sequelize-mock');
const { Task } = require('../../src/models/tasksModel');

// Create a mock Sequelize instance


describe('Task Model', () => {
  // Define the Task model using the mocked Sequelize instance
// const Task = Task(sequelize);
  // Test case for checking the model definition
  it('should define the Task model correctly', () => {
    expect(Task).toBeDefined();
    expect(Task).toBeInstanceOf(Function);
    expect(Task.init).toBeInstanceOf(Function);
  });
  // Test case for checking the properties of the Task model
  it('should have the correct properties', () => {
    // Check that the `id`, `title`, `description`, and `completed` properties exist
    expect(Task.rawAttributes).toHaveProperty('id');
    expect(Task.rawAttributes).toHaveProperty('title');
    expect(Task.rawAttributes).toHaveProperty('description');
    expect(Task.rawAttributes).toHaveProperty('completed');

    // Verify that the `id` property is an auto-incrementing integer and a primary key
    const idType = Task.rawAttributes.id.type;
    expect(idType instanceof DataTypes.INTEGER).toBe(true); // Check if the type is an INTEGER    expect(Task.rawAttributes.id.primaryKey).toBe(true);
    expect(Task.rawAttributes.id.autoIncrement).toBe(true);

    // Verify the data types and constraints of the other properties
    const titleType = Task.rawAttributes.title.type;
    expect(titleType instanceof DataTypes.STRING).toBe(true); // Check if the type is an INTEGER    expect(Task.rawAttributes.id.primaryKey).toBe(true);
    expect(Task.rawAttributes.title.allowNull).toBe(false);
    expect(Task.rawAttributes.title.validate).toEqual({ notEmpty: true });
    // Verify the data types and constraints of the other properties
    const descriptionType = Task.rawAttributes.title.type;
    expect(descriptionType instanceof DataTypes.STRING).toBe(true); // Check if the type is an INTEGER    expect(Task.rawAttributes.id.primaryKey).toBe(true);
    expect(Task.rawAttributes.description.allowNull).toBe(false);
    expect(Task.rawAttributes.description.validate).toEqual({ notEmpty: true });

    // Verify the data types and constraints of the other properties
    const completedType = Task.rawAttributes.completed.type;
    expect(completedType instanceof DataTypes.BOOLEAN).toBe(true); // Check if the type is an INTEGER    expect(Task.rawAttributes.id.primaryKey).toBe(true);
    expect(Task.rawAttributes.completed.defaultValue).toBe(false);
  });
});

describe('Task Model - CRUD Operations', () => {
  // Create a Sequelize instance with an in-memory SQLite database
  // This will be used for all CRUD operations
    // Define the Task model using the mocked Sequelize instance
  // const Task = TaskModel(sequelize);
  beforeAll(async () => {
    await sequelize.sync(); // Sync the model with the database
  });


  // Test case for creating a new task
  describe('Create Task', () => {
    it('should create a new task', async () => {
      // Arrange: Create a new task with valid data
      const newTaskData = {
        title: 'Sample Task',
        description: 'This is a sample task.',
      };

      // Act: Save the new task to the database
      const createdTask = await Task.create(newTaskData);

      // Assert: Check if the task was saved correctly
      expect(createdTask).toBeTruthy();
      expect(createdTask.title).toBe(newTaskData.title);
      expect(createdTask.description).toBe(newTaskData.description);
      expect(createdTask.completed).toBe(false); // Default value for completed property
      await createdTask.destroy();
    });

    it('should throw an error if required fields are missing', async () => {
      // Act and Assert: Attempt to create a task with missing title and description
      await expect(Task.create({})).rejects.toThrow();
    });
  });

  // Test case for reading a task
  describe('Read Task', () => {
    let createdTask;

    beforeAll(async () => {
      // Arrange: Create a new task and save it to the database before reading
      const newTaskData = {
        title: 'Sample Task',
        description: 'This is a sample task.',
      };
      createdTask = await Task.create(newTaskData);
    });

    afterAll(async ()=>{
      createdTask.destroy();
    })

    it('should retrieve a task by ID', async () => {
      // Act: Retrieve the task by its ID
      const retrievedTask = await Task.findByPk(createdTask.id);

      // Assert: Check if the retrieved task matches the original task
      expect(retrievedTask).toBeTruthy();
      expect(retrievedTask.id).toBe(createdTask.id);
      expect(retrievedTask.title).toBe(createdTask.title);
      expect(retrievedTask.description).toBe(createdTask.description);
      expect(retrievedTask.completed).toBe(createdTask.completed);
      
    });

    it('should return null if task ID does not exist', async () => {
      // Act: Attempt to retrieve a task with an invalid ID
      const retrievedTask = await Task.findByPk(-1);

      // Assert: Check if the retrieved task is null, indicating that it doesn't exist
      expect(retrievedTask).toBeNull();
    });
  });

  // Test case for updating a task
  describe('Update Task', () => {
    let createdTask;

    beforeAll(async () => {
      // Arrange: Create a new task and save it to the database before updating
      const newTaskData = {
        title: 'Sample Task',
        description: 'This is a sample task.',
      };
      createdTask = await Task.create(newTaskData);
    });
    afterAll(async() => {
      await createdTask.destroy()
    })


    it('should update a task', async () => {
      // Arrange: Update the task's properties
      const updatedTaskData = {
        title: 'Updated Task',
        description: 'This is an updated task.',
        completed: true,
      };

      // Act: Update the task in the database
      await createdTask.update(updatedTaskData);

      // Assert: Retrieve the updated task from the database and check if it was updated correctly
      const updatedTask = await Task.findByPk(createdTask.id);
      expect(updatedTask).toBeTruthy();
      expect(updatedTask.id).toBe(createdTask.id);
      expect(updatedTask.title).toBe(updatedTaskData.title);
      expect(updatedTask.description).toBe(updatedTaskData.description);
      expect(updatedTask.completed).toBe(updatedTaskData.completed);
    });

    it('should throw an error if task ID does not exist', async () => {
      // Arrange: Update a task with an invalid ID
      const updatedTaskData = {
        title: 'Updated Task',
        description: 'This is an updated task.',
        completed: true,
      };

      // Act and Assert: Attempt to update a task with an invalid ID and expect it to throw an error
      const nonExistentTaskId = -1;
      try {
        await Task.update(updatedTaskData, { where: { id: nonExistentTaskId } });
        fail('Expected Task.update to throw an error for non-existent task ID');
      } catch (error) {
        expect(error.message).toContain(''); // Adjust this check based on the actual error message returned by Sequelize
      }   
    });
  });

  // Test case for deleting a task
  describe('Delete Task', () => {
    let createdTask;

    beforeAll(async () => {
      // Arrange: Create a new task and save it to the database before deleting
      const newTaskData = {
        title: 'Sample Task',
        description: 'This is a sample task.',
      };
      createdTask = await Task.create(newTaskData);
    });

    it('should delete a task', async () => {
      // Act: Delete the task by its ID
      await createdTask.destroy();

      // Assert: Attempt to retrieve the deleted task from the database and check if it is null, indicating it was deleted
      const retrievedTask = await Task.findByPk(createdTask.id);
      expect(retrievedTask).toBeNull();
    });
  });
});
