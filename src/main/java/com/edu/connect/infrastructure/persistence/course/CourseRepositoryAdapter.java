package com.edu.connect.infrastructure.persistence.course;

import com.edu.connect.application.port.out.course.CourseRepositoryPort;
import com.edu.connect.domain.model.Course.Course;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class CourseRepositoryAdapter implements CourseRepositoryPort {

    private final JpaCourseRepository repo;

    public CourseRepositoryAdapter(JpaCourseRepository repo) {
        this.repo = repo;
    }

    @Override
    public Course save(Course course) {
        JpaCourseEntity e = new JpaCourseEntity();
        if (course.getId() != null) {
            e.setId(course.getId());
        }
        e.setCode(course.getCode());
        e.setName(course.getName());
        e.setCredits(course.getCredits());
        e.setTeacherId(course.getTeacherId());
        
        JpaCourseEntity saved = repo.save(e);
        course.setId(saved.getId());
        return course;
    }

    @Override
    public Optional<Course> findById(Long id) {
        return repo.findById(id).map(this::mapToDomain);
    }

    @Override
    public Optional<Course> findByCode(String code) {
        return repo.findByCode(code).map(this::mapToDomain);
    }

    @Override
    public List<Course> findByTeacherId(Long teacherId) {
        return repo.findByTeacherId(teacherId).stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public boolean existsById(Long id) {
        return repo.existsById(id);
    }

    @Override
    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    private Course mapToDomain(JpaCourseEntity e) {
        Course c = Course.createNew(
                e.getCode(),
                e.getName(),
                e.getCredits(),
                e.getTeacherId()
        );
        c.setId(e.getId());
        return c;
    }
}
