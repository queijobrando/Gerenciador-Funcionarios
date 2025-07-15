package com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company;


import java.util.UUID;

public record CompanyInfoDto(
        UUID id,
        String name,
        String fantasy,
        String cnpj,
        String email,
        Long contact,
        String logradouro,
        Integer numero,
        String complemento,
        String bairro,
        String cidade,
        String estado,
        String cep
) {
}
