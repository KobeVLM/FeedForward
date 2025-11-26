package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.UserEntity;
import com.bibit.feedforward.feedforward.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    public UserEntity updateUser(UUID id, UserEntity userDetails) {
        UserEntity user = getUserById(id);
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setRoleId(userDetails.getRoleId());
        user.setDepartmentId(userDetails.getDepartmentId());
        return userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        UserEntity user = getUserById(id);
        userRepository.delete(user);
    }
}
