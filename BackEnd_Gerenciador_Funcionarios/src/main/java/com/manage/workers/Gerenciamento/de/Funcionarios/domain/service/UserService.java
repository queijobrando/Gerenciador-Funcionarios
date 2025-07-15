package com.manage.workers.Gerenciamento.de.Funcionarios.domain.service;

import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user.LoginDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user.LoginResponseDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user.UserInfoDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.dto.user.UserRegisterDto;
import com.manage.workers.Gerenciamento.de.Funcionarios.api.mapper.UserMapper;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.User;
import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.enuns.UserRole;
import com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.user.UserRepository;
import com.manage.workers.Gerenciamento.de.Funcionarios.security.autentication.AuthenticatedUserProvider;
import com.manage.workers.Gerenciamento.de.Funcionarios.security.service.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService {

    private final AuthenticationManager authenticationManager;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public LoginResponseDto authenticate(LoginDto request){
        var authenticationToken = new UsernamePasswordAuthenticationToken(request.username(), request.password());
        var authentication = authenticationManager.authenticate(authenticationToken);
        var token =  jwtService.generateToken(authentication);

        return new LoginResponseDto(token);
    }

    @Transactional
    public void register(UserRegisterDto dto){
        if (userRepository.findByUsername(dto.username()).isPresent()){
            throw new IllegalArgumentException("Já existe um usuario com esse nome.");
        }

        User user = userMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRole(UserRole.USER);

        userRepository.save(user);
    }

    public UserInfoDto info(){
        User usuarioLogado = authenticatedUserProvider.getAuthenticatedUser();
        return userMapper.toDto(usuarioLogado);
    }

}
