package com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Position;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.enuns.EmployerStatus;

import java.time.LocalDate;
import java.util.UUID;

public record EmployerInfoDto(
        UUID id,
        String name,
        LocalDate birthdate,
        LocalDate hiredate,
        String cpf,
        String email,
        Long contact,
        String logradouro,
        Integer numero,
        String complemento,
        String bairro,
        String cidade,
        String estado,
        String cep,
        String positionName,
        EmployerStatus employerStatus
) {
}
