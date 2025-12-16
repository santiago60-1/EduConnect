package com.edu.connect.application.service.vacancy;

import com.edu.connect.application.dto.vacancy.*;
import com.edu.connect.application.port.in.vacancy.*;
import com.edu.connect.application.port.out.vacancy.VacancyRepositoryPort;
import com.edu.connect.domain.model.vacancy.Vacancy;

import java.util.List;

public class VacancyService implements
        CreateVacancyUseCase,
        UpdateVacancyUseCase,
        DeleteVacancyUseCase,
        ListVacanciesUseCase {

    private final VacancyRepositoryPort repo;

    public VacancyService(VacancyRepositoryPort repo) {
        this.repo = repo;
    }

    @Override
    public Vacancy create(CreateVacancyCommand cmd) {
        Vacancy vacancy = Vacancy.create(
                cmd.title(),
                cmd.description(),
                cmd.requirements(),
                cmd.modality(),
                cmd.location(),
                cmd.pdfUrl(),
                cmd.userId());
        return repo.save(vacancy);
    }

    @Override
    public Vacancy update(Long id, UpdateVacancyCommand cmd) {
        Vacancy vacancy = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vacancy not found"));

        vacancy.update(
                cmd.title(),
                cmd.description(),
                cmd.requirements(),
                cmd.modality(),
                cmd.location(),
                cmd.pdfUrl());

        return repo.save(vacancy);
    }

    @Override
    public void delete(Long id, Long userId, boolean isAdmin) {
        Vacancy vacancy = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vacancy not found"));

        if (!isAdmin && !vacancy.getUserId().equals(userId))
            throw new SecurityException("Not allowed");

        repo.deleteById(id);
    }

    @Override
    public List<Vacancy> list(String title, String location, String modality) {
        return repo.filter(title, location, modality);
    }
}