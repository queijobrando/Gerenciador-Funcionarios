package com.manage.workers.Gerenciamento.de.Funcionarios.domain.model;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.enuns.EmployerStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "status")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private EmployerStatus employerStatus;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "description")
    private String description;

    @Column(name = "employer_id")
    private UUID employerId;

    @Lob
    @Column
    private byte[] medicalLeave;

    @CreatedDate
    @Column(name = "register_date")
    private LocalDateTime registerDate;
}
