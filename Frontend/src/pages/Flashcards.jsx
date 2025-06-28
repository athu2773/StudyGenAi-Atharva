import React, { useState } from "react";
import { generateFlashcards } from "../services/ai";
import Card from "../components/Card";

const Flashcards = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    if (!subject.trim() || !topic.trim()) {
      setError("Please enter both subject and topic.");
      return;
    }
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await generateFlashcards({ subject, topic }, token);
      setFlashcards(res.flashcards);
    } catch {
      setError("Failed to generate flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-700 drop-shadow">
          AI Flashcards Generator
        </h1>
        <Card
          title="Create Flashcards"
          className="mb-4 bg-gradient-to-br from-purple-100 to-blue-100 border-0 shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              className="border border-purple-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Subject (e.g. Biology)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <input
              className="border border-purple-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Topic (e.g. Photosynthesis)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <button
            onClick={handleGenerate}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow hover:from-purple-700 hover:to-blue-600 transition font-bold disabled:opacity-60 w-full"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Flashcards"}
          </button>
          {error && (
            <div className="text-red-600 mt-2 font-medium text-center">
              {error}
            </div>
          )}
        </Card>
        {flashcards && (
          <Card
            title="AI Flashcards"
            className="mt-6 bg-white border-2 border-purple-200 shadow-lg"
          >
            <pre className="whitespace-pre-wrap text-gray-800 text-base leading-relaxed bg-purple-50 rounded-lg p-4 overflow-x-auto">
              {flashcards}
            </pre>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Flashcards;