package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.DepartmentEntity;
import com.bibit.feedforward.feedforward.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    // CREATE: Add a new department
    // This method saves a new department to the database.
    // It uses the departmentRepository to persist the department entity.
    public DepartmentEntity createDepartment(DepartmentEntity department) {
        return departmentRepository.save(department);
    }

    // READ: Fetch all departments
    // This method retrieves all departments from the database.
    // It uses the departmentRepository to fetch the list of departments.
    public List<DepartmentEntity> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // READ: Fetch a department by its ID
    // This method retrieves a department from the database using its ID.
    // It uses the departmentRepository to find the department and returns it.
    // If the department is not found, it throws a NoSuchElementException.
    public DepartmentEntity getDepartmentById(Long id) {
        Optional<DepartmentEntity> department = departmentRepository.findById(id);
        if (department.isPresent()) {
            return department.get();
        } else {
            throw new NoSuchElementException("Department " + id + " not found");
        }
    }

    // UPDATE: Modify an existing department
    // This method updates the details of an existing department.
    // It fetches the department by ID, modifies its fields, and saves it back to
    // the database.
    public DepartmentEntity updateDepartment(Long id, DepartmentEntity departmentDetails) {
        DepartmentEntity department = departmentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Department " + id + " not found"));
        department.setName(departmentDetails.getName());
        department.setDescription(departmentDetails.getDescription());
        return departmentRepository.save(department);
    }

    // DELETE: Remove a department
    // This method deletes a department from the database using its ID.
    // It checks if the department exists and deletes it, returning a confirmation
    // message.
    public String deleteDepartment(Long id) {
        if (departmentRepository.findById(id).isPresent()) {
            departmentRepository.deleteById(id);
            return "Department " + id + " is successfully deleted!";
        } else {
            return "Department " + id + " does not exist.";
        }
    }
}
