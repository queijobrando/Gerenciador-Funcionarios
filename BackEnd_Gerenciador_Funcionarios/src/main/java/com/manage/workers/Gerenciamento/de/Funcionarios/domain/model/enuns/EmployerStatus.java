package com.manage.workers.Gerenciamento.de.Funcionarios.domain.model.enuns;

public enum EmployerStatus {
    ACTIVE("ativo"),
    ON_VACATION("de férias"),
    ON_MEDICAL_LEAVE("atestado");

    private String status;

    EmployerStatus(String status){
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
