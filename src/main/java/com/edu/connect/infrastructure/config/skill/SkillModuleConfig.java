package com.edu.connect.infrastructure.config.skill;

import com.edu.connect.application.port.out.skill.SkillRepositoryPort;
import com.edu.connect.application.port.out.skill.UserSkillRepositoryPort;
import com.edu.connect.application.port.out.skill.VacancySkillRepositoryPort;
import com.edu.connect.application.service.skill.SkillService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SkillModuleConfig {

    @Bean
    public SkillService skillService(
            SkillRepositoryPort skillRepository,
            UserSkillRepositoryPort userSkillRepository,
            VacancySkillRepositoryPort vacancySkillRepository) {
        return new SkillService(skillRepository, userSkillRepository, vacancySkillRepository);
    }
}
