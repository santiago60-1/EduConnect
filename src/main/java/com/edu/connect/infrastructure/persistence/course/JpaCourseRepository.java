package com.edu.connect.infrastructure.persistence.course;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaCourseRepository extends JpaRepository<JpaCourseEntity, Long> {
    List<JpaCourseEntity> findByTeacherId(Long teacherId);
    Optional<JpaCourseEntity> findByCode(String code);
}
