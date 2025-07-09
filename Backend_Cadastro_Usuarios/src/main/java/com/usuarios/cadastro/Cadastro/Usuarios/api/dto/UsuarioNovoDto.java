package com.usuarios.cadastro.Cadastro.Usuarios.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioNovoDto(
        @NotBlank(message = "Campo obrigatório")
        String nome,
        @NotNull(message = "Campo obrigatório")
        Integer idade,
        @Email
        @NotBlank(message = "Campo obrigatório")
        String email
) {
}
