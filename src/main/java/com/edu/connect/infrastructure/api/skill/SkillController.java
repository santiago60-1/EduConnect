package com.edu.connect.infrastructure.api.skill;

import com.edu.connect.application.port.in.skill.AssignSkillToUserUseCase;
import com.edu.connect.application.port.in.skill.AssignSkillToVacancyUseCase;
import com.edu.connect.application.port.in.skill.CreateSkillUseCase;
import com.edu.connect.application.port.in.skill.MatchVacanciesUseCase;
import com.edu.connect.domain.model.skill.Skill;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final CreateSkillUseCase createUC;
    private final AssignSkillToUserUseCase assignUserUC;
    private final AssignSkillToVacancyUseCase assignVacancyUC;
    private final MatchVacanciesUseCase matchUC;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Skill create(@RequestParam String name) {
        return createUC.create(name);
    }

    @PostMapping("/user/{userId}/{skillId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void assignToUser(
            @PathVariable Long userId,
            @PathVariable Long skillId) {
        assignUserUC.assignToUser(userId, skillId);
    }

    @PostMapping("/vacancy/{vacancyId}/{skillId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void assignToVacancy(
            @PathVariable Long vacancyId,
            @PathVariable Long skillId) {
        assignVacancyUC.assignToVacancy(vacancyId, skillId);
    }

    @GetMapping("/match/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'TEACHER')")
    public List<Long> match(@PathVariable Long userId) {
        return matchUC.matchVacancies(userId);
    }
}
