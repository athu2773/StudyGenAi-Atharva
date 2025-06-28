const mongoose = require('mongoose');
const Syllabus = require('./Syllabus');
require('dotenv').config();

describe('Syllabus Model Integration', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save a syllabus successfully', async () => {
    const syllabusData = {
      userId: new mongoose.Types.ObjectId(),
      subject: 'Math',
      deadline: new Date('2025-07-01'),
      topics: [{ title: 'Algebra', completed: false }],
    };
    const syllabus = new Syllabus(syllabusData);
    const savedSyllabus = await syllabus.save();
    expect(savedSyllabus._id).toBeDefined();
    expect(savedSyllabus.subject).toBe(syllabusData.subject);
    expect(savedSyllabus.topics.length).toBe(1);
    await Syllabus.deleteOne({ _id: savedSyllabus._id });
  });
});
