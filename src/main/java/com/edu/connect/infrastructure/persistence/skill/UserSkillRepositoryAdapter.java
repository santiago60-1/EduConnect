package com.edu.connect.infrastructure.persistence.skill;

import com.edu.connect.application.port.out.skill.UserSkillRepositoryPort;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserSkillRepositoryAdapter implements UserSkillRepositoryPort {

    private final JpaUserSkillRepository repo;

    public UserSkillRepositoryAdapter(JpaUserSkillRepository repo) {
        this.repo = repo;
    }

    @Override
    public void assignSkill(Long userId, Long skillId) {
        UserSkillEntity entity = new UserSkillEntity();
        entity.setUserId(userId);
        entity.setSkillId(skillId);
        repo.save(entity);
    }

    @Override
    public Set<Long> findSkillIdsByUser(Long userId) {
        return repo.findByUserId(userId).stream()
                .map(UserSkillEntity::getSkillId)
                .collect(Collectors.toSet());
    }
}
