package com.edu.connect.infrastructure.api.dto.grade;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record RegisterGradeRequest(
        @NotNull Long taskId,
        @NotNull Long studentId,
        @NotNull BigDecimal value
) {}
