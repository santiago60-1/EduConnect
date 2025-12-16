package com.edu.connect.application.port.in.grade;

import com.edu.connect.domain.model.grade.Grade;

import java.math.BigDecimal;

public interface RegisterGradeUseCase {
    Grade register(Long taskId, Long studentId, BigDecimal value);
}
