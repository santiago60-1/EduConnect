package com.edu.connect.infrastructure.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request to enroll a student in a course")
public record EnrollStudentRequest(
        @Schema(description = "Student profile ID", example = "1", required = true)
        Long studentId,
        
        @Schema(description = "Course ID", example = "1", required = true)
        Long courseId
) {
}
