package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.DepartmentEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<DepartmentEntity, Long> {
    DepartmentEntity findByName(String name);
}
