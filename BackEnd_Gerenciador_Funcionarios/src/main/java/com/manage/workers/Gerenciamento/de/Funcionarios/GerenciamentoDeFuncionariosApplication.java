package com.manage.workers.Gerenciamento.de.Funcionarios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GerenciamentoDeFuncionariosApplication {

	public static void main(String[] args) {
		SpringApplication.run(GerenciamentoDeFuncionariosApplication.class, args);
	}

}
