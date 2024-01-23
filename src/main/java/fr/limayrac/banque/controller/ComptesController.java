package fr.limayrac.banque.controller;

import fr.limayrac.banque.model.Compte;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/compte")
public class ComptesController {
    @GetMapping("/lister")
    public String lister(Model model) {
        return "";
    }
    @GetMapping("/lister/{n}")
    public String lister(Model model, @PathVariable("n") Integer idCompte) {
        // TODO
        return "";
    }
    @GetMapping("/creer")
    public String creer(Model model, Compte compte) {
        // TODO
        return "";
    }
    @GetMapping("/editer")
    public String editer(Model model, Compte compte) {
        // TODO
        return "";
    }
    @GetMapping("/effacer")
    public String effacer(Model model, @RequestParam("idComptes") Integer id) {
        // TODO
        return "";
    }
}
