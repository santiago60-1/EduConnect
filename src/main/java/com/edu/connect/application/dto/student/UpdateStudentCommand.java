package com.edu.connect.application.dto.student;

public record UpdateStudentCommand(
        Long userId,
        String program,
        Integer cycle
) {}