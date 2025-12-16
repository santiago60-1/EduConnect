package com.edu.connect.application.dto.course;

public record UpdateCourseCommand(
        Long courseId,
        String name,
        Integer credits
) {}
