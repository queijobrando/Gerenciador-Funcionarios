package com.usuarios.cadastro.Cadastro.Usuarios.api.dto;

public record UsuarioInfoDto(
        Long id,
        String nome,
        Integer idade,
        String email
) {
}
