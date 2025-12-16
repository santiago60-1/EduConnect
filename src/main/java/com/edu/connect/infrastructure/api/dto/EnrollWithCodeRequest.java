package com.edu.connect.infrastructure.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request to enroll a student using course code")
public record EnrollWithCodeRequest(
        @Schema(description = "Student profile ID", example = "1", required = true)
        Long studentId,
        
        @Schema(description = "Course code (6 characters)", example = "A3K9D2", required = true, minLength = 6, maxLength = 6)
        String courseCode
) {
}
