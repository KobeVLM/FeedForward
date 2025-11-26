package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.CategoryEntity;
import java.util.List;

public interface CategoryService {
    CategoryEntity addCategory(CategoryEntity category);
    CategoryEntity editCategory(Long id, CategoryEntity category);
    String deleteCategory(Long id);
    List<CategoryEntity> getAllCategories();
    CategoryEntity getCategoryById(Long id);
}
