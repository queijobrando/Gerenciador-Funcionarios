package com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CompanyRegisterDto(
        @NotBlank(message = "Campo Obrigatório")
        String name,
        String fantasy,
        @NotBlank(message = "Campo Obrigatório")
        String cnpj,
        @Email
        @NotBlank(message = "Campo Obrigatório")
        String email,
        @NotNull(message = "Campo Obrigatório")
        Long contact,
        @NotBlank(message = "Campo Obrigatório")
        String logradouro,
        @NotNull(message = "Campo Obrigatório")
        Integer numero,
        @NotBlank(message = "Campo Obrigatório")
        String complemento,
        @NotBlank(message = "Campo Obrigatório")
        String bairro,
        @NotBlank(message = "Campo Obrigatório")
        String cidade,
        @NotBlank(message = "Campo Obrigatório")
        String estado,
        @NotBlank(message = "Campo Obrigatório")
        String cep
) {
}
