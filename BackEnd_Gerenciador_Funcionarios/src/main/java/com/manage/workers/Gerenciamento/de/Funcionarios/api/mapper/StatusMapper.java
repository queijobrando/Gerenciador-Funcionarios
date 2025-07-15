package com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.status.ChangeStatusDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Status;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StatusMapper {

    Status toEntity(ChangeStatusDto changeStatusDto);

}
