package com.edu.connect.infrastructure.api.user;

import com.edu.connect.application.dto.user.AuthCommand;
import com.edu.connect.application.port.in.user.AuthenticateUserUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for user authentication and authorization")
public class AuthController {

    private final AuthenticateUserUseCase authUC;

    public AuthController(AuthenticateUserUseCase authUC) {
        this.authUC = authUC;
    }

    @PostMapping("/login")
    @Operation(
            summary = "User login",
            description = "Authenticate a user with email and password. Returns a JWT token upon successful authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Login successful - Returns JWT token",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Object.class),
                            examples = @ExampleObject(
                                    name = "Successful login",
                                    value = """
                                            {
                                              "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlZHUuY29ubmVjdCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwMzU2MTIzNCwiZXhwIjoxNzAzNTY0ODM0fQ.xyz123...",
                                              "email": "admin@edu.connect",
                                              "role": "ADMIN"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Invalid credentials",
                    content = @Content(
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "error": "Invalid email or password"
                                            }
                                            """
                            )
                    )
            )
    })
    public Object login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Login credentials",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = AuthCommand.class),
                            examples = {
                                    @ExampleObject(
                                            name = "Admin login",
                                            value = """
                                                    {
                                                      "email": "admin@edu.connect",
                                                      "password": "admin123"
                                                    }
                                                    """
                                    ),
                                    @ExampleObject(
                                            name = "Teacher login",
                                            value = """
                                                    {
                                                      "email": "teacher@edu.connect",
                                                      "password": "teacher123"
                                                    }
                                                    """
                                    ),
                                    @ExampleObject(
                                            name = "Student login",
                                            value = """
                                                    {
                                                      "email": "student@edu.connect",
                                                      "password": "student123"
                                                    }
                                                    """
                                    )
                            }
                    )
            )
            @RequestBody AuthCommand cmd) {
        return authUC.authenticate(cmd);
    }
}