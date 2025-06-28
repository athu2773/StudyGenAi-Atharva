import React, { useState } from "react";
import { generateQuiz } from "../services/ai";
import Card from "../components/Card";

const Quiz = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");

  const handleGenerate = async () => {
    const token = localStorage.getItem("token");
    const res = await generateQuiz({ subject, topic }, token);
    setQuiz(res.quiz);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 drop-shadow">
          AI Quiz Generator
        </h1>
        <Card
          title="Create Quiz"
          className="mb-4 bg-gradient-to-br from-blue-100 to-purple-100 border-0 shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              className="border border-blue-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
            />
            <input
              className="border border-blue-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Topic"
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <button
            onClick={handleGenerate}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition font-bold w-full mb-2"
          >
            Generate Quiz
          </button>
        </Card>
        {quiz && (
          <Card
            title="AI Quiz"
            className="mt-4 bg-white border-2 border-blue-200 shadow-lg"
          >
            <pre className="whitespace-pre-wrap text-gray-800 text-base leading-relaxed bg-blue-50 rounded-lg p-4 overflow-x-auto">
              {quiz}
            </pre>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Quiz;
