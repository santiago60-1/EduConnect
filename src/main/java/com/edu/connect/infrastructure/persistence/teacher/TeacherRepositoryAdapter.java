package com.edu.connect.infrastructure.persistence.teacher;

import com.edu.connect.application.port.out.teacher.TeacherRepositoryPort;
import com.edu.connect.domain.model.teacher.TeacherProfile;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class TeacherRepositoryAdapter implements TeacherRepositoryPort {

    private final JpaTeacherRepository repo;

    public TeacherRepositoryAdapter(JpaTeacherRepository repo) {
        this.repo = repo;
    }

    @Override
    public TeacherProfile save(TeacherProfile teacher) {
        JpaTeacherEntity e = new JpaTeacherEntity();
        if (teacher.getId() != null) {
            e.setId(teacher.getId());
        }
        e.setUserId(Long.valueOf(teacher.getUserId()));
        e.setDepartment(teacher.getDepartment());
        e.setAcademicTitle(teacher.getAcademicTitle());
        JpaTeacherEntity saved = repo.save(e);
        teacher.setId(saved.getId());
        return teacher;
    }

    @Override
    public Optional<TeacherProfile> findById(Long id) {
        return repo.findById(id).map(this::mapToDomain);
    }

    @Override
    public TeacherProfile findByUserId(Long userId) {
        JpaTeacherEntity e = repo.findByUserId(userId);
        if (e == null) {
            return null;
        }
        return mapToDomain(e);
    }

    @Override
    public List<TeacherProfile> findAll() {
        return repo.findAll().stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    private TeacherProfile mapToDomain(JpaTeacherEntity e) {
        TeacherProfile t = TeacherProfile.createNew(
                e.getUserId(),
                e.getDepartment(),
                e.getAcademicTitle());
        t.setId(e.getId());
        return t;
    }
}
