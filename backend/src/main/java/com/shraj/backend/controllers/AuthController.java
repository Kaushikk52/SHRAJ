package com.shraj.backend.controllers;

import com.shraj.backend.dto.JwtRequest;
import com.shraj.backend.dto.JwtResponse;
import com.shraj.backend.models.User;
import com.shraj.backend.security.JwtHelper;
import com.shraj.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/api/auth")
public class AuthController {

    private final UserService userServ;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager manager;
    private final JwtHelper helper;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user){
        User savedUser = userServ.addUser(user);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", savedUser);
        log.info("User registered successfully: {}", savedUser.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request){
        doAuthenticate(request.getEmail(), request.getPassword());
        User userDetails = (User) userDetailsService.loadUserByUsername(request.getEmail());
        String token = userServ.checkAndRenewToken(userDetails);
        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .name(userDetails.getUsername())
                .role(String.valueOf(userDetails.getRole()))
                .build();
        return ResponseEntity.ok(response);
    }

    private void doAuthenticate(String email, String password) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);
        manager.authenticate(authToken); // Will throw AuthenticationException if invalid
    }

}
