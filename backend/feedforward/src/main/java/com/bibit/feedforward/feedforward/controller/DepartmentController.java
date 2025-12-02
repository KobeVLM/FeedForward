package com.bibit.feedforward.feedforward.controller;

import com.bibit.feedforward.feedforward.entity.DepartmentEntity;
import com.bibit.feedforward.feedforward.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    // Create a new department
    @PostMapping
    public DepartmentEntity createDepartment(@RequestBody DepartmentEntity department) {
        return departmentService.createDepartment(department);
    }

    // Get all departments
    @GetMapping
    public List<DepartmentEntity> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    // Get a department by ID
    @GetMapping("/{id}")
    public DepartmentEntity getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }

    // Update a department
    @PutMapping("/{id}")
    public DepartmentEntity updateDepartment(@PathVariable Long id, @RequestBody DepartmentEntity department) {
        return departmentService.updateDepartment(id, department);
    }

    // Delete a department
    @DeleteMapping("/{id}")
    public String deleteDepartment(@PathVariable Long id) {
        return departmentService.deleteDepartment(id);
    }
}
