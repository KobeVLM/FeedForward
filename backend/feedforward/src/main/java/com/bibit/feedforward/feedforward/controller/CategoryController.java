package com.bibit.feedforward.feedforward.controller;

import com.bibit.feedforward.feedforward.entity.CategoryEntity;
import com.bibit.feedforward.feedforward.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public CategoryEntity addCategory(@RequestBody CategoryEntity category) {
        return categoryService.addCategory(category);
    }

    @GetMapping
    public List<CategoryEntity> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryEntity getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public CategoryEntity editCategory(@PathVariable Long id,
                                       @RequestBody CategoryEntity category) {
        return categoryService.editCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
}
