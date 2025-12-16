package com.edu.connect.infrastructure.persistence.skill;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "vacancy_required_skills")
@IdClass(VacancySkillId.class)
public class VacancySkillEntity {

    @Id
    private Long vacancyId;

    @Id
    private Long skillId;

    // Getters and Setters
    public Long getVacancyId() {
        return vacancyId;
    }

    public void setVacancyId(Long vacancyId) {
        this.vacancyId = vacancyId;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }
}
