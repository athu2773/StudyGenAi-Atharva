const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const fetchStudyPlans = async (token) => {
  const res = await fetch(`${API_BASE_URL}/studyplans`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const createStudyPlan = async (payload, token) => {
  const res = await fetch(`${API_BASE_URL}/studyplans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const updateStudyPlan = async (id, plan, token) => {
  const res = await fetch(`${API_BASE_URL}/studyplans/${id}` , {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ plan }),
  });
  return await res.json();
};

export const deleteStudyPlan = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/studyplans/${id}` , {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
