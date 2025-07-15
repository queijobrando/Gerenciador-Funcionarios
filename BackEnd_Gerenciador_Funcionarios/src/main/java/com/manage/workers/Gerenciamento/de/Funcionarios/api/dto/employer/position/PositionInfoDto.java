package com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.position;


import java.util.UUID;

public record PositionInfoDto(
        UUID id,
        String name,
        String description
) {
}
