package com.manage.workers.Gerenciamento.de.Funcionarios.domain.service;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.position.PositionInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.position.PositionRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper.PositionMapper;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Company;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Position;
import com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.employer.PositionRepository;
import com.manage.workers.Gerenciamento.de.Funcionarios.security.autentication.AuthenticatedUserProvider;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PositionService {

    private final PositionMapper positionMapper;
    private final PositionRepository positionRepository;
    private final AuthenticatedUserProvider authenticatedUserProvider;

    @Transactional
    public void createPosition(PositionRegisterDto dto) {
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();

        if (company == null) {
            throw new IllegalStateException("Você precisa estar vinculado a uma empresa para criar um cargo.");
        }

        Position position = positionMapper.toEntity(dto);
        position.setCompany(company);

        positionRepository.save(position);
    }

    public Page<PositionInfoDto> getAllPositionsPages(int pageNumber, String name){
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();
        Pageable pageable = PageRequest.of(pageNumber - 1, 10);

        Page<Position> positionpage;

        if (name == null || name.trim().isEmpty()) {
            positionpage = positionRepository.findByCompanyId(company.getId(), pageable);
        } else {
            positionpage = positionRepository.findByCompanyIdAndNameContainingIgnoreCase(company.getId(), name, pageable);
        }

        return positionpage.map(positionMapper::toDto);
    }

    public List<PositionInfoDto> getAllPositions() {
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();

        if (company == null) {
            throw new IllegalStateException("Usuário não possui empresa associada.");
        }

        List<Position> positions = positionRepository.findAllByCompanyId(company.getId());
        return positions.stream()
                .map(positionMapper::toDto)
                .toList();
    }

    @Transactional
    public PositionInfoDto editPosition(PositionRegisterDto dto, UUID id) {
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();

        Position position = positionRepository.findByCompanyIdAndId(company.getId(), id)
                .orElseThrow(() -> new EntityNotFoundException("Cargo não encontrado"));

        positionMapper.updateEntityFromDto(dto, position);
        positionRepository.save(position);

        return positionMapper.toDto(position);
    }


    @Transactional
    public void deletePosition(UUID id){
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();

        Position position = positionRepository.findByCompanyIdAndId(company.getId(), id)
                .orElseThrow(() -> new EntityNotFoundException("Cargo não encontrado"));

        positionRepository.delete(position);
    }


}
