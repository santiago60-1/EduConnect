package com.edu.connect.application.port.out.teacher;

import java.util.List;
import java.util.Optional;

import com.edu.connect.domain.model.teacher.TeacherProfile;

public interface TeacherRepositoryPort {

    TeacherProfile save(TeacherProfile teacher);

    Optional<TeacherProfile> findById(Long id);

    TeacherProfile findByUserId(Long userId);

    List<TeacherProfile> findAll();

    void delete(Long id);
}
