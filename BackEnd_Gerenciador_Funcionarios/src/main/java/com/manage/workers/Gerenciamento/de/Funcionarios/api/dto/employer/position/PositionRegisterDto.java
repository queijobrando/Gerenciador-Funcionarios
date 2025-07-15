package com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.position;

import jakarta.validation.constraints.NotBlank;

public record PositionRegisterDto(
        @NotBlank
        String name,
        String description
) {}
