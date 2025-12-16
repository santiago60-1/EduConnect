package com.edu.connect.domain.exception;

public class EnrollmentAlreadyExistsException
        extends RuntimeException {

    public EnrollmentAlreadyExistsException() {
        super("Student is already enrolled in this course");
    }
}
