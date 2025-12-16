package com.edu.connect.infrastructure.api.dto.grade;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record UpdateGradeRequest(
        @NotNull BigDecimal value
) {}
