package com.edu.connect.infrastructure.persistence.vacancy;

import com.edu.connect.application.port.out.vacancy.VacancyRepositoryPort;
import com.edu.connect.domain.model.vacancy.Vacancy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class VacancyRepositoryAdapter implements VacancyRepositoryPort {

    private final JpaVacancyRepository repo;

    public VacancyRepositoryAdapter(JpaVacancyRepository repo) {
        this.repo = repo;
    }

    @Override
    public Vacancy save(Vacancy vacancy) {
        JpaVacancyEntity entity = mapToEntity(vacancy);
        JpaVacancyEntity saved = repo.save(entity);
        vacancy.setId(saved.getId());
        return vacancy;
    }

    @Override
    public Optional<Vacancy> findById(Long id) {
        return repo.findById(id).map(this::mapToDomain);
    }

    @Override
    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    @Override
    public List<Vacancy> filter(String title, String location, String modality) {
        return repo.findByFilters(title, location, modality).stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }

    private Vacancy mapToDomain(JpaVacancyEntity entity) {
        Vacancy vacancy = Vacancy.create(
                entity.getTitle(),
                entity.getDescription(),
                entity.getRequirements(),
                entity.getModality(),
                entity.getLocation(),
                entity.getPdfUrl(),
                entity.getUserId());
        vacancy.setId(entity.getId());
        return vacancy;
    }

    private JpaVacancyEntity mapToEntity(Vacancy vacancy) {
        JpaVacancyEntity entity = new JpaVacancyEntity();

        if (vacancy.getId() != null) {
            entity.setId(vacancy.getId());
        }

        entity.setTitle(vacancy.getTitle());
        entity.setDescription(vacancy.getDescription());
        entity.setRequirements(vacancy.getRequirements());
        entity.setModality(vacancy.getModality());
        entity.setLocation(vacancy.getLocation());
        entity.setPdfUrl(vacancy.getPdfUrl());
        entity.setUserId(vacancy.getUserId());
        entity.setPublishDate(vacancy.getPublishDate());
        entity.setCreatedAt(vacancy.getCreatedAt());
        entity.setUpdatedAt(vacancy.getUpdatedAt());

        return entity;
    }
}
