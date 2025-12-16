package com.edu.connect.application.port.out.skill;

import java.util.List;
import java.util.Set;

public interface VacancySkillRepositoryPort {

    void assignSkill(Long vacancyId, Long skillId);

    Set<Long> findSkillIdsByVacancy(Long vacancyId);

    List<Long> findAllVacancies();
}