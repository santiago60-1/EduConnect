package com.edu.connect.infrastructure.config.vacancy;

import com.edu.connect.application.port.out.vacancy.VacancyRepositoryPort;
import com.edu.connect.application.service.vacancy.VacancyService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class VacancyModuleConfig {

    @Bean
    public VacancyService vacancyService(VacancyRepositoryPort vacancyRepository) {
        return new VacancyService(vacancyRepository);
    }
}
