package com.bibit.feedforward.feedforward.controller;

import com.bibit.feedforward.feedforward.entity.TagEntity;
import com.bibit.feedforward.feedforward.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @PostMapping
    public TagEntity createTag(@RequestBody TagEntity tag) {
        return tagService.createTag(tag);
    }

    @GetMapping
    public List<TagEntity> getAllTags() {
        return tagService.getAllTags();
    }

    @GetMapping("/{id}")
    public TagEntity getTagById(@PathVariable Long id) {
        return tagService.getTagById(id);
    }

    @PutMapping("/{id}")
    public TagEntity updateTag(@PathVariable Long id, @RequestBody TagEntity tag) {
        return tagService.updateTag(id, tag);
    }

    @DeleteMapping("/{id}")
    public String deleteTag(@PathVariable Long id) {
        return tagService.deleteTag(id);
    }
}
