// tests/database.test.js

const { sequelize, testDatabaseConnection } = require('../../src/config/database');
console.log(process.env)
describe('Database Configuration', () => {
  // Test the database connection
  describe('Database Connection', () => {
    it('should establish a successful database connection', async () => {
        try {
            await sequelize.authenticate();
            console.log('Database connection successful.');
            expect(true).toBeTruthy(); // Dummy assertion to show test success
          } catch (error) {
            console.error('Database connection error:', error);
            expect(false).toBeTruthy(); // Dummy assertion to show test failure
          }
    });
  });

  // Test the loading of environment variables
  describe('Environment Variables', () => {
    it('should load database credentials from the environment variables', () => {
      expect(process.env.DB_NAME).toBeDefined();
      expect(process.env.DB_USER).toBeDefined();
      expect(process.env.DB_PASSWORD).toBeDefined();
      expect(process.env.DB_HOST).toBeDefined();
      expect(process.env.DB_PORT).toBeDefined();
    });

    it('should have non-empty values for database credentials', () => {
      expect(process.env.DB_NAME).not.toBe('');
      expect(process.env.DB_USER).not.toBe('');
      expect(process.env.DB_PASSWORD).not.toBe('');
      expect(process.env.DB_HOST).not.toBe('');
      expect(process.env.DB_PORT).not.toBe('');
    });
  });
});
