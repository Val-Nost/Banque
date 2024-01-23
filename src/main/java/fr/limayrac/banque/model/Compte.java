package fr.limayrac.banque.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Compte {
    private Integer id;
    private Integer solde;
    private String client;
}
