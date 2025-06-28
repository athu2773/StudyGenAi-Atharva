export const fetchSyllabus = async (token) => {
  const res = await fetch("http://localhost:8080/api/syllabus", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const deleteSyllabus = async (id, token) => {
  const res = await fetch(`http://localhost:8080/api/syllabus/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};