package com.usuarios.cadastro.Cadastro.Usuarios.api.mapper;

import com.usuarios.cadastro.Cadastro.Usuarios.api.dto.UsuarioInfoDto;
import com.usuarios.cadastro.Cadastro.Usuarios.api.dto.UsuarioNovoDto;
import com.usuarios.cadastro.Cadastro.Usuarios.domain.model.Usuario;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    Usuario toEntity(UsuarioNovoDto usuarioNovoDto);

    UsuarioInfoDto toDto(Usuario usuario);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(UsuarioNovoDto dto, @MappingTarget Usuario usuario);

}
