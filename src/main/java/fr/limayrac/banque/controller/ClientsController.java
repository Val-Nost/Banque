package fr.limayrac.banque.controller;

import fr.limayrac.banque.model.Client;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/client")
public class ClientsController {
    @GetMapping("/lister")
    public String lister(Model model) {
        List<Client> clients = new ArrayList<>();
        Client client = new Client();
        client.setId(1);
        client.setNom("Doe");
        client.setPrenom("John");
        clients.add(client);
        model.addAttribute("clients", clients);
        return "client";
    }
    @GetMapping("/lister/{n}")
    public String lister(Model model, @PathVariable("n") Integer idClient) {
        // TODO
        return "client";
    }
    @PostMapping("/creer")
    public String creer(Model model, Client client) {
        // TODO
        return "client";
    }
    @PostMapping("/editer")
    public String editer(Model model, Client client) {
        // TODO
        return "client";
    }
    @PostMapping("/effacer")
    public String effacer(Model model, @RequestParam("idClient") Integer id) {
        // TODO
        return "client";
    }
}
