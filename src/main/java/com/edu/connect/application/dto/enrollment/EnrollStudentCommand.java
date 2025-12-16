package com.edu.connect.application.dto.enrollment;

public record EnrollStudentCommand(
        Long studentUserId,
        Long courseId
) {}