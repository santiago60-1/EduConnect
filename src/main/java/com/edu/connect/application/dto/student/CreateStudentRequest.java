package com.edu.connect.application.dto.student;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request to create a new student profile")
public record CreateStudentRequest(
        @Schema(description = "User ID of the student", example = "3", required = true)
        Long userId,
        
        @Schema(description = "Academic program/major", example = "Computer Science", required = true)
        String program,
        
        @Schema(description = "Current academic cycle/semester", example = "5", required = true, minimum = "1", maximum = "10")
        Integer cycle
) {
}
