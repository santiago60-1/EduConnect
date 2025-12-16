package com.edu.connect.application.service.user;

import com.edu.connect.application.dto.user.AuthCommand;
import com.edu.connect.application.port.in.user.AuthenticateUserUseCase;
import com.edu.connect.application.port.out.user.UserRepositoryPort;
import com.edu.connect.domain.model.user.User;
import com.edu.connect.application.port.out.user.PasswordEncoderPort;
import com.edu.connect.infrastructure.security.JwtProvider;

public class AuthService implements AuthenticateUserUseCase {

    private final UserRepositoryPort userRepository;
    private final PasswordEncoderPort passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthService(UserRepositoryPort userRepository, PasswordEncoderPort passwordEncoder,
            JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public AuthResult authenticate(AuthCommand command) {
        User user = userRepository.findByEmail(command.email())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(command.password(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtProvider.generateToken(user.getEmail(), user.getRole().name());

        return new AuthResult(token, user);
    }
}
