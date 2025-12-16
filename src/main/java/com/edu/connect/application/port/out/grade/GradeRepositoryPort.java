package com.edu.connect.application.port.out.grade;

import com.edu.connect.domain.model.grade.Grade;

import java.util.List;
import java.util.Optional;

public interface GradeRepositoryPort {

    Grade save(Grade grade);

    Optional<Grade> findByTaskAndStudent(Long taskId, Long studentId);

    Optional<Grade> findById(Long id);

    List<Grade> findByStudentAndCourse(Long studentId, Long courseId);
}
