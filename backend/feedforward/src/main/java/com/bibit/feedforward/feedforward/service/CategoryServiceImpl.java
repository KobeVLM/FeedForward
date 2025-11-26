package com.bibit.feedforward.feedforward.service.impl;

import com.bibit.feedforward.feedforward.entity.CategoryEntity;
import com.bibit.feedforward.feedforward.repository.CategoryRepository;
import com.bibit.feedforward.feedforward.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryEntity addCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    @Override
    public CategoryEntity editCategory(Long id, CategoryEntity category) {
        CategoryEntity existing = categoryRepository.findById(id).orElseThrow();
        existing.setName(category.getName());
        existing.setDescription(category.getDescription());
        return categoryRepository.save(existing);
    }

    @Override
    public String deleteCategory(Long id) {
        categoryRepository.deleteById(id);
        return "Category deleted";
    }

    @Override
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryEntity getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow();
    }
}
