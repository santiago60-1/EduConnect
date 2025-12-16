package com.edu.connect.infrastructure.persistence.student;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class JpaStudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String program;
    private Integer cycle;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }

    public Integer getCycle() { return cycle; }
    public void setCycle(Integer cycle) { this.cycle = cycle; }
}
