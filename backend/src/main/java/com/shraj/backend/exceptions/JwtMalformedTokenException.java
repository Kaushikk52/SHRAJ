package com.shraj.backend.exceptions;

public class JwtMalformedTokenException extends RuntimeException {
    public JwtMalformedTokenException(String message) {
        super(message);
    }
}
