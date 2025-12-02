package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long> {
}
