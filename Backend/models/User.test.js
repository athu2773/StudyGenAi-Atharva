const mongoose = require('mongoose');
const User = require('./User');
require('dotenv').config();

describe('User Model Integration', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save a user successfully', async () => {
    const userData = { name: 'Test User', email: 'testuser@example.com', password: 'password123' };
    const user = new User(userData);
    const savedUser = await user.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    await User.deleteOne({ _id: savedUser._id });
  });

  it('should not save user with duplicate email', async () => {
    const userData = { name: 'Test User', email: 'duplicate@example.com', password: 'password123' };
    await User.create(userData);
    let err;
    try {
      await User.create(userData);
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    await User.deleteMany({ email: 'duplicate@example.com' });
  });
});
