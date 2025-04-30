package com.company.employeemanagement.repository;

import com.company.employeemanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Basic CRUD is already included through JpaRepository
}
