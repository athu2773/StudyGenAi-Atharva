export const generatePlan = async (payload, token) => {
  const res = await fetch("http://localhost:8080/api/ai/plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const generateFlashcards = async (payload, token) => {
  const res = await fetch("http://localhost:8080/api/ai/flashcards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const generateQuiz = async (payload, token) => {
  const res = await fetch("http://localhost:8080/api/ai/quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};
