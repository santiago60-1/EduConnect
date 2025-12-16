package com.edu.connect.infrastructure.persistence.skill;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaSkillRepository extends JpaRepository<SkillEntity, Long> {
    Optional<SkillEntity> findByName(String name);
}
