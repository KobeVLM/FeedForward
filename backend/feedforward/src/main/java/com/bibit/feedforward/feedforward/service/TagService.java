package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.TagEntity;
import com.bibit.feedforward.feedforward.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
        Optional<TagEntity> tag = tagRepository.findById(id);
        if (tag.isPresent()) {
            return tag.get();
        } else {
            throw new NoSuchElementException("Tag " + id + " not found");
        }
    }

    // UPDATE a tag
    public TagEntity updateTag(Long id, TagEntity tagDetails) {
        TagEntity tag = new TagEntity();
        try {
            // Search for the tag by ID
            tag = tagRepository.findById(id).get();
            tag.setName(tagDetails.getName());
            tag.setDescription(tagDetails.getDescription());
            return tagRepository.save(tag);
        } catch (NoSuchElementException ex) {
            throw new NoSuchElementException("Tag " + id + " not found");
        }
    }

    // DELETE a tag
    public String deleteTag(Long id) {
        String msg = "";
        if (tagRepository.findById(id).isPresent()) {
            tagRepository.deleteById(id);
            msg = "Tag " + id + " is successfully deleted!";
        } else {
            msg = "Tag " + id + " does not exist.";
        }
        return msg;
    }
}
