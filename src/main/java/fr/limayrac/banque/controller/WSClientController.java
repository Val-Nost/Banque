package fr.limayrac.banque.controller;

import fr.limayrac.banque.model.Client;
import fr.limayrac.banque.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
public class WSClientController {
    @Autowired
    private IClientService clientService;
    @GetMapping("/lister")
    public List<Client> clients() {
        return (List<Client>) clientService.findAll();
    }
    @GetMapping("lister/{n}")
    public Client trouver(@PathVariable Integer n) {
        return clientService.findById(n).orElse(null);
    }

    @PostMapping
    public Client creer(@RequestBody Client newClient) {
        if (newClient.getNom() != null && newClient.getPrenom() != null) {
            return clientService.save(newClient);
        }
        return null;
    }
    @PutMapping("/remplacer/{id}")
    public Client modifier(@PathVariable Integer id, @RequestBody Client newClient) {
        return clientService.findById(id)
                .map(client -> {
                    client.setNom(newClient.getNom());
                    client.setPrenom(newClient.getPrenom());
                    client.setDecouvert(newClient.getDecouvert());
                    client.setComptes(newClient.getComptes());
                    return clientService.save(client);
                })
                .orElseGet(() -> clientService.save(newClient));
    }
    @DeleteMapping("/effacer/{id}")
    public Boolean effacer(@PathVariable Integer id) {
        try {
            clientService.delete(id);
            return true;
        } catch (DataIntegrityViolationException e) {
            return false;
        }
    }
}
