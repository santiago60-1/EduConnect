package com.edu.connect.application.port.in.vacancy;

import com.edu.connect.application.dto.vacancy.UpdateVacancyCommand;
import com.edu.connect.domain.model.vacancy.Vacancy;

public interface UpdateVacancyUseCase {
    Vacancy update(Long id, UpdateVacancyCommand command);
}
