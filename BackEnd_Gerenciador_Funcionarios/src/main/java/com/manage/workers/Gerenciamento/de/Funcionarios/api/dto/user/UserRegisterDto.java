package com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRegisterDto(
        @NotBlank(message = "Campo Obrigatório")
        String name,
        @Email
        @NotBlank(message = "Campo Obrigatório")
        String email,
        @NotBlank(message = "Campo Obrigatório")
        String username,
        @NotBlank(message = "Campo Obrigatório")
        String password
) {
}
