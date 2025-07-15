package com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user;


import java.util.UUID;

public record UserInfoDto(
        String name,
        String email,
        String username,
        UUID companyId
) {
}
