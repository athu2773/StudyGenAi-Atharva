const connectDB = require('./db');

describe('MongoDB Connection', () => {
  it('should connect to MongoDB without throwing', async () => {
    await expect(connectDB()).resolves.not.toThrow();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
