package fr.limayrac.banque.repository;

import fr.limayrac.banque.model.Client;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client, Integer> {
}
