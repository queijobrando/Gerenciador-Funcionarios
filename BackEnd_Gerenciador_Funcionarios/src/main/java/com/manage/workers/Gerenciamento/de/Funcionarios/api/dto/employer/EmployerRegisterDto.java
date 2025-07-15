package com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Position;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record EmployerRegisterDto(
        @NotBlank(message = "Campo Obrigatório")
        String name,
        @NotNull(message = "Campo Obrigatório")
        LocalDate birthdate,
        @NotNull(message = "Campo Obrigatório")
        LocalDate hiredate,
        @NotBlank(message = "Campo Obrigatório")
        String cpf,
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
        String cep,
        @NotNull(message = "Campo Obrigatório")
        UUID positionId
){
}
