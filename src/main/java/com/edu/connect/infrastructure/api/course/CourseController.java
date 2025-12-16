package com.edu.connect.infrastructure.api.course;

import com.edu.connect.application.dto.course.CreateCourseCommand;
import com.edu.connect.application.dto.course.UpdateCourseCommand;
import com.edu.connect.application.port.in.course.CreateCourseUseCase;
import com.edu.connect.application.port.in.course.DeleteCourseUseCase;
import com.edu.connect.application.port.in.course.GetTeacherCoursesUseCase;
import com.edu.connect.application.port.in.course.UpdateCourseUseCase;
import com.edu.connect.domain.model.Course.Course;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CreateCourseUseCase createCourse;
    private final UpdateCourseUseCase updateCourse;
    private final DeleteCourseUseCase deleteCourse;
    private final GetTeacherCoursesUseCase getMyCourses;

    public CourseController(
            CreateCourseUseCase createCourse,
            UpdateCourseUseCase updateCourse,
            DeleteCourseUseCase deleteCourse,
            GetTeacherCoursesUseCase getMyCourses
    ) {
        this.createCourse = createCourse;
        this.updateCourse = updateCourse;
        this.deleteCourse = deleteCourse;
        this.getMyCourses = getMyCourses;
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public Course create(@RequestBody CreateCourseCommand command) {
        return createCourse.create(command);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public Course update(@PathVariable Long id, @RequestBody UpdateCourseCommand command) {
        return updateCourse.update(command);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public void delete(@PathVariable Long id) {
        deleteCourse.delete(id);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('TEACHER')")
    public List<Course> myCourses(@RequestParam Long userId) {
        return getMyCourses.getMyCourses(userId);
    }
}