package com.edu.connect.infrastructure.persistence.student;


import com.edu.connect.infrastructure.persistence.student.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaStudentRepository extends JpaRepository<JpaStudentEntity, Long> {

    JpaStudentEntity findByUserId(Long userId);
}
