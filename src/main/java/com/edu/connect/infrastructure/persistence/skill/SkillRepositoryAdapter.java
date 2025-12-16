package com.edu.connect.infrastructure.persistence.skill;

import com.edu.connect.application.port.out.skill.SkillRepositoryPort;
import com.edu.connect.domain.model.skill.Skill;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SkillRepositoryAdapter implements SkillRepositoryPort {

    private final JpaSkillRepository repo;

    public SkillRepositoryAdapter(JpaSkillRepository repo) {
        this.repo = repo;
    }

    @Override
    public Skill save(Skill skill) {
        SkillEntity entity = mapToEntity(skill);
        SkillEntity saved = repo.save(entity);
        skill.setId(saved.getId());
        return skill;
    }

    @Override
    public Optional<Skill> findByName(String name) {
        return repo.findByName(name).map(this::mapToDomain);
    }

    @Override
    public Optional<Skill> findById(Long id) {
        return repo.findById(id).map(this::mapToDomain);
    }

    private Skill mapToDomain(SkillEntity entity) {
        Skill skill = Skill.create(entity.getName());
        skill.setId(entity.getId());
        return skill;
    }

    private SkillEntity mapToEntity(Skill skill) {
        SkillEntity entity = new SkillEntity();
        if (skill.getId() != null) {
            entity.setId(skill.getId());
        }
        entity.setName(skill.getName());
        entity.setCreatedAt(skill.getCreatedAt());
        return entity;
    }
}
