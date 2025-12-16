package com.edu.connect.infrastructure.persistence.skill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaVacancySkillRepository extends JpaRepository<VacancySkillEntity, VacancySkillId> {

    List<VacancySkillEntity> findByVacancyId(Long vacancyId);

    @Query("SELECT DISTINCT v.vacancyId FROM VacancySkillEntity v")
    List<Long> findAllDistinctVacancyIds();
}
