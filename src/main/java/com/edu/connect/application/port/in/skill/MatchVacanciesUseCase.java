package com.edu.connect.application.port.in.skill;

import java.util.List;

public interface MatchVacanciesUseCase {
    List<Long> matchVacancies(Long userId);
}
