package com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.position.PositionInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.position.PositionRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Position;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PositionMapper {

    @Mapping(target = "company", ignore = true)
    Position toEntity(PositionRegisterDto positionRegisterDto);

    PositionInfoDto toDto(Position position);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(PositionRegisterDto dto, @MappingTarget Position position);

}
