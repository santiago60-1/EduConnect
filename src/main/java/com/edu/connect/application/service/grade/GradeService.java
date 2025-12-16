package com.edu.connect.application.service.grade;

import com.edu.connect.application.port.in.grade.*;
import com.edu.connect.application.port.out.grade.GradeRepositoryPort;
import com.edu.connect.application.port.out.student.StudentRepositoryPort;
import com.edu.connect.application.port.out.task.TaskRepositoryPort;
import com.edu.connect.domain.exception.GradeAlreadyExistsException;
import com.edu.connect.domain.model.grade.Grade;

import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

public class GradeService implements
        RegisterGradeUseCase,
        UpdateGradeUseCase,
        CalculateAverageUseCase {

    private final GradeRepositoryPort gradeRepo;
    private final StudentRepositoryPort studentRepo;
    private final TaskRepositoryPort taskRepo;

    public GradeService(
            GradeRepositoryPort gradeRepo,
            StudentRepositoryPort studentRepo,
            TaskRepositoryPort taskRepo) {
        this.gradeRepo = gradeRepo;
        this.studentRepo = studentRepo;
        this.taskRepo = taskRepo;
    }

    @Override
    @Transactional
    public Grade register(Long taskId, Long studentId, BigDecimal value) {

        if (!studentRepo.existsById(studentId))
            throw new IllegalArgumentException("Student not found");

        if (!taskRepo.existsById(taskId))
            throw new IllegalArgumentException("Task not found");

        if (gradeRepo.findByTaskAndStudent(taskId, studentId).isPresent())
            throw new GradeAlreadyExistsException("Grade already exists for this task and student");

        Grade grade = Grade.register(taskId, studentId, value);
        return gradeRepo.save(grade);
    }

    @Override
    public Grade update(Long gradeId, BigDecimal value) {
        Grade grade = gradeRepo.findById(gradeId)
                .orElseThrow(() -> new IllegalArgumentException("Grade not found"));

        grade.update(value);
        return gradeRepo.save(grade);
    }

    @Override
    public BigDecimal calculate(Long studentId, Long courseId) {

        List<Grade> grades = gradeRepo.findByStudentAndCourse(studentId, courseId);

        if (grades.isEmpty())
            return BigDecimal.ZERO;

        BigDecimal sum = grades.stream()
                .map(Grade::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return sum.divide(
                BigDecimal.valueOf(grades.size()),
                2,
                BigDecimal.ROUND_HALF_UP);
    }
}
