package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    UserEntity findByUniversityEmail(String universityEmail);
}
