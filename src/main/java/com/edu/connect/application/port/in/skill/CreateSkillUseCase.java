package com.edu.connect.application.port.in.skill;

import com.edu.connect.domain.model.skill.Skill;

public interface CreateSkillUseCase {
    Skill create(String name);
}

