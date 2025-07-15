package com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.status;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.enuns.EmployerStatus;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record ChangeStatusDto(
        @NotNull(message = "Campo Obrigatório")
        UUID employerId,
        @NotNull(message = "Campo Obrigatório")
        EmployerStatus employerStatus,
        @NotNull(message = "Campo Obrigatório")
        LocalDate endDate,
        String description
) {
}
