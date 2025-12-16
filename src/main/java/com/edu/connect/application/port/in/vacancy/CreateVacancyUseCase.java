package com.edu.connect.application.port.in.vacancy;

import com.edu.connect.application.dto.vacancy.CreateVacancyCommand;
import com.edu.connect.domain.model.vacancy.Vacancy;

public interface CreateVacancyUseCase {
    Vacancy create(CreateVacancyCommand command);
}
