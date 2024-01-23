package fr.limayrac.banque.controller;

import fr.limayrac.banque.model.Compte;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Controller
@RequestMapping("/compte")
public class ComptesController {
    @GetMapping("/lister")
    public String lister(Model model) {
        List<Compte> comptes = new ArrayList<>();

        Compte compte = new Compte();
        compte.setId(1);
        compte.setClient("Compte1");
        compte.setSolde(1000);
        comptes.add(compte);

        compte = new Compte();
        compte.setId(2);
        compte.setClient("Compte2");
        compte.setSolde(500);
        comptes.add(compte);

        model.addAttribute("comptes", comptes);
        return "compte";
    }
    @GetMapping("/lister/{n}")
    public String lister(Model model, @PathVariable("n") Integer idCompte) {
        // TODO
        return "compte";
    }
    @PostMapping("/creer")
    public String creer(Model model, Compte compte) {
        List<Compte> comptes = (List<Compte>) model.getAttribute("comptes");
        comptes.add(compte);
        return "compte";
    }
    @PostMapping("/editer")
    public String editer(Model model, Compte compte) {
        return "compte";
    }
    @PostMapping("/effacer")
    public String effacer(Model model, @RequestParam("idCompte") Integer id) {
        if (model.getAttribute("comptes") instanceof List<?>) {
            List<Compte> comptes = (List<Compte>) model.getAttribute("comptes");
            assert comptes != null;
            comptes.removeIf(compte -> Objects.equals(compte.getId(), id));
        }
        return "compte";
    }
}
