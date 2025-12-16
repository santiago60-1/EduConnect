package com.edu.connect.infrastructure.api.Enrollment;

import com.edu.connect.application.port.in.enrollment.*;
import com.edu.connect.domain.model.enrollment.Enrollment;
import com.edu.connect.infrastructure.api.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@Tag(name = "Enrollments", description = "Course enrollment management endpoints")
public class EnrollmentController {

    private final EnrollStudentUseCase enrollUseCase;
    private final EnrollWithCodeUseCase enrollWithCodeUseCase;
    private final ChangeEnrollmentStatusUseCase changeStatusUseCase;
    private final GetStudentEnrollmentsUseCase getStudentEnrollmentsUseCase;
    private final GetCourseEnrollmentsUseCase getCourseEnrollmentsUseCase;

    public EnrollmentController(
            EnrollStudentUseCase enrollUseCase,
            EnrollWithCodeUseCase enrollWithCodeUseCase,
            ChangeEnrollmentStatusUseCase changeStatusUseCase,
            GetStudentEnrollmentsUseCase getStudentEnrollmentsUseCase,
            GetCourseEnrollmentsUseCase getCourseEnrollmentsUseCase
    ) {
        this.enrollUseCase = enrollUseCase;
        this.enrollWithCodeUseCase = enrollWithCodeUseCase;
        this.changeStatusUseCase = changeStatusUseCase;
        this.getStudentEnrollmentsUseCase = getStudentEnrollmentsUseCase;
        this.getCourseEnrollmentsUseCase = getCourseEnrollmentsUseCase;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(
            summary = "Enroll student in a course by ID",
            description = "Enrolls a student in a course using course ID. The student must be authenticated."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully enrolled"),
            @ApiResponse(responseCode = "400", description = "Student or course not found, or already enrolled"),
            @ApiResponse(responseCode = "403", description = "Not authorized - requires STUDENT role")
    })
    public Enrollment enrollStudent(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Enrollment request",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = EnrollStudentRequest.class),
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "studentId": 1,
                                              "courseId": 1
                                            }
                                            """
                            )
                    )
            )
            @RequestBody @Valid EnrollStudentRequest request
    ) {
        return enrollUseCase.enroll(request.studentId(), request.courseId());
    }

    @PostMapping("/with-code")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(
            summary = "Enroll student using course code",
            description = "Enrolls a student in a course using the 6-character course code provided by the teacher."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successfully enrolled",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "id": 1,
                                              "studentId": 1,
                                              "courseId": 1,
                                              "status": "ENROLLED",
                                              "enrolledAt": "2025-12-15T20:00:00Z"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Invalid course code or already enrolled"),
            @ApiResponse(responseCode = "403", description = "Not authorized - requires STUDENT role")
    })
    public Enrollment enrollWithCode(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Enrollment request with course code",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = EnrollWithCodeRequest.class),
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "studentId": 1,
                                              "courseCode": "A3K9D2"
                                            }
                                            """
                            )
                    )
            )
            @RequestBody @Valid EnrollWithCodeRequest request
    ) {
        return enrollWithCodeUseCase.enrollWithCode(request.studentId(), request.courseCode());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    @Operation(
            summary = "Change enrollment status",
            description = "Changes the status of an enrollment. Only teachers and admins can modify enrollment status."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Status updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid status or enrollment not found"),
            @ApiResponse(responseCode = "403", description = "Not authorized - requires TEACHER or ADMIN role")
    })
    public Enrollment changeStatus(
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "New enrollment status",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = ChangeEnrollmentStatusRequest.class),
                            examples = {
                                    @ExampleObject(
                                            name = "Cancel enrollment",
                                            value = """
                                                    {
                                                      "status": "CANCELLED"
                                                    }
                                                    """
                                    ),
                                    @ExampleObject(
                                            name = "Complete enrollment",
                                            value = """
                                                    {
                                                      "status": "COMPLETED"
                                                    }
                                                    """
                                    )
                            }
                    )
            )
            @RequestBody @Valid ChangeEnrollmentStatusRequest request
    ) {
        // Convert string to EnrollmentStatus and create command
        com.edu.connect.domain.model.enrollment.EnrollmentStatus status;
        try {
            status = com.edu.connect.domain.model.enrollment.EnrollmentStatus.valueOf(request.status().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status: " + request.status() + 
                    ". Valid values: ENROLLED, CANCELLED, COMPLETED");
        }
        
        var command = new com.edu.connect.application.dto.enrollment.ChangeEnrollmentStatusCommand(id, status);
        return changeStatusUseCase.changeStatus(command);
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
    @Operation(
            summary = "Get student enrollments",
            description = "Get all enrollments for a specific student"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Enrollments retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Student not found")
    })
    public List<Enrollment> getStudentEnrollments(@PathVariable Long studentId) {
        return getStudentEnrollmentsUseCase.getStudentEnrollments(studentId);
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    @Operation(
            summary = "Get course enrollments",
            description = "Get all enrollments for a specific course. Only teachers and admins can view course enrollments."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Enrollments retrieved successfully"),
            @ApiResponse(responseCode = "403", description = "Not authorized - requires TEACHER or ADMIN role"),
            @ApiResponse(responseCode = "404", description = "Course not found")
    })
    public List<Enrollment> getCourseEnrollments(@PathVariable Long courseId) {
        return getCourseEnrollmentsUseCase.getCourseEnrollments(courseId);
    }
}