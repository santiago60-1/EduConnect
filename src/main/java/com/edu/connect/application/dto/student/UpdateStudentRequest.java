package com.edu.connect.application.dto.student;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request to update student profile information")
public record UpdateStudentRequest(
        @Schema(description = "Updated academic program/major", example = "Software Engineering", required = false)
        String program,
        
        @Schema(description = "Updated academic cycle/semester", example = "6", required = false, minimum = "1", maximum = "10")
        Integer cycle
) {
}
