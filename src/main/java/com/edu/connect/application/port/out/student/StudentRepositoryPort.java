package com.edu.connect.application.port.out.student;

import com.edu.connect.domain.model.student.StudentProfile;

import java.util.List;
import java.util.Optional;

public interface StudentRepositoryPort {
    StudentProfile save(StudentProfile student);

    Optional<StudentProfile> findById(Long id);

    Optional<StudentProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
    
    boolean existsById(Long id);

    List<StudentProfile> findAll();

    void delete(Long id);
}
