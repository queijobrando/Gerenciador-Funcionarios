package com.usuarios.cadastro.Cadastro.Usuarios.api.controller;

import com.usuarios.cadastro.Cadastro.Usuarios.api.dto.UsuarioInfoDto;
import com.usuarios.cadastro.Cadastro.Usuarios.api.dto.UsuarioNovoDto;
import com.usuarios.cadastro.Cadastro.Usuarios.domain.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("usuarios")
@AllArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<UsuarioInfoDto> novoUsuario(@Valid @RequestBody UsuarioNovoDto dto){
        UsuarioInfoDto usuario = usuarioService.addUsuario(dto);

        return ResponseEntity.ok(usuario);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioInfoDto> getUsuario(@PathVariable Long id){
        return ResponseEntity.ok(usuarioService.getUsuario(id));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<UsuarioInfoDto>> getAll(){
        return ResponseEntity.ok(usuarioService.getAll());
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUsuario(@PathVariable Long id){
        usuarioService.deleteUsuario(id);
        return ResponseEntity.ok("Usuario deletado com sucesso!");
    }

}
