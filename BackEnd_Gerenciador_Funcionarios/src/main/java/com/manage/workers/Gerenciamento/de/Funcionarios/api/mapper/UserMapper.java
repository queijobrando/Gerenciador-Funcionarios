package com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user.UserInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user.UserRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", ignore = true)
    User toEntity(UserRegisterDto userRegisterDto);

    @Mapping(target = "companyId", source = "company.id")
    UserInfoDto toDto(User user);

}
