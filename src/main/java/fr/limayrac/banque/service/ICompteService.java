package fr.limayrac.banque.service;

import fr.limayrac.banque.model.Compte;

import java.util.Optional;

public interface ICompteService {
    Optional<Compte> findById(Integer id);

    Iterable<Compte> findAll();

    Compte save(Compte compte);

    void delete(Integer id);

    void delete(Compte compte);
}
