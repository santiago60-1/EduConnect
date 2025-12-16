package com.edu.connect.infrastructure.persistence.skill;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaUserSkillRepository extends JpaRepository<UserSkillEntity, UserSkillId> {
    List<UserSkillEntity> findByUserId(Long userId);
}
