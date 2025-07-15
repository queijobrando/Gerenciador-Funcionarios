package com.manage.workers.Gerenciamento.de.Funcionarios.domain.service;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.EmployerInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.EmployerListInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.EmployerRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper.EmployerMapper;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Company;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Employer;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Position;
import com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.employer.EmployerRepository;
import com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.employer.PositionRepository;
import com.manage.workers.Gerenciamento.de.Funcionarios.security.autentication.AuthenticatedUserProvider;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@AllArgsConstructor
public class EmployerService {

    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final EmployerRepository employerRepository;
    private final EmployerMapper employerMapper;
    private final PositionRepository positionRepository;

    @Transactional
    public EmployerInfoDto createEmployer(EmployerRegisterDto dto) {
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();

        if (company == null) {
            throw new IllegalStateException("Você precisa estar vinculado a uma empresa para criar um cargo.");
        }

        Position position = positionRepository.findById(dto.positionId())
                .filter(pos -> pos.getCompany().getId().equals(company.getId()))
                .orElseThrow(() -> new IllegalArgumentException("Cargo inválido ou não pertence à sua empresa."));

        Employer employer = employerMapper.toEntity(dto);
        employer.setCompany(company);
        employer.setPosition(position);

        employerRepository.save(employer);
        return employerMapper.toDto(employer);
    }

    public Page<EmployerListInfoDto> getAllEmployersPages(int pageNumber, String name){
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();
        Pageable pageable = PageRequest.of(pageNumber - 1, 10);

        Page<Employer> positionpage;

        if (name == null || name.trim().isEmpty()) {
            positionpage = employerRepository.findByCompanyId(company.getId(), pageable);
        } else {
            positionpage = employerRepository.findByCompanyIdAndNameContainingIgnoreCase(company.getId(), name, pageable);
        }

        return positionpage.map(employerMapper::toDtoList);
    }

    public EmployerInfoDto getEmployer(UUID id){
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();

        Employer employer = employerRepository.findByCompanyIdAndId(company.getId() ,id)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário não encontrado"));

        return employerMapper.toDto(employer);
    }

    @Transactional
    public EmployerInfoDto editEmployer(EmployerRegisterDto dto, UUID id) {
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();

        Employer employer = employerRepository.findByCompanyIdAndId(company.getId() ,id)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário não encontrado"));

        employerMapper.updateEntityFromDto(dto, employer);
        employerRepository.save(employer);

        return employerMapper.toDto(employer);
    }

    @Transactional
    public void deleteEmployer(UUID id){
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();

        Employer employer = employerRepository.findByCompanyIdAndId(company.getId() ,id)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário não encontrado"));

        employerRepository.delete(employer);
    }

}
