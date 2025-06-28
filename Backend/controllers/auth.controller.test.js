const authController = require('./auth.controller');

jest.mock('../models/User');
const User = require('../models/User');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Auth Controller', () => {
  it('should return 400 if user exists or bad request on register', async () => {
    User.create.mockImplementation(() => { throw new Error(); });
    const req = { body: { name: 'Test', email: 'test@test.com', password: 'pass' } };
    const res = mockRes();
    await authController.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
  // Add more tests for successful register, login, and error cases
});
