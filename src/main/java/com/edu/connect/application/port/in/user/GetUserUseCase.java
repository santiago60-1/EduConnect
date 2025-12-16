package com.edu.connect.application.port.in.user;

import com.edu.connect.domain.model.user.User;

public interface GetUserUseCase {
    User getById(Long id);
}
