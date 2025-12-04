package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.CategoryEntity;
import com.bibit.feedforward.feedforward.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryEntity addCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    @Override
    public CategoryEntity editCategory(Long id, CategoryEntity category) {
        try {
            CategoryEntity existing = categoryRepository.findById(id).get();
            existing.setName(category.getName());
            existing.setDescription(category.getDescription());
            return categoryRepository.save(existing);
        } catch (NoSuchElementException ex) {
            throw new NoSuchElementException("Category " + id + " not found");
        }
    }

    @Override
    public String deleteCategory(Long id) {
        String msg = "";
        if (categoryRepository.findById(id).isPresent()) {
            categoryRepository.deleteById(id);
            msg = "Category " + id + " is successfully deleted!";
        } else {
            msg = "Category " + id + " does not exist.";
        }
        return msg;
    }

    @Override
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryEntity getCategoryById(Long id) {
        Optional<CategoryEntity> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            return category.get();
        } else {
            throw new NoSuchElementException("Category " + id + " not found");
        }
    }
}
