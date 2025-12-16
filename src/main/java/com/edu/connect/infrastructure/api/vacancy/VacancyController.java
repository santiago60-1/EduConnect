package com.edu.connect.infrastructure.api.vacancy;

import com.edu.connect.application.dto.vacancy.CreateVacancyCommand;
import com.edu.connect.application.dto.vacancy.UpdateVacancyCommand;
import com.edu.connect.application.port.in.vacancy.CreateVacancyUseCase;
import com.edu.connect.application.port.in.vacancy.DeleteVacancyUseCase;
import com.edu.connect.application.port.in.vacancy.ListVacanciesUseCase;
import com.edu.connect.application.port.in.vacancy.UpdateVacancyUseCase;
import com.edu.connect.application.port.out.vacancy.FileStoragePort;
import com.edu.connect.domain.model.vacancy.Vacancy;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/vacancies")
@RequiredArgsConstructor
public class VacancyController {

    private final CreateVacancyUseCase createUC;
    private final UpdateVacancyUseCase updateUC;
    private final DeleteVacancyUseCase deleteUC;
    private final ListVacanciesUseCase listUC;
    private final FileStoragePort storage;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Vacancy create(
            @RequestPart CreateVacancyCommand data,
            @RequestPart(required = false) MultipartFile pdf) {
        String pdfUrl = pdf != null ? storage.uploadPdf(pdf) : null;

        return createUC.create(new CreateVacancyCommand(
                data.title(),
                data.description(),
                data.requirements(),
                data.modality(),
                data.location(),
                pdfUrl,
                data.userId()));
    }

    @GetMapping
    public List<Vacancy> list(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String modality) {
        return listUC.list(title, location, modality);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Vacancy update(
            @PathVariable Long id,
            @RequestPart UpdateVacancyCommand data,
            @RequestPart(required = false) MultipartFile pdf) {
        String pdfUrl = pdf != null ? storage.uploadPdf(pdf) : data.pdfUrl();

        return updateUC.update(id, new UpdateVacancyCommand(
                data.title(),
                data.description(),
                data.requirements(),
                data.modality(),
                data.location(),
                pdfUrl));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        deleteUC.delete(id, null, false); // Simplified - will enhance with proper auth later
    }
}
