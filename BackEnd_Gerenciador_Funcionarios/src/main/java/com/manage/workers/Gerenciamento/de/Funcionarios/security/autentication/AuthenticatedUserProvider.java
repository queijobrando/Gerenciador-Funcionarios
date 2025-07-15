package com.manage.workers.Gerenciamento.de.Funcionarios.security.autentication;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticatedUserProvider {

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserAuthenticated userAuthenticated) {
            return userAuthenticated.getUser();
        }

        return null;
    }
}
