document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const department = form.department.value.trim();
    const role = form.role.value.trim();
    const dateOfJoining = form.dateOfJoining.value;

    // Basic validation
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

    // Submit data
    const employee = {
      name,
      email,
      department,
      role,
      dateOfJoining,
    };

    try {
      await createEmployee(employee); // this function should be defined in api.js
      alert("Employee added successfully!");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    }
  });

  function validateEmail(email) {
    // Simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
