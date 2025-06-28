import React, { useState, useEffect } from "react";
import { fetchSyllabus, deleteSyllabus } from "../services/syllabus";
import { generatePlan } from "../services/ai";
import { fetchStudyPlans, createStudyPlan, updateStudyPlan, deleteStudyPlan } from "../services/studyplan";

const Dashboard = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [topics, setTopics] = useState("");
  const [plans, setPlans] = useState([]); // Backend study plans
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchSyllabus(token).then(setSyllabus);
    fetchStudyPlans(token).then(setPlans);
  }, []);

  const handleGeneratePlan = async (subject, topics, deadline) => {
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await generatePlan({ subject, topics, deadline }, token);
      if (res.plan) {
        // Save to backend
        const created = await createStudyPlan({ subject, topics, deadline, plan: res.plan }, token);
        setPlans((prev) => [...prev, created]);
      } else {
        setError(res.error || "Failed to generate plan");
      }
    } catch {
      setError("Failed to generate plan");
    }
  };

  const handleDeletePlan = async (id) => {
    const token = localStorage.getItem("token");
    await deleteStudyPlan(id, token);
    setPlans((prev) => prev.filter((p) => p._id !== id));
  };

  const handleEditPlan = (idx) => {
    setEditIdx(idx);
    setEditText(plans[idx].plan);
  };

  const handleSaveEdit = async (idx) => {
    const token = localStorage.getItem("token");
    const updated = await updateStudyPlan(plans[idx]._id, editText, token);
    setPlans((prev) => prev.map((p, i) => (i === idx ? updated : p)));
    setEditIdx(null);
    setEditText("");
  };

  const handleAddSyllabus = async () => {
    const token = localStorage.getItem("token");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
    try {
      const res = await fetch(`${API_BASE_URL}/syllabus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          deadline,
          topics: topics.split(",").map((t) => ({ title: t.trim(), completed: false }))
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Failed to add syllabus");
        return;
      }
      const data = await res.json();
      setSyllabus((prev) => [...prev, data]);
      setSubject("");
      setDeadline("");
      setTopics("");
      setError("");
    } catch (err) {
      setError("Network error: Unable to add syllabus",err);
    }
  };

  const handleDeleteSyllabus = async (id) => {
    const token = localStorage.getItem("token");
    await deleteSyllabus(id, token);
    setSyllabus((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">Dashboard</h1>
        <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Add New Syllabus</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Deadline (YYYY-MM-DD)"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Topics (comma-separated)"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
            />
          </div>
          <button
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:from-green-700 hover:to-blue-700 transition w-full"
            onClick={handleAddSyllabus}
          >
            Add Syllabus
          </button>
        </div>

        {syllabus.map((item, idx) => (
          <div key={item._id || idx} className="bg-white shadow rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-blue-700">{item.subject}</h2>
              <p className="text-gray-500">Deadline: {item.deadline ? item.deadline.slice(0, 10) : "No deadline"}</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:from-blue-700 hover:to-purple-700 transition"
                onClick={() => handleGeneratePlan(item.subject, item.topics.map((t) => t.title), item.deadline)}
              >
                Generate Study Plan
              </button>
              <button
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:from-red-600 hover:to-pink-600 transition"
                onClick={() => handleDeleteSyllabus(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {error && <div className="text-red-600 mb-4 text-center font-semibold">{error}</div>}

        {/* CRUD for generated plans */}
        {plans.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Your Study Plans</h3>
            {plans.map((p, idx) => (
              <div key={p._id} className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 shadow flex flex-col">
                {editIdx === idx ? (
                  <>
                    <textarea
                      className="border border-blue-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-2"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:from-blue-700 hover:to-purple-700 transition" onClick={() => handleSaveEdit(idx)}>
                        Save
                      </button>
                      <button className="bg-gray-400 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-gray-500 transition" onClick={() => setEditIdx(null)}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <pre className="whitespace-pre-wrap mb-2 text-gray-800 bg-white p-3 rounded-lg border border-gray-100">{p.plan}</pre>
                    <div className="flex gap-2">
                      <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:from-yellow-500 hover:to-yellow-700 transition" onClick={() => handleEditPlan(idx)}>
                        Edit
                      </button>
                      <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:from-red-600 hover:to-pink-600 transition" onClick={() => handleDeletePlan(p._id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
