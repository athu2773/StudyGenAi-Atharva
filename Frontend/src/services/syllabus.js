const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const fetchSyllabus = async (token) => {
  const res = await fetch(`${API_BASE_URL}/syllabus`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const deleteSyllabus = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/syllabus/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};