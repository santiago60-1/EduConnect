package com.edu.connect.infrastructure.api.student;

import com.edu.connect.application.dto.student.CreateStudentRequest;
import com.edu.connect.application.dto.student.UpdateStudentRequest;
import com.edu.connect.application.port.in.student.*;
import com.edu.connect.domain.model.student.StudentProfile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@PreAuthorize("hasRole('ADMIN')")
public class StudentController {

    private final CreateStudentUseCase createUC;
    private final GetStudentUseCase getUC;
    private final GetStudentStatusUseCase getStatusUC;
    private final ListStudentsUseCase listUC;
    private final UpdateStudentUseCase updateUC;
    private final DeleteStudentUseCase deleteUC;

    public StudentController(
            CreateStudentUseCase createUC,
            GetStudentUseCase getUC,
            GetStudentStatusUseCase getStatusUC,
            ListStudentsUseCase listUC,
            UpdateStudentUseCase updateUC,
            DeleteStudentUseCase deleteUC) {
        this.createUC = createUC;
        this.getUC = getUC;
        this.getStatusUC = getStatusUC;
        this.listUC = listUC;
        this.updateUC = updateUC;
        this.deleteUC = deleteUC;
    }

    @PostMapping
    public StudentProfile create(@RequestBody CreateStudentRequest req) {
        var command = new com.edu.connect.application.dto.student.CreateStudentCommand(
                req.userId(),
                req.program(),
                req.cycle()
        );
        return createUC.create(command);
    }

    @GetMapping("/{id}")
    public StudentProfile get(@PathVariable Long id) {
        return getUC.getById(id);
    }

    @GetMapping("/user/{userId}")
    public StudentProfile getByUserId(@PathVariable Long userId) {
        return getStatusUC.getByUserId(userId);
    }

    @GetMapping
    public List<StudentProfile> list() {
        return listUC.list();
    }

    @PutMapping("/user/{userId}")
    public StudentProfile update(@PathVariable Long userId, @RequestBody UpdateStudentRequest req) {
        var command = new com.edu.connect.application.dto.student.UpdateStudentCommand(
                userId,
                req.program(),
                req.cycle()
        );
        return updateUC.update(command);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        deleteUC.delete(id);
    }
}