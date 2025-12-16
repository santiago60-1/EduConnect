package com.edu.connect.application.port.in.grade;

import java.math.BigDecimal;

public interface CalculateAverageUseCase {
    BigDecimal calculate(Long studentId, Long courseId);
}
