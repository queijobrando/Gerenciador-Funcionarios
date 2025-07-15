package com.manage.workers.Gerenciamento.de.Funcionarios.api.controller;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.EmployerInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.EmployerListInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.EmployerRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.position.PositionInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.position.PositionRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.status.ChangeStatusDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.service.EmployerService;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.service.PositionService;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.service.StatusService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("employer")
public class EmployerController implements GenericController {

    private final PositionService positionService;
    private final EmployerService employerService;
    private final StatusService statusService;

    @PostMapping("/register")
    public ResponseEntity<EmployerInfoDto> createEmployer(@RequestBody @Valid EmployerRegisterDto dto) {
        EmployerInfoDto employer = employerService.createEmployer(dto);

        URI location = generateHeaderLocation(employer.id());

        return ResponseEntity.created(location).body(employer);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<EmployerListInfoDto>> getAllEmployersPages(@RequestParam(defaultValue = "1") int page,
                                                                          @RequestParam(name = "name", required = false) String name){

        Page<EmployerListInfoDto> employersPage = employerService.getAllEmployersPages(page, name == null ? "" : name);
        return ResponseEntity.ok(employersPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployerInfoDto> getEmployer(@PathVariable UUID id){
        EmployerInfoDto employer = employerService.getEmployer(id);
        return ResponseEntity.ok(employer);
    }

    @GetMapping("/positions") // Para retornar os cargos na hora do cadastro de funcionário
    public List<PositionInfoDto> getAllPositionsFromCompany() {
        return positionService.getAllPositions();
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<EmployerInfoDto> editEmployer(@PathVariable UUID id,
                                                        @RequestBody @Valid EmployerRegisterDto dto) {
        return ResponseEntity.ok(employerService.editEmployer(dto, id));
    }

    @PutMapping(path = "/status/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> setStatus(@PathVariable UUID id,
                                            @RequestPart("dto") @Valid ChangeStatusDto dto,
                                            @RequestPart(value = "file", required = false) MultipartFile medicalLeave) throws IOException {
        statusService.editStatus(medicalLeave, dto, id);
        return ResponseEntity.ok("Status editado com sucesso");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployer(@PathVariable UUID id){
        employerService.deleteEmployer(id);
        return ResponseEntity.ok("Funcionario deletado com sucesso");
    }

}
