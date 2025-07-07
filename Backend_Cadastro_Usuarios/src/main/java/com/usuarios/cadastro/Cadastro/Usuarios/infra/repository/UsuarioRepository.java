package com.usuarios.cadastro.Cadastro.Usuarios.infra.repository;

import com.usuarios.cadastro.Cadastro.Usuarios.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
