package com.manage.workers.Gerenciamento.de.Funcionarios.domain.service;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.status.ChangeStatusDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper.EmployerMapper;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper.StatusMapper;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Company;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Employer;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Status;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.enuns.EmployerStatus;
import com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.employer.EmployerRepository;
import com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.employer.StatusRepository;
import com.manage.workers.Gerenciamento.de.Funcionarios.security.autentication.AuthenticatedUserProvider;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@AllArgsConstructor
public class StatusService {

    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final EmployerRepository employerRepository;
    private final EmployerMapper employerMapper;
    private final StatusRepository statusRepository;
    private final StatusMapper statusMapper;

    @Transactional
    public void editStatus(MultipartFile medicalLeave, ChangeStatusDto dto, UUID employerId) throws IOException {
        Company company = authenticatedUserProvider.getAuthenticatedUser().getCompany();

        Employer employer = employerRepository.findByCompanyIdAndId(company.getId(), employerId)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário não encontrado"));

        employer.setEmployerStatus(dto.employerStatus());

        Status status = statusMapper.toEntity(dto);
        status.setEmployerId(employerId);


        if (dto.employerStatus() == EmployerStatus.ON_MEDICAL_LEAVE
                && medicalLeave != null
                && !medicalLeave.isEmpty()) {

            if (!"application/pdf".equalsIgnoreCase(medicalLeave.getContentType())) {
                throw new IllegalArgumentException("Tipo de arquivo não suportado.");
            }

            status.setMedicalLeave(medicalLeave.getBytes());
        }

        statusRepository.save(status);
    }

}
