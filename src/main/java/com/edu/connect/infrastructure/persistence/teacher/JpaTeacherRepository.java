package com.edu.connect.infrastructure.persistence.teacher;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaTeacherRepository extends JpaRepository<JpaTeacherEntity, Long> {

    JpaTeacherEntity findByUserId(Long userId);
}
