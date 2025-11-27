package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
}
