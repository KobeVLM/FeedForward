package com.appdevg6.teambibit.service;

import com.appdevg6.teambibit.entity.DepartmentEntity;
import com.appdevg6.teambibit.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    // CREATE a new department
    public DepartmentEntity createDepartment(DepartmentEntity department) {
        return departmentRepository.save(department);
    }

    // READ all departments
    public List<DepartmentEntity> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // GET a department by ID
    public DepartmentEntity getDepartmentById(Long id) {
        Optional<DepartmentEntity> department = departmentRepository.findById(id);
        if (department.isPresent()) {
            return department.get();
        } else {
            throw new NoSuchElementException("Department " + id + " not found");
        }
    }

    // UPDATE a department
    public DepartmentEntity updateDepartment(Long id, DepartmentEntity departmentDetails) {
        DepartmentEntity department = new DepartmentEntity();
        try {
            // Search for the department by ID
            department = departmentRepository.findById(id).get();
            department.setName(departmentDetails.getName());
            department.setDescription(departmentDetails.getDescription());
            return departmentRepository.save(department);
        } catch (NoSuchElementException ex) {
            throw new NoSuchElementException("Department " + id + " not found");
        }
    }

    // DELETE a department
    public String deleteDepartment(Long id) {
        String msg = "";
        if (departmentRepository.findById(id).isPresent()) {
            departmentRepository.deleteById(id);
            msg = "Department " + id + " is successfully deleted!";
        } else {
            msg = "Department " + id + " does not exist.";
        }
        return msg;
    }
}
