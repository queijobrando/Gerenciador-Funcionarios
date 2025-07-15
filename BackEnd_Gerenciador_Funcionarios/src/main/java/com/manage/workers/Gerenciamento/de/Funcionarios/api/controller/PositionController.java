package com.manage.workers.Gerenciamento.de.Funcionarios.api.controller;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyEditDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.company.CompanyInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.position.PositionInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.employer.position.PositionRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.service.PositionService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("position")
public class PositionController implements GenericController{

    private final PositionService positionService;

    @PostMapping("/register")
    public ResponseEntity<String> createPosition(@RequestBody @Valid PositionRegisterDto dto){
        positionService.createPosition(dto);
        return ResponseEntity.ok("Cargo criado");
    }

    @GetMapping("/all")
    public ResponseEntity<Page<PositionInfoDto>> getAllPositionsPages(@RequestParam(defaultValue = "1") int page,
                                                                      @RequestParam(name = "name", required = false) String name){

        Page<PositionInfoDto> positionsPage = positionService.getAllPositionsPages(page, name == null ? "" : name);
        return ResponseEntity.ok(positionsPage);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<PositionInfoDto> editPosition(@PathVariable UUID id,
                                                        @RequestBody @Valid PositionRegisterDto dto) {
        return ResponseEntity.ok(positionService.editPosition(dto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePosition(@PathVariable UUID id){
        positionService.deletePosition(id);
        return ResponseEntity.ok("Cargo deletado com sucesso");
    }

}
