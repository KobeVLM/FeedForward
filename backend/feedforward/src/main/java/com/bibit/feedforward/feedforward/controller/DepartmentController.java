package com.bibit.feedforward.feedforward.controller;

import com.bibit.feedforward.feedforward.entity.DepartmentEntity;
import com.bibit.feedforward.feedforward.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    // CREATE: Add a new department
    // This method handles HTTP POST requests to create a new department.
    // It calls the service layer to save the department and returns the saved
    // entity.
    @PostMapping
    public DepartmentEntity createDepartment(@RequestBody DepartmentEntity department) {
        return departmentService.createDepartment(department);
    }

    // READ: Fetch all departments
    // This method handles HTTP GET requests to retrieve all departments.
    // It calls the service layer to fetch the list of departments and returns it.
    @GetMapping
    public List<DepartmentEntity> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    // READ: Fetch a department by its ID
    // This method handles HTTP GET requests to retrieve a department by its ID.
    // It calls the service layer to fetch the department and returns it.
    @GetMapping("/{id}")
    public DepartmentEntity getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }

    // UPDATE: Modify an existing department
    // This method handles HTTP PUT requests to update a department.
    // It calls the service layer to update the department and returns the updated
    // entity.
    @PutMapping("/{id}")
    public DepartmentEntity updateDepartment(@PathVariable Long id, @RequestBody DepartmentEntity department) {
        return departmentService.updateDepartment(id, department);
    }

    // DELETE: Remove a department
    // This method handles HTTP DELETE requests to delete a department by its ID.
    // It calls the service layer to delete the department and returns a
    // confirmation message.
    @DeleteMapping("/{id}")
    public String deleteDepartment(@PathVariable Long id) {
        return departmentService.deleteDepartment(id);
    }
}
