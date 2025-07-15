package com.manage.workers.Gerenciamento.de.Funcionarios.security.service;

import com.manage.workers.Gerenciamento.de.Funcionarios.infra.repository.user.UserRepository;
import com.manage.workers.Gerenciamento.de.Funcionarios.security.autentication.UserAuthenticated;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .map(UserAuthenticated::new)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));
    }
}
