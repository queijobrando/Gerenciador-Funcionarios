package com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.employer;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Employer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EmployerRepository extends JpaRepository<Employer, UUID> {

    Page<Employer> findByCompanyIdAndNameContainingIgnoreCase(UUID companyId, String name, Pageable pageable);

    Page<Employer> findByCompanyId(UUID companyId, Pageable pageable);

    Optional<Employer> findByCompanyIdAndId(UUID companyId, UUID employerid);

}
