package com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.EmployerInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.EmployerListInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.EmployerRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Employer;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface EmployerMapper {

    @Mapping(target = "company", ignore = true)
    @Mapping(target = "position", ignore = true)
    Employer toEntity(EmployerRegisterDto employerRegisterDto);

    @Mapping(target = "positionName", source = "position.name")
    EmployerInfoDto toDto(Employer employer);

    @Mapping(target = "positionName", source = "position.name")
    EmployerListInfoDto toDtoList(Employer employer);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(EmployerRegisterDto dto, @MappingTarget Employer employer);
}
