package com.smartcampus.user.service;

import com.smartcampus.security.roles.Role;
import com.smartcampus.user.model.User;
import com.smartcampus.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Authenticates a user by email and password.
     */
    @Transactional(readOnly = true)
    public User authenticate(String email, String rawPassword) {
        System.out.println("DEBUG: Manual login attempt for email: " + email);
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    System.err.println("DEBUG: User not found for email: " + email);
                    return new RuntimeException("Invalid email or password");
                });

        // Check password
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            // Fallback for plain text passwords in transition
            if (!rawPassword.equals(user.getPassword())) {
                System.err.println("DEBUG: Password mismatch for email: " + email);
                throw new RuntimeException("Invalid email or password");
            }
            System.out.println("DEBUG: Manual login: Plain text password match for user: " + email);
        } else {
            System.out.println("DEBUG: Manual login: BCrypt password match for user: " + email);
        }

        return user;
    }

    /**
     * Registers a new user.
     */
    @Transactional
    public User registerUser(User user) {
        System.out.println("DEBUG: Manual registration attempt for email: " + user.getEmail());
        
        if (userRepository.existsByEmail(user.getEmail())) {
            System.err.println("DEBUG: Registration failed: Email " + user.getEmail() + " already exists");
            throw new RuntimeException("Email already in use");
        }

        // Mirror Google login logic: first user is ADMIN
        long userCount = userRepository.count();
        boolean adminExists = userRepository.findAll().stream()
                .anyMatch(u -> u.getRole() == Role.ADMIN);

        if (!adminExists && userCount == 0) {
            System.out.println("DEBUG: No users found. Assigning ADMIN role to first user: " + user.getEmail());
            user.setRole(Role.ADMIN);
        } else {
            user.setRole(Role.USER);
        }

        // Hash the password before saving
        String originalPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(originalPassword));
        
        User savedUser = userRepository.save(user);
        System.out.println("DEBUG: User saved successfully with ID: " + savedUser.getId() + " and Role: " + savedUser.getRole());
        
        return savedUser;
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
