package com.edu.connect.application.service.skill;

import com.edu.connect.application.port.in.skill.*;
import com.edu.connect.application.port.out.skill.*;
import com.edu.connect.domain.model.skill.Skill;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class SkillService implements
        CreateSkillUseCase,
        AssignSkillToUserUseCase,
        AssignSkillToVacancyUseCase,
        MatchVacanciesUseCase {

    private final SkillRepositoryPort skillRepo;
    private final UserSkillRepositoryPort userSkillRepo;
    private final VacancySkillRepositoryPort vacancySkillRepo;

    public SkillService(
            SkillRepositoryPort skillRepo,
            UserSkillRepositoryPort userSkillRepo,
            VacancySkillRepositoryPort vacancySkillRepo) {
        this.skillRepo = skillRepo;
        this.userSkillRepo = userSkillRepo;
        this.vacancySkillRepo = vacancySkillRepo;
    }

    @Override
    public Skill create(String name) {
        skillRepo.findByName(name).ifPresent(s -> {
            throw new IllegalArgumentException("Skill already exists");
        });
        return skillRepo.save(Skill.create(name));
    }

    @Override
    public void assignToUser(Long userId, Long skillId) {
        userSkillRepo.assignSkill(userId, skillId);
    }

    @Override
    public void assignToVacancy(Long vacancyId, Long skillId) {
        vacancySkillRepo.assignSkill(vacancyId, skillId);
    }

    @Override
    public List<Long> matchVacancies(Long userId) {
        Set<Long> userSkills = userSkillRepo.findSkillIdsByUser(userId);

        return vacancySkillRepo.findAllVacancies().stream()
                .filter(vacancyId -> {
                    Set<Long> vacancySkills = vacancySkillRepo.findSkillIdsByVacancy(vacancyId);
                    return vacancySkills.stream().anyMatch(userSkills::contains);
                })
                .collect(Collectors.toList());
    }
}
