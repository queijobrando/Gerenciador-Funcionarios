package com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.enuns.EmployerStatus;

import java.util.UUID;

public record EmployerListInfoDto(
        UUID id,
        String name,
        String positionName,
        EmployerStatus employerStatus
) {
}
