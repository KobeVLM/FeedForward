package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.RoleEntity;
import com.bibit.feedforward.feedforward.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    // CREATE a new role
    public RoleEntity createRole(RoleEntity role) {
        return roleRepository.save(role);
    }

    // READ all roles
    public List<RoleEntity> getAllRoles() {
        return roleRepository.findAll();
    }

    // GET a role by ID
    public RoleEntity getRoleById(Long id) {
        Optional<RoleEntity> role = roleRepository.findById(id);
        if (role.isPresent()) {
            return role.get();
        } else {
            throw new NoSuchElementException("Role " + id + " not found");
        }
    }

    // UPDATE a role
    public RoleEntity updateRole(Long id, RoleEntity roleDetails) {
        RoleEntity role = new RoleEntity();
        try {
            // Search for the role by ID
            role = roleRepository.findById(id).get();
            role.setName(roleDetails.getName());
            role.setDescription(roleDetails.getDescription());
            return roleRepository.save(role);
        } catch (NoSuchElementException ex) {
            throw new NoSuchElementException("Role " + id + " not found");
        }
    }

    // DELETE a role
    public String deleteRole(Long id) {
        String msg = "";
        if (roleRepository.findById(id).isPresent()) {
            roleRepository.deleteById(id);
            msg = "Role " + id + " is successfully deleted!";
        } else {
            msg = "Role " + id + " does not exist.";
        }
        return msg;
    }
}
