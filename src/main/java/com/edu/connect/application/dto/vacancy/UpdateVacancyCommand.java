package com.edu.connect.application.dto.vacancy;

public record UpdateVacancyCommand(
        String title,
        String description,
        String requirements,
        String modality,
        String location,
        String pdfUrl
) {}
