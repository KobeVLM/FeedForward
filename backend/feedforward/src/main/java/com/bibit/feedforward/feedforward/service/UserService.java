package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.dto.AuthResponse;
import com.bibit.feedforward.feedforward.dto.RegisterRequest;
import com.bibit.feedforward.feedforward.entity.DepartmentEntity;
import com.bibit.feedforward.feedforward.entity.RoleEntity;
import com.bibit.feedforward.feedforward.entity.UserEntity;
import com.bibit.feedforward.feedforward.repository.DepartmentRepository;
import com.bibit.feedforward.feedforward.repository.RoleRepository;
import com.bibit.feedforward.feedforward.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

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
        user.setDisplayName(userDetails.getDisplayName());
        user.setUniversityEmail(userDetails.getUniversityEmail());
        user.setPasswordHash(userDetails.getPasswordHash());
        user.setRole(userDetails.getRole());
        user.setDepartment(userDetails.getDepartment());
        return userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        UserEntity user = getUserById(id);
        userRepository.delete(user);
    }

    // Authentication methods
    public UserEntity findByEmail(String email) {
        return userRepository.findByUniversityEmail(email);
    }

    public AuthResponse registerUser(RegisterRequest request) {
        // Check if user already exists
        UserEntity existingUser = userRepository.findByUniversityEmail(request.getEmail());
        if (existingUser != null) {
            throw new RuntimeException("User with this email already exists");
        }

        // Find role by name
        RoleEntity role = roleRepository.findByName(request.getRole());
        if (role == null) {
            throw new RuntimeException("Invalid role: " + request.getRole());
        }

        // Find department by name
        DepartmentEntity department = departmentRepository.findByName(request.getDepartment());
        if (department == null) {
            throw new RuntimeException("Invalid department: " + request.getDepartment());
        }

        // Create new user
        UserEntity newUser = new UserEntity();
        newUser.setDisplayName(request.getName());
        newUser.setUniversityEmail(request.getEmail());
        newUser.setPasswordHash(request.getPassword()); // Dev mode: plain text password
        newUser.setRole(role);
        newUser.setDepartment(department);

        UserEntity savedUser = userRepository.save(newUser);

        // Build response
        AuthResponse response = new AuthResponse();
        response.setUserId(savedUser.getUserId());
        response.setUniversityEmail(savedUser.getUniversityEmail());
        response.setDisplayName(savedUser.getDisplayName());
        response.setRole(savedUser.getRole().getName());
        response.setDepartment(savedUser.getDepartment().getName());
        response.setMessage("Registration successful");

        return response;
    }
}
