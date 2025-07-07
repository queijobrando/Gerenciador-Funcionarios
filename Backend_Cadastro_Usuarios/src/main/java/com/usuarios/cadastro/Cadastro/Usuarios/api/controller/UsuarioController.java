package com.usuarios.cadastro.Cadastro.Usuarios.api.controller;

import com.usuarios.cadastro.Cadastro.Usuarios.api.dto.UsuarioInfoDto;
import com.usuarios.cadastro.Cadastro.Usuarios.api.dto.UsuarioNovoDto;
import com.usuarios.cadastro.Cadastro.Usuarios.domain.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("usuarios")
@AllArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioInfoDto> novoUsuario(@RequestBody UsuarioNovoDto dto){
        UsuarioInfoDto usuario = usuarioService.addUsuario(dto);

        return ResponseEntity.ok(usuario);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioInfoDto>> getAll(){
        return ResponseEntity.ok(usuarioService.getAll());
    }

}
