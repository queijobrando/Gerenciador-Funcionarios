package com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.company;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Company;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
    Optional<Company> findByUsers(User user);
}
