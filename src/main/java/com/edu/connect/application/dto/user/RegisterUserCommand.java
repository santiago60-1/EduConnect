package com.edu.connect.application.dto.user;

import com.edu.connect.domain.model.user.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User registration data")
public record RegisterUserCommand(
        @Schema(description = "Full name of the user", example = "Juan Pérez García", required = true)
        String fullname,
        
        @Schema(description = "Email address (will receive credentials)", example = "juan.perez@student.edu.connect", required = true)
        String email,
        
        @Schema(description = "User role in the system", example = "STUDENT", required = true, allowableValues = {"ADMIN", "TEACHER", "STUDENT"})
        UserRole role,
        
        @Schema(description = "City ID where the user is located", example = "1", required = true)
        Long cityId
) {
}
