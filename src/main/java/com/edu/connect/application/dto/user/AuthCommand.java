package com.edu.connect.application.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Authentication credentials for login")
public record AuthCommand(
        @Schema(description = "User email address", example = "admin@edu.connect", required = true)
        String email,
        
        @Schema(description = "User password", example = "admin123", required = true)
        String password
) {}
