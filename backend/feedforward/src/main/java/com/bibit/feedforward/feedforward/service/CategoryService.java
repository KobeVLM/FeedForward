package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.CategoryEntity;
import com.bibit.feedforward.feedforward.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryEntity addCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    public CategoryEntity editCategory(Long id, CategoryEntity categoryDetails) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Category " + id + " not found"));

        category.setName(categoryDetails.getName());
        category.setDescription(categoryDetails.getDescription());

        return categoryRepository.save(category);
    }

    public String deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return "Category " + id + " is successfully deleted!";
        } else {
            return "Category " + id + " does not exist.";
        }
    }

    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    public CategoryEntity getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Category " + id + " not found"));
    }
}
