package com.edu.connect.domain.exception;

public class GradeAlreadyExistsException extends RuntimeException {
    public GradeAlreadyExistsException(String message) {
        super(message);
    }
}
