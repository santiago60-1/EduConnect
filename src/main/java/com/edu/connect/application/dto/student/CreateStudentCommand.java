package com.edu.connect.application.dto.student;

public record CreateStudentCommand(
        Long userId,
        String program,
        Integer cycle
) {}