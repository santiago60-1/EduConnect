package com.edu.connect.infrastructure.persistence.skill;

import java.io.Serializable;
import java.util.Objects;

public class VacancySkillId implements Serializable {

    private Long vacancyId;
    private Long skillId;

    public VacancySkillId() {
    }

    public VacancySkillId(Long vacancyId, Long skillId) {
        this.vacancyId = vacancyId;
        this.skillId = skillId;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        VacancySkillId that = (VacancySkillId) o;
        return Objects.equals(vacancyId, that.vacancyId) &&
                Objects.equals(skillId, that.skillId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(vacancyId, skillId);
    }
}
