package fr.limayrac.banque.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/client")
public class ClientsController {
    @GetMapping("/lister")
    public String lister(Model model) {
        // TODO
        return "";
    }
    @GetMapping("/lister/{n}")
    public String lister(Model model, @PathVariable("n") Integer idClient) {
        // TODO
        return "";
    }
    @GetMapping("/creer")
    public String creer(Model model) {
        // TODO
        return "";
    }
    @GetMapping("/editer")
    public String editer(Model model) {
        // TODO
        return "";
    }
    @GetMapping("/effacer")
    public String effacer(Model model) {
        // TODO
        return "";
    }
}
