package com.edu.connect.application.port.out.skill;

import java.util.Set;

public interface UserSkillRepositoryPort {

    void assignSkill(Long userId, Long skillId);

    Set<Long> findSkillIdsByUser(Long userId);
}
