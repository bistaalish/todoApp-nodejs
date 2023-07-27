// tests/taskModel.test.js

const SequelizeMock = require('sequelize-mock');
const { DataTypes } = require('sequelize');
const Task = require('../../src/models/tasksModel');

describe('Task Model', () => {
  // Initialize SequelizeMock
  const DBConnectionMock = new SequelizeMock();

  // Mock the Task model
  const TaskModelMock = DBConnectionMock.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  // Test the create task method
  describe('create task', () => {
    it('should create a new task', async () => {
      const newTaskData = {
        title: 'Test Task',
        description: 'This is a test task',
      };

      const createdTask = await TaskModelMock.create(newTaskData);

      // Ensure the created task has the correct data
      expect(createdTask.title).toBe(newTaskData.title);
      expect(createdTask.description).toBe(newTaskData.description);
      expect(createdTask.completed).toBe(false);
    });

    it('should throw an error if title or description is missing', async () => {
      const invalidTaskData = {
        title: '',
        description: 'This is a test task',
      };

      await expect(TaskModelMock.create(invalidTaskData)).rejects.toThrow();
    });
  });

  // Test the update task method
  describe('update task', () => {
    it('should update an existing task', async () => {
      const existingTaskData = {
        id: 1,
        title: 'Old Title',
        description: 'Old Description',
        completed: false,
      };

      // Create the existing task in the mock database
      await TaskModelMock.create(existingTaskData);

      // Update the task with new data
      const updatedTaskData = {
        title: 'New Title',
        description: 'New Description',
        completed: true,
      };

      const updatedTask = await TaskModelMock.update(updatedTaskData, {
        where: { id: existingTaskData.id },
      });

      // Fetch the updated task from the mock database
      const fetchedUpdatedTask = await TaskModelMock.findByPk(
        existingTaskData.id
      );

      // Ensure the task was updated with the correct data
      expect(fetchedUpdatedTask.title).toBe(updatedTaskData.title);
      expect(fetchedUpdatedTask.description).toBe(updatedTaskData.description);
      expect(fetchedUpdatedTask.completed).toBe(updatedTaskData.completed);
    });
  });

  // Test the delete task method
  describe('delete task', () => {
    it('should delete an existing task', async () => {
      const existingTaskData = {
        id: 1,
        title: 'Task to Delete',
        description: 'This task will be deleted',
        completed: false,
      };

      // Create the task in the mock database
      await TaskModelMock.create(existingTaskData);

      // Delete the task
      await TaskModelMock.destroy({
        where: { id: existingTaskData.id },
      });

      // Try to fetch the deleted task from the mock database
      const deletedTask = await TaskModelMock.findByPk(existingTaskData.id);

      // Ensure the task no longer exists
      expect(deletedTask).toBeNull();
    });
  });
});
