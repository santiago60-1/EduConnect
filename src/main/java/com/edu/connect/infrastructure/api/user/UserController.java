package com.edu.connect.infrastructure.api.user;

import com.edu.connect.application.dto.user.RegisterUserCommand;
import com.edu.connect.application.dto.user.UpdateUserCommand;
import com.edu.connect.application.port.in.user.*;
import com.edu.connect.domain.model.user.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final RegisterUserUseCase registerUC;
    private final UpdateUserUseCase updateUC;
    private final GetUserUseCase getUC;

    public UserController(RegisterUserUseCase registerUC, UpdateUserUseCase updateUC, GetUserUseCase getUC) {
        this.registerUC = registerUC;
        this.updateUC = updateUC;
        this.getUC = getUC;
    }

    @PostMapping
    public User register(@RequestBody RegisterUserCommand cmd) {
        return registerUC.register(cmd);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody UpdateUserCommand cmd) {
        // Create new command with ID from path if needed, or assume cmd has it.
        // UpdateUseCases usually expect the Command object.
        // Assuming UpdateUserCommand has ID field, we should ensure it matches path or
        // use path.
        // Since UpdateUserCommand is a record, we might need to reconstruct it or
        // change logic.
        // For now, let's assume we pass the command as is, but we must ensure ID
        // compatibility.
        // The compile error says UpdateUserUseCase.update takes (UpdateUserCommand),
        // not (String, Command).

        // We need to verify UpdateUserCommand structure. It has 'id' (Long).
        // UseCase interface: User update(UpdateUserCommand command);

        // Reconstruct command with ID from path to be safe/correct
        UpdateUserCommand updatedCmd = new UpdateUserCommand(
                id,
                cmd.email(),
                cmd.password());
        return updateUC.update(updatedCmd);
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return getUC.getById(id);
    }
}
