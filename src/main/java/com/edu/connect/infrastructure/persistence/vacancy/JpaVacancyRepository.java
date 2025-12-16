package com.edu.connect.infrastructure.persistence.vacancy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaVacancyRepository extends JpaRepository<JpaVacancyEntity, Long> {

    @Query("SELECT v FROM JpaVacancyEntity v WHERE " +
            "(:title IS NULL OR LOWER(v.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
            "(:location IS NULL OR LOWER(v.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:modality IS NULL OR LOWER(v.modality) LIKE LOWER(CONCAT('%', :modality, '%')))")
    List<JpaVacancyEntity> findByFilters(
            @Param("title") String title,
            @Param("location") String location,
            @Param("modality") String modality);
}
