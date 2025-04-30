let sortConfig = { key: null, direction: 'asc' };
let allEmployees = [];
let currentPage = 1;
const rowsPerPage = 5;
function renderEmployees(employees) {
  const tbody = document.getElementById("employeeTableBody");
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedEmployees = employees.slice(start, end);

  tbody.innerHTML = paginatedEmployees
    .map(
      (emp) => `
        <tr>
          <td>${emp.name}</td>
          <td>${emp.email}</td>
          <td>${emp.department}</td>
          <td>${emp.role}</td>
          <td>${emp.dateOfJoining}</td>
          <td>
            <a href="edit.html?id=${emp.id}" class="btn btn-primary btn-sm">Edit</a>
            <button class="btn btn-danger btn-sm" onclick="handleDelete(${emp.id})">Delete</button>
          </td>
        </tr>
      `
    )
    .join("");

  renderPagination(employees);
}
function renderPagination(employees) {
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const pagination = document.getElementById("paginationControls");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderEmployees(employees);
    });
    pagination.appendChild(li);
  }
}
function sortTable(key) {
  if (sortConfig.key === key) {
    // Toggle direction
    sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
  } else {
    // New column sort
    sortConfig.key = key;
    sortConfig.direction = 'asc';
  }

  const sorted = [...allEmployees].sort((a, b) => {
    const aVal = a[key]?.toLowerCase?.() || a[key];
    const bVal = b[key]?.toLowerCase?.() || b[key];

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  renderEmployees(sorted);
}


document.addEventListener("DOMContentLoaded", async () => {
  allEmployees = await getAllEmployees();
  renderEmployees(allEmployees);

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = allEmployees.filter((emp) =>
      emp.name.toLowerCase().includes(keyword) ||
      emp.email.toLowerCase().includes(keyword) ||
      emp.department.toLowerCase().includes(keyword) ||
      emp.role.toLowerCase().includes(keyword)
    );

    renderEmployees(filtered);
  });
});

async function handleDelete(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    await deleteEmployee(id);
    location.reload();
  }
}
loadEmployees();