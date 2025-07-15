package com.manage.workers.Gerenciamento.de.Funcionarios.security.service;

import com.manage.workers.Gerenciamento.de.Funcionarios.security.autentication.UserAuthenticated;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final UserDetailsServiceImpl userDetailsService;

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        String username = jwt.getSubject();
        UserAuthenticated userDetails = (UserAuthenticated) userDetailsService.loadUserByUsername(username);

        // Use sua classe customizada que armazena o UserAuthenticated
        return new UserJwtAuthenticationToken(jwt, userDetails.getAuthorities(), userDetails);
    }
}
