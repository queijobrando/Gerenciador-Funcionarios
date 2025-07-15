package com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.employer;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Position;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PositionRepository extends JpaRepository<Position, UUID> {

    Page<Position> findByCompanyIdAndNameContainingIgnoreCase(UUID companyId, String name, Pageable pageable);

    Page<Position> findByCompanyId(UUID companyId, Pageable pageable);

    List<Position> findAllByCompanyId(UUID companyId);

    Optional<Position> findByCompanyIdAndId(UUID companyId, UUID positionId);

}
