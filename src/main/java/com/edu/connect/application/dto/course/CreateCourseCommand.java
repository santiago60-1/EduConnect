package com.edu.connect.application.dto.course;

public record CreateCourseCommand(
        String name,
        Integer credits,
        Long teacherUserId
) {}