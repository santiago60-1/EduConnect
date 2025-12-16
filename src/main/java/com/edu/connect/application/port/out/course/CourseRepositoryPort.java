package com.edu.connect.application.port.out.course;

import com.edu.connect.domain.model.Course.Course;

import java.util.List;
import java.util.Optional;

public interface CourseRepositoryPort {

    Course save(Course course);

    Optional<Course> findById(Long id);
    
    Optional<Course> findByCode(String code);

    List<Course> findByTeacherId(Long teacherId);
    
    boolean existsById(Long id);

    void deleteById(Long id);
}