export const fetchStudyPlans = async (token) => {
  const res = await fetch("http://localhost:8080/api/studyplans", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const createStudyPlan = async (payload, token) => {
  const res = await fetch("http://localhost:8080/api/studyplans", {
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
  const res = await fetch(`http://localhost:8080/api/studyplans/${id}` , {
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
  const res = await fetch(`http://localhost:8080/api/studyplans/${id}` , {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
