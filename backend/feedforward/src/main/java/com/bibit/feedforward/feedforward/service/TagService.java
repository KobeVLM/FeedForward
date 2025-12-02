package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.TagEntity;
import com.bibit.feedforward.feedforward.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    // CREATE a new tag
    public TagEntity createTag(TagEntity tag) {
        return tagRepository.save(tag);
    }

    // READ all tags
    public List<TagEntity> getAllTags() {
        return tagRepository.findAll();
    }

    // GET a tag by ID
    public TagEntity getTagById(Long id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tag " + id + " not found"));
    }

    // UPDATE a tag
    public TagEntity updateTag(Long id, TagEntity tagDetails) {
        TagEntity tag = getTagById(id);
        tag.setName(tagDetails.getName());
        tag.setDescription(tagDetails.getDescription());
        return tagRepository.save(tag);
    }

    // DELETE a tag
    public String deleteTag(Long id) {
        if (tagRepository.existsById(id)) {
            tagRepository.deleteById(id);
            return "Tag " + id + " is successfully deleted!";
        } else {
            return "Tag " + id + " does not exist.";
        }
    }
}
