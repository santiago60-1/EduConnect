package com.edu.connect.application.port.out.vacancy;

import com.edu.connect.domain.model.vacancy.Vacancy;

import java.util.List;
import java.util.Optional;

public interface VacancyRepositoryPort {

    Vacancy save(Vacancy vacancy);

    Optional<Vacancy> findById(Long id);

    void deleteById(Long id);

    List<Vacancy> filter(String title, String location, String modality);

}
