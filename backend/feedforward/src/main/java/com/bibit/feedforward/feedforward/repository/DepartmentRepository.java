package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.DepartmentEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for DepartmentEntity
 * This interface provides CRUD operations for the department table.
 * It extends JpaRepository, which includes built-in methods like save,
 * findById, findAll, and deleteById.
 */
@Repository
public interface DepartmentRepository extends JpaRepository<DepartmentEntity, Long> {

}
