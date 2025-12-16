package com.edu.connect.domain.model.grade;

import java.math.BigDecimal;
import java.time.Instant;

public class Grade {

    private Long id;
    private final Long taskId;
    private final Long studentId;
    private BigDecimal value;
    private final Instant createdAt;
    private Instant updatedAt;

    private Grade(
            Long taskId,
            Long studentId,
            BigDecimal value,
            Instant createdAt
    ) {
        this.taskId = taskId;
        this.studentId = studentId;
        this.value = value;
        this.createdAt = createdAt;
    }

    // FACTORY METHOD
    public static Grade register(
            Long taskId,
            Long studentId,
            BigDecimal value
    ) {
        validate(value);

        return new Grade(
                taskId,
                studentId,
                value,
                Instant.now()
        );
    }

    // BEHAVIOR
    public void update(BigDecimal newValue) {
        validate(newValue);
        this.value = newValue;
        this.updatedAt = Instant.now();
    }

    private static void validate(BigDecimal value) {
        if (value == null)
            throw new IllegalArgumentException("Grade is required");

        if (value.compareTo(BigDecimal.ZERO) < 0 ||
                value.compareTo(BigDecimal.valueOf(5)) > 0) {
            throw new IllegalArgumentException("Grade must be between 0.0 and 5.0");
        }
    }

    // getters
    public Long getTaskId() { return taskId; }
    public Long getStudentId() { return studentId; }
    public BigDecimal getValue() { return value; }
}
