package com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.user;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
}
