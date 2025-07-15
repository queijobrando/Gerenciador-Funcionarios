package com.manage.workers.Gerenciamento.de.Funcionarios.api.controller;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyEditDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.service.CompanyService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@AllArgsConstructor
@RequestMapping("company")
public class CompanyController implements GenericController {

    private final CompanyService companyService;

    @PostMapping("/register")
    public ResponseEntity<CompanyInfoDto> createCompany(@RequestBody @Valid CompanyRegisterDto dto) {
        CompanyInfoDto company = companyService.createCompany(dto);

        URI location = generateHeaderLocation(company.id());

        return ResponseEntity.created(location).body(company);
    }

    @GetMapping("/info")
    public ResponseEntity<CompanyInfoDto> getCompany(){
        return ResponseEntity.ok(companyService.getCompanyDetails());
    }

    @PutMapping("/edit")
    public ResponseEntity<CompanyInfoDto> editCompany(@RequestBody @Valid CompanyEditDto dto) {
        return ResponseEntity.ok(companyService.editCompany(dto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCompany(@RequestBody @Valid CompanyEditDto dto) {
        companyService.deleteCompany();
        return ResponseEntity.ok("Empresa Deletada com sucesso!");
    }
}
