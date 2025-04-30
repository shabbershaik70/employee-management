const API_URL = "http://localhost:8080/api/employees";

async function getAllEmployees() {
  const res = await fetch(API_URL);
  return await res.json();
}

async function deleteEmployee(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
async function createEmployee(employee) {
  return await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
}
async function getEmployeeById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

async function updateEmployee(id, employee) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
}
