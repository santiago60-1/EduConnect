package com.edu.connect.infrastructure.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request to change enrollment status")
public record ChangeEnrollmentStatusRequest(
        @Schema(description = "New enrollment status", example = "CANCELLED", required = true, allowableValues = {"ENROLLED", "CANCELLED", "COMPLETED"})
        String status
) {
}
