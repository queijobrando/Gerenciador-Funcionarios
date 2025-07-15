package com.manage.workers.Gerenciamento.de.Funcionarios.api.controller;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user.LoginDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user.LoginResponseDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user.UserRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("auth")
public class AuthenticationController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto request){
        var token =  userService.authenticate(request);

        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserRegisterDto userRegisterDto){
        userService.register(userRegisterDto);

        return ResponseEntity.ok("Usuario Cadastrado");
    }

}
