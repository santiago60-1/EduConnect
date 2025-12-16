package com.edu.connect.application.dto.task;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record CreateTaskRequest(
                @NotNull(message = "Course ID is required") Long courseId,

                @NotBlank(message = "Title is required") String title,

                @NotBlank(message = "Description is required") String description,

                @NotNull(message = "Due date is required") @Future(message = "Due date must be in the future") LocalDate dueDate) {
}