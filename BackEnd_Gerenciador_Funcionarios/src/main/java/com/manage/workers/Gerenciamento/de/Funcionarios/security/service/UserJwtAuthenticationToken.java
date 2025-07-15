package com.manage.workers.Gerenciamento.de.Funcionarios.security.service;

import com.manage.workers.Gerenciamento.de.Funcionarios.security.autentication.UserAuthenticated;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import java.util.Collection;

public class UserJwtAuthenticationToken extends JwtAuthenticationToken {

    private final UserAuthenticated user;

    public UserJwtAuthenticationToken(Jwt jwt, Collection authorities, UserAuthenticated user) {
        super(jwt, authorities, user.getUsername());
        this.user = user;
    }

    @Override
    public Object getPrincipal() {
        return user;
    }
}
