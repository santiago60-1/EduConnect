package com.edu.connect.infrastructure.persistence.grade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JpaGradeRepository extends JpaRepository<JpaGradeEntity, Long> {

    Optional<JpaGradeEntity> findByTaskIdAndStudentId(Long taskId, Long studentId);

    @Query("SELECT g FROM JpaGradeEntity g JOIN JpaTaskEntity t ON g.taskId = t.id WHERE g.studentId = :studentId AND t.courseId = :courseId")
    List<JpaGradeEntity> findByStudentIdAndCourseId(@Param("studentId") Long studentId,
            @Param("courseId") Long courseId);
}
