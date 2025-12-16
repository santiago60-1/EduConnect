package com.edu.connect.infrastructure.api.grade;

import com.edu.connect.application.port.in.grade.*;
import com.edu.connect.domain.model.grade.Grade;
import com.edu.connect.infrastructure.api.dto.*;
import com.edu.connect.infrastructure.api.dto.grade.*;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/grades")
public class GradeController {

    private final RegisterGradeUseCase registerUC;
    private final UpdateGradeUseCase updateUC;
    private final CalculateAverageUseCase averageUC;

    public GradeController(
            RegisterGradeUseCase registerUC,
            UpdateGradeUseCase updateUC,
            CalculateAverageUseCase averageUC) {
        this.registerUC = registerUC;
        this.updateUC = updateUC;
        this.averageUC = averageUC;
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public Grade register(@RequestBody RegisterGradeRequest req) {
        return registerUC.register(
                req.taskId(),
                req.studentId(),
                req.value());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public Grade update(
            @PathVariable Long id,
            @RequestBody UpdateGradeRequest req) {
        return updateUC.update(id, req.value());
    }

    @GetMapping("/average")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'ADMIN')")
    public BigDecimal average(
            @RequestParam Long studentId,
            @RequestParam Long courseId) {
        return averageUC.calculate(studentId, courseId);
    }
}
