package com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.employer;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StatusRepository extends JpaRepository<Status, UUID> {
}
