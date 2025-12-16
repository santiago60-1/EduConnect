package com.edu.connect.application.dto.teacher;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request to update teacher profile information")
public record UpdateTeacherRequest(
        @Schema(description = "Updated academic department", example = "Data Science", required = false)
        String department,
        
        @Schema(description = "Updated academic title/degree", example = "PhD in Artificial Intelligence", required = false)
        String academicTitle
) {
}
