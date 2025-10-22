package com.bibit.feedforward.feedforward.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "department")
public class DepartmentEntity {
    // Primary key for the department table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    private Long departmentId;

    // Name of the department
    @Column(name = "name")
    private String name;

    // Description of the department
    @Column(name = "description")
    private String description;

    // Constructors
    public DepartmentEntity() {
    }

    public DepartmentEntity(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Setter
    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getter
    public Long getDepartmentId() {
        return departmentId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

}