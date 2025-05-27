package com.shraj.backend.controllers;

import com.shraj.backend.exceptions.NotFoundException;
import com.shraj.backend.models.User;
import com.shraj.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/api/users")
public class UserController {

    private final UserService userServ;

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        List<User> userList = userServ.getAllUsers();
        Map<String, Object> response = new HashMap<>();

        if (userList.isEmpty()) {
            log.warn("⚠ User repository is empty");
            response.put("message", "User repository is empty");
            response.put("users", userList);
            return ResponseEntity.ok(response);
        }

        List<User> users = userList.stream()
                .map(user -> User.builder()
                        .id(user.getId())
                        .token(user.getToken())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .build())
                .collect(Collectors.toList());

        log.info("✔ Retrieved all users: {}", users.size());
        response.put("message", "Retrieved all users");
        response.put("users", users);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/principal")
    public ResponseEntity<Map<String, Object>> getCurrentUser(Principal principal) {
        User currentUser = userServ.getCurrentUserRole(principal);

        if (currentUser == null) {
            throw new NotFoundException("User not found");
        }

        User userDTO = User.builder()
                .id(currentUser.getId())
                .token(currentUser.getToken())
                .firstName(currentUser.getFirstName())
                .lastName(currentUser.getLastName())
                .email(currentUser.getEmail())
                .role(currentUser.getRole())
                .build();

        log.info("✔ Retrieved current user: {}", userDTO.getId());
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Retrieved current user");
        response.put("user", userDTO);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable String id) {
        User user = userServ.getUserById(id);

        if (user == null) {
            throw new NotFoundException("User not found with ID: " + id);
        }

        log.info("✔ Retrieved user by ID: {}", id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User found");
        response.put("user", user);

        return ResponseEntity.ok(response);
    }
}
