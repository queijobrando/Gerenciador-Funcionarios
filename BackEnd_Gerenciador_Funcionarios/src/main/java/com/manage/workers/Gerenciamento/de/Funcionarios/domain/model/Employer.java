package com.manage.workers.Gerenciamento.de.Funcionarios.domain.model;

import com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.enuns.EmployerStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "employers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "birthdate", nullable = false)
    private LocalDate birthdate;

    @Column(name = "hiredate", nullable = false)
    private LocalDate hiredate;

    @Column(name = "cpf", nullable = false)
    private String cpf;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "contact", nullable = false)
    private Long contact;

    @Column(name = "logradouro", nullable = false)
    private String logradouro;

    @Column(name = "numero", nullable = false)
    private Integer numero;

    @Column(name = "complemento", nullable = false)
    private String complemento;

    @Column(name = "bairro", nullable = false)
    private String bairro;

    @Column(name = "cidade", nullable = false)
    private String cidade;

    @Column(name = "estado", nullable = false)
    private String estado;

    @Column(name = "cep", nullable = false)
    private String cep;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private EmployerStatus employerStatus;

    @ManyToOne(optional = false)
    @JoinColumn(name = "position_id")
    private Position position;

    @ManyToOne(optional = false)
    @JoinColumn(name = "company_id")
    private Company company;

    @PrePersist
    public void gerarCamposAutomaticos(){
        this.employerStatus = EmployerStatus.ACTIVE;
    }

}
