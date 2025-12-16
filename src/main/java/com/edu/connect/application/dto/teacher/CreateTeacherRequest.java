package com.edu.connect.application.dto.teacher;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request to create a new teacher profile")
public record CreateTeacherRequest(
        @Schema(description = "User ID of the teacher", example = "2", required = true)
        Long userId,
        
        @Schema(description = "Academic department", example = "Computer Science", required = true)
        String department,
        
        @Schema(description = "Academic title/degree", example = "PhD in Software Engineering", required = true)
        String academicTitle
) {
}