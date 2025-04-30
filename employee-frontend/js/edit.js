document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const form = document.getElementById("employeeForm");

  if (!id) {
    alert("Invalid employee ID");
    return;
  }

  // Load employee data into the form
  const employee = await getEmployeeById(id); // from api.js
  if (!employee) {
    alert("Employee not found");
    return;
  }

  form.name.value = employee.name;
  form.email.value = employee.email;
  form.department.value = employee.department;
  form.role.value = employee.role;
  form.dateOfJoining.value = employee.dateOfJoining;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const department = form.department.value.trim();
    const role = form.role.value.trim();
    const dateOfJoining = form.dateOfJoining.value;

    // Validation
    if (name.length < 2) {
      alert("Name must be at least 2 characters.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!department || !role || !dateOfJoining) {
      alert("All fields are required.");
      return;
    }

    const updatedEmployee = {
      name,
      email,
      department,
      role,
      dateOfJoining,
    };

    try {
      await updateEmployee(id, updatedEmployee); // from api.js
      alert("Employee updated successfully!");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee.");
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
