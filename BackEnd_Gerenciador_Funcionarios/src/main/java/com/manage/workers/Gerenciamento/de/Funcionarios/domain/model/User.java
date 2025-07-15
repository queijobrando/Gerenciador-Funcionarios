package com.manage.workers.Gerenciamento.de.Funcionarios.domain.model;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.enuns.UserRole;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity(name = "users")
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    @Column(name = "name", nullable = false)
    public String name;

    @Column(name = "email", nullable = false)
    public String email;

    @Column(name = "username", nullable = false)
    public String username;

    @Column(name = "password", nullable = false)
    public String password;

    @ManyToOne
    public Company company;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    public UserRole role;

}

