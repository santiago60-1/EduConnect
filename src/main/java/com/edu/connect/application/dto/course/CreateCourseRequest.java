package com.edu.connect.application.dto.course;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request to create a new course (code auto-generated)")
public record CreateCourseRequest(
        @Schema(description = "Course name", example = "Advanced Programming", required = true)
        String name,
        
        @Schema(description = "Number of credits", example = "4", required = true, minimum = "1", maximum = "10")
        Integer credits,
        
        @Schema(description = "Teacher user ID", example = "2", required = true)
        Long teacherUserId
) {
}
