package com.edu.connect.application.service.student;

import com.edu.connect.application.dto.student.CreateStudentCommand;
import com.edu.connect.application.dto.student.UpdateStudentCommand;
import com.edu.connect.application.port.in.student.*;
import com.edu.connect.application.port.out.student.StudentRepositoryPort;
import com.edu.connect.application.port.out.user.UserRepositoryPort;
import com.edu.connect.domain.model.student.StudentProfile;
import jakarta.transaction.Transactional;

import java.util.List;

public class StudentService implements
        CreateStudentUseCase,
        UpdateStudentUseCase,
        GetStudentStatusUseCase,
        GetStudentUseCase,
        ListStudentsUseCase,
        DeleteStudentUseCase {

    private final StudentRepositoryPort studentRepository;
    private final UserRepositoryPort userRepository;

    public StudentService(StudentRepositoryPort studentRepository,
                          UserRepositoryPort userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public StudentProfile create(CreateStudentCommand command) {
        var user = userRepository.findById(command.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isStudent()) {
            throw new RuntimeException("User is not a student");
        }

        if (studentRepository.existsByUserId(command.userId())) {
            throw new RuntimeException("Student already exists");
        }

        StudentProfile student = StudentProfile.createNew(
                command.userId(),
                command.program(),
                command.cycle()
        );

        return studentRepository.save(student);
    }

    @Override
    @Transactional
    public StudentProfile update(UpdateStudentCommand command) {
        StudentProfile student = studentRepository.findByUserId(command.userId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setProgram(command.program());
        student.setCycle(command.cycle());

        return studentRepository.save(student);
    }

    @Override
    public StudentProfile getByUserId(Long userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @Override
    public StudentProfile getById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @Override
    public List<StudentProfile> list() {
        return studentRepository.findAll();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        studentRepository.delete(id);
    }
}