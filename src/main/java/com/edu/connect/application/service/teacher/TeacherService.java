package com.edu.connect.application.service.teacher;

import java.util.List;

import com.edu.connect.application.port.in.teacher.CreateTeacherUseCase;
import com.edu.connect.application.port.in.teacher.GetTeacherUseCase;
import com.edu.connect.application.port.in.teacher.ListTeachersUseCase;
import com.edu.connect.application.port.out.teacher.TeacherRepositoryPort;
import com.edu.connect.domain.model.teacher.TeacherProfile;
import com.edu.connect.application.port.in.teacher.DeleteTeacherUseCase;

public class TeacherService implements
        CreateTeacherUseCase,
        GetTeacherUseCase,
        ListTeachersUseCase,
        DeleteTeacherUseCase {

    private final TeacherRepositoryPort repository;

    public TeacherService(TeacherRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public TeacherProfile create(Long userId, String department, String academicTitle) {
        TeacherProfile teacher = TeacherProfile.createNew(userId, department, academicTitle);
        return repository.save(teacher);
    }

    @Override
    public TeacherProfile getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
    }

    @Override
    public List<TeacherProfile> list() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.delete(id);
    }
}
