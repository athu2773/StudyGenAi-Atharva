const aiController = require('./ai.controller');

// Mock req, res
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('AI Controller', () => {
  it('should return 400 if required fields are missing', async () => {
    const req = { body: {} };
    const res = mockRes();
    await aiController.generateStudyPlan(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
  // Add more tests for valid input and error cases as needed
});
