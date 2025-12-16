package com.edu.connect.infrastructure.persistence.skill;

import com.edu.connect.application.port.out.skill.VacancySkillRepositoryPort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class VacancySkillRepositoryAdapter implements VacancySkillRepositoryPort {

    private final JpaVacancySkillRepository repo;

    public VacancySkillRepositoryAdapter(JpaVacancySkillRepository repo) {
        this.repo = repo;
    }

    @Override
    public void assignSkill(Long vacancyId, Long skillId) {
        VacancySkillEntity entity = new VacancySkillEntity();
        entity.setVacancyId(vacancyId);
        entity.setSkillId(skillId);
        repo.save(entity);
    }

    @Override
    public Set<Long> findSkillIdsByVacancy(Long vacancyId) {
        return repo.findByVacancyId(vacancyId).stream()
                .map(VacancySkillEntity::getSkillId)
                .collect(Collectors.toSet());
    }

    @Override
    public List<Long> findAllVacancies() {
        return repo.findAllDistinctVacancyIds();
    }
}
