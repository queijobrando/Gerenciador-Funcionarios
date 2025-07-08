package com.usuarios.cadastro.Cadastro.Usuarios.domain.service;

import com.usuarios.cadastro.Cadastro.Usuarios.api.dto.UsuarioInfoDto;
import com.usuarios.cadastro.Cadastro.Usuarios.api.dto.UsuarioNovoDto;
import com.usuarios.cadastro.Cadastro.Usuarios.api.mapper.UsuarioMapper;
import com.usuarios.cadastro.Cadastro.Usuarios.domain.model.Usuario;
import com.usuarios.cadastro.Cadastro.Usuarios.infra.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    @Transactional
    public UsuarioInfoDto addUsuario(UsuarioNovoDto dto){
        Usuario usuario = usuarioMapper.toEntity(dto);
        usuarioRepository.save(usuario);

        return usuarioMapper.toDto(usuario);
    }

    public List<UsuarioInfoDto> getAll(){
        List<Usuario> lista = usuarioRepository.findAll();

        return lista.stream().map(usuarioMapper::toDto).toList();
    }

    @Transactional
    public void deleteUsuario(Long id){
        usuarioRepository.delete(usuarioRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Usuario não encontrado")
        ));
    }

}
