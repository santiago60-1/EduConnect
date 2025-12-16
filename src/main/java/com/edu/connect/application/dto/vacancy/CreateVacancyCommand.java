package com.edu.connect.application.dto.vacancy;

public record CreateVacancyCommand(
        String title,
        String description,
        String requirements,
        String modality,
        String location,
        String pdfUrl,
        Long userId
) {}
