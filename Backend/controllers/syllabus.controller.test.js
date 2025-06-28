const syllabusController = require('./syllabus.controller');
jest.mock('../models/Syllabus');
const Syllabus = require('../models/Syllabus');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Syllabus Controller', () => {
  it('should return 500 if syllabus creation fails', async () => {
    Syllabus.create.mockImplementation(() => { throw new Error(); });
    const req = { body: { subject: 'Math', deadline: '2025-07-01', topics: ['Algebra'] }, userId: 'user1' };
    const res = mockRes();
    await syllabusController.createSyllabus(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
  // Add more tests for successful creation, getSyllabus, and error cases
});
