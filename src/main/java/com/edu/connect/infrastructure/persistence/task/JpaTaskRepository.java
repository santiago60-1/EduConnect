package com.edu.connect.infrastructure.persistence.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaTaskRepository extends JpaRepository<JpaTaskEntity, Long> {
    List<JpaTaskEntity> findByCourseId(Long courseId);
}
