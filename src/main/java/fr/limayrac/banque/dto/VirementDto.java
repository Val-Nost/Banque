package fr.limayrac.banque.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VirementDto {
    private Integer emetteur;
    private Integer beneficiaire;
    private Integer montant;
}
