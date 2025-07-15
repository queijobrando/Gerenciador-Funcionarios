package com.manage.workers.Gerenciamento.de.Funcionarios.api.controller;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user.UserInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("user")
public class UserController {

    private UserService userService;

    @GetMapping
    public ResponseEntity<UserInfoDto> getUserInfo(){
        return ResponseEntity.ok(userService.info());
    }

}
