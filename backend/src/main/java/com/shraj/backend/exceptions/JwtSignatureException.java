package com.shraj.backend.exceptions;

public class JwtSignatureException extends RuntimeException {
    public JwtSignatureException(String message) {
        super(message);
    }
}
