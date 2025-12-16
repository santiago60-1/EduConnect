package com.edu.connect.infrastructure.persistence.student;

import com.edu.connect.application.port.out.student.StudentRepositoryPort;
import com.edu.connect.domain.model.student.StudentProfile;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class StudentRepositoryAdapter implements StudentRepositoryPort {

    private final JpaStudentRepository repo;

    public StudentRepositoryAdapter(JpaStudentRepository repo) {
        this.repo = repo;
    }

    @Override
    public StudentProfile save(StudentProfile student) {
        JpaStudentEntity e = new JpaStudentEntity();
        if (student.getId() != null) {
            e.setId(student.getId());
        }
        e.setUserId(student.getUserId());
        e.setProgram(student.getProgram());
        e.setCycle(student.getCycle());
        JpaStudentEntity saved = repo.save(e);
        student.setId(saved.getId());
        return student;
    }

    @Override
    public Optional<StudentProfile> findById(Long id) {
        return repo.findById(id).map(this::mapToDomain);
    }

    @Override
    public Optional<StudentProfile> findByUserId(Long userId) {
        JpaStudentEntity e = repo.findByUserId(userId);
        if (e == null) {
            return Optional.empty();
        }
        return Optional.of(mapToDomain(e));
    }

    @Override
    public boolean existsByUserId(Long userId) {
        return repo.findByUserId(userId) != null;
    }
    
    @Override
    public boolean existsById(Long id) {
        return repo.existsById(id);
    }

    @Override
    public List<StudentProfile> findAll() {
        return repo.findAll().stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    private StudentProfile mapToDomain(JpaStudentEntity e) {
        StudentProfile s = StudentProfile.createNew(
                e.getUserId(),
                e.getProgram(),
                e.getCycle());
        s.setId(e.getId());
        return s;
    }
}