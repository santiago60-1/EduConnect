package com.edu.connect.application.port.in.vacancy;

public interface DeleteVacancyUseCase {
    void delete(Long id, Long userId, boolean isAdmin);
}
