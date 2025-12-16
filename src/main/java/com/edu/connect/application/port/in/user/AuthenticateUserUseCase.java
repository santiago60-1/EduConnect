package com.edu.connect.application.port.in.user;

import com.edu.connect.application.dto.user.AuthCommand;
import com.edu.connect.domain.model.user.User;

public interface AuthenticateUserUseCase {

    record AuthResult(String token, User user) {}

    AuthResult authenticate(AuthCommand command);
}
