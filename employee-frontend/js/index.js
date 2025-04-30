let allEmployees = [];

async function loadEmployees() {
  const employees = await getEmployees();
  allEmployees = employees;
  renderEmployeeList(employees);
}

function renderEmployeeList(employees) {
  const listContainer = document.getElementById("employeeList");
  listContainer.innerHTML = "";

  if (employees.length === 0) {
    listContainer.innerHTML = "<p>No employees found.</p>";
    return;
  }

  employees.forEach((employee) => {
    const item = document.createElement("div");
    item.classList.add("card", "mb-2", "p-3");
    item.innerHTML = `
      <h5>${employee.name}</h5>
      <p>
        <strong>Email:</strong> ${employee.email}<br />
        <strong>Department:</strong> ${employee.department}<br />
        <strong>Role:</strong> ${employee.role}<br />
        <strong>Joined:</strong> ${employee.dateOfJoining}
      </p>
      <a href="edit.html?id=${employee.id}" class="btn btn-sm btn-primary">Edit</a>
      <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${employee.id})">Delete</button>
    `;
    listContainer.appendChild(item);
  });
}

// 🔍 Handle live search
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();

  const filtered = allEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(keyword) ||
    emp.email.toLowerCase().includes(keyword) ||
    emp.department.toLowerCase().includes(keyword) ||
    emp.role.toLowerCase().includes(keyword)
  );

  renderEmployeeList(filtered);
});

loadEmployees();
