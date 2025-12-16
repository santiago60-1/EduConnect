package com.edu.connect.application.port.in.vacancy;

import com.edu.connect.domain.model.vacancy.Vacancy;

import java.util.List;

public interface ListVacanciesUseCase {
    List<Vacancy> list(String title, String location, String modality);
}
