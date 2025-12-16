package com.edu.connect.application.port.out.skill;

import com.edu.connect.domain.model.skill.Skill;

import java.util.Optional;

public interface SkillRepositoryPort {

    Skill save(Skill skill);

    Optional<Skill> findByName(String name);

    Optional<Skill> findById(Long id);
}
