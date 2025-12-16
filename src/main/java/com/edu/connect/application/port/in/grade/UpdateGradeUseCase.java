package com.edu.connect.application.port.in.grade;

import com.edu.connect.domain.model.grade.Grade;

import java.math.BigDecimal;

public interface UpdateGradeUseCase {
    Grade update(Long gradeId, BigDecimal value);
}
