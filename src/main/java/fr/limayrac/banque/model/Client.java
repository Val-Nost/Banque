package fr.limayrac.banque.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Getter @Setter
@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String prenom;
    @OneToMany(mappedBy = "client")
    @JsonManagedReference
    private List<Compte> comptes;
    @ColumnDefault("0")
    private Double decouvert;
}
