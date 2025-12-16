package com.edu.connect.infrastructure.api.teacher;

import com.edu.connect.application.dto.teacher.CreateTeacherRequest;
import com.edu.connect.application.port.in.teacher.CreateTeacherUseCase;
import com.edu.connect.application.port.in.teacher.DeleteTeacherUseCase;
import com.edu.connect.application.port.in.teacher.GetTeacherUseCase;
import com.edu.connect.application.port.in.teacher.ListTeachersUseCase;
import com.edu.connect.domain.model.teacher.TeacherProfile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@PreAuthorize("hasRole('ADMIN')")
public class TeacherController {

    private final CreateTeacherUseCase createUC;
    private final GetTeacherUseCase getUC;
    private final ListTeachersUseCase listUC;
    private final DeleteTeacherUseCase deleteUC;

    public TeacherController(
            CreateTeacherUseCase createUC,
            GetTeacherUseCase getUC,
            ListTeachersUseCase listUC,
            DeleteTeacherUseCase deleteUC) {
        this.createUC = createUC;
        this.getUC = getUC;
        this.listUC = listUC;
        this.deleteUC = deleteUC;
    }

    @PostMapping
    public TeacherProfile create(@RequestBody CreateTeacherRequest req) {
        return createUC.create(
                req.userId(),
                req.department(),
                req.academicTitle()
        );
    }

    @GetMapping("/{id}")
    public TeacherProfile get(@PathVariable Long id) {
        return getUC.getById(id);
    }

    @GetMapping
    public List<TeacherProfile> list() {
        return listUC.list();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        deleteUC.delete(id);
    }
}