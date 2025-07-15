package com.manage.workers.Gerenciamento.de.Funcionarios.domain.service;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyEditDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper.CompanyMapper;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Company;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.Position;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.User;
import com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.company.CompanyRepository;
import com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.employer.PositionRepository;
import com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.user.UserRepository;
import com.manage.workers.Gerenciamento.de.Funcionarios.security.autentication.AuthenticatedUserProvider;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final CompanyMapper companyMapper;
    private final UserRepository userRepository;
    private final PositionRepository positionRepository;

    @Transactional
    public CompanyInfoDto createCompany(CompanyRegisterDto dto){
        User usuarioLogado = authenticatedUserProvider.getAuthenticatedUser();
        if (usuarioLogado.getCompany() != null){
            throw new IllegalArgumentException("Seu usuario já possui uma empresa cadastrada!");
        }

        Company company = companyMapper.toEntity(dto);
        usuarioLogado.setCompany(company);
        company.setUsers(List.of(usuarioLogado));

        companyRepository.save(company);
        userRepository.save(usuarioLogado);

        Position position = new Position();
        position.setName("Funcionário");
        position.setDescription("Cargo padrão da sua empresa");
        position.setCompany(company);

        positionRepository.save(position);

        return companyMapper.toDto(company);
    }

    public CompanyInfoDto getCompanyDetails(){
        User usuarioLogado = authenticatedUserProvider.getAuthenticatedUser();

        if (usuarioLogado.getCompany() == null){
            throw new IllegalArgumentException("Nenhuma empresa cadastrada no seu Usuario!");
        }

        return companyMapper.toDto(usuarioLogado.getCompany());
    }

    @Transactional
    public CompanyInfoDto editCompany(CompanyEditDto dto) {
        User usuarioLogado = authenticatedUserProvider.getAuthenticatedUser();

        if (usuarioLogado.getCompany() == null) {
            throw new IllegalStateException("Você ainda não possui uma empresa para editar.");
        }

        Company empresa = usuarioLogado.getCompany();

        companyMapper.updateEntityFromDto(dto, empresa);

        return companyMapper.toDto(empresa);
    }

    @Transactional
    public void deleteCompany(){
        User usuarioLogado = authenticatedUserProvider.getAuthenticatedUser();

        if (usuarioLogado.getCompany() == null) {
            throw new IllegalStateException("Você ainda não possui uma empresa para deletar.");
        }

        Company company = usuarioLogado.getCompany();
        companyRepository.delete(company);
    }

}
