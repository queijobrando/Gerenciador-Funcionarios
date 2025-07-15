package com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyEditDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Company;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CompanyMapper {

    @Mapping(target = "users", ignore = true)
    Company toEntity(CompanyRegisterDto companyRegisterDto);

    CompanyInfoDto toDto(Company company);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(CompanyEditDto dto, @MappingTarget Company entity);
}
