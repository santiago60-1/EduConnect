package com.edu.connect.application.port.in.user;

import com.edu.connect.application.dto.user.UpdateUserCommand;
import com.edu.connect.domain.model.user.User;

public interface UpdateUserUseCase {
    User update(UpdateUserCommand command);
}
