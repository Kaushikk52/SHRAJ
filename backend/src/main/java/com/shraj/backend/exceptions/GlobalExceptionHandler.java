package com.shraj.backend.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ✅ Utility method for consistent JSON response
    private ResponseEntity<Map<String, String>> buildResponse(HttpStatus status, String message) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        error.put("timestamp", LocalDateTime.now().toString());
        return new ResponseEntity<>(error, status);
    }

    // 🟡 JWT EXCEPTIONS
    @ExceptionHandler(JwtTokenExpiredException.class)
    public ResponseEntity<Map<String, String>> handleJwtTokenExpired(JwtTokenExpiredException ex) {
        log.warn("🔐 Token Expired: {}", ex.getMessage());
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(JwtMalformedTokenException.class)
    public ResponseEntity<Map<String, String>> handleJwtMalformed(JwtMalformedTokenException ex) {
        log.warn("🔐 Malformed Token: {}", ex.getMessage());
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(JwtSignatureException.class)
    public ResponseEntity<Map<String, String>> handleJwtSignature(JwtSignatureException ex) {
        log.warn("🔐 Invalid JWT Signature: {}", ex.getMessage());
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(JwtTokenMissingException.class)
    public ResponseEntity<Map<String, String>> handleJwtMissing(JwtTokenMissingException ex) {
        log.warn("🔐 JWT Missing or Invalid Claims: {}", ex.getMessage());
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // 🟡 BAD CREDENTIALS
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentialsException(BadCredentialsException ex) {
        log.warn("❗❗ BadCredentialsException: {}", ex.getMessage());
        return buildResponse(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    // 🟡 IO EXCEPTION
    @ExceptionHandler(IOException.class)
    public ResponseEntity<Map<String, String>> handleIOException(IOException ex) {
        log.warn("❗❗ IOException: {}", ex.getMessage());
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "I/O error occurred: " + ex.getMessage());
    }

    // 🟡 NOT FOUND
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFoundException(NotFoundException ex) {
        log.warn("❗❗ NotFoundException: {}", ex.getMessage());
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // 🔴 CATCH-ALL
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleAll(Exception ex) {
        log.error("❗❗ Unexpected error: ", ex);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred: " + ex.getMessage());
    }
}