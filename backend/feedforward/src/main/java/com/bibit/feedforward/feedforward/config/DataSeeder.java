package com.bibit.feedforward.feedforward.config;

import com.bibit.feedforward.feedforward.entity.*;
import com.bibit.feedforward.feedforward.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(RoleRepository roleRepository,
            DepartmentRepository departmentRepository,
            CategoryRepository categoryRepository,
            TagRepository tagRepository) {
        return args -> {
            // Seed Roles
            if (roleRepository.count() == 0) {
                RoleEntity role1 = new RoleEntity();
                role1.setName("Student");
                role1.setDescription("Student Role");

                RoleEntity role2 = new RoleEntity();
                role2.setName("Staff");
                role2.setDescription("Staff Role");

                RoleEntity role3 = new RoleEntity();
                role3.setName("Admin");
                role3.setDescription("Administrator Role");

                roleRepository.saveAll(Arrays.asList(role1, role2, role3));
            }

            // Seed Departments
            if (departmentRepository.count() == 0) {
                departmentRepository.saveAll(Arrays.asList(
                        new DepartmentEntity("Computer Science", "CS Department"),
                        new DepartmentEntity("Engineering", "Engineering Department"),
                        new DepartmentEntity("Business", "Business School"),
                        new DepartmentEntity("Arts & Sciences", "College of Arts")));
            }

            // Seed Categories
            if (categoryRepository.count() == 0) {
                categoryRepository.saveAll(Arrays.asList(
                        new CategoryEntity("Academic", "Academic related issues"),
                        new CategoryEntity("Facilities", "Campus facilities"),
                        new CategoryEntity("Administrative", "Admin processes"),
                        new CategoryEntity("Student Life", "Events and clubs")));
            }

            // Seed Tags
            if (tagRepository.count() == 0) {
                TagEntity tag1 = new TagEntity();
                tag1.setName("Urgent");
                tag1.setDescription("Requires immediate attention");

                TagEntity tag2 = new TagEntity();
                tag2.setName("Bug");
                tag2.setDescription("System error");

                TagEntity tag3 = new TagEntity();
                tag3.setName("Suggestion");
                tag3.setDescription("Improvement idea");

                TagEntity tag4 = new TagEntity();
                tag4.setName("Complaint");
                tag4.setDescription("Grievance");

                tagRepository.saveAll(Arrays.asList(tag1, tag2, tag3, tag4));
            }
        };
    }
}
