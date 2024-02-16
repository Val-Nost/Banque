package fr.limayrac.banque.controller;

import fr.limayrac.banque.model.Client;
import fr.limayrac.banque.model.Compte;
import fr.limayrac.banque.service.IClientService;
import fr.limayrac.banque.service.ICompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@Controller
@RequestMapping("/compte")
public class ComptesController {
    @Autowired
    private IClientService clientService;
    @Autowired
    private ICompteService compteService;
    @ModelAttribute("compte")
    public Compte compte() {
        return new Compte();
    }
    @ModelAttribute("clients")
    private Iterable<Client> clients() {
        return clientService.findAll();
    }
    @GetMapping("/lister")
    public ModelAndView lister() {
        return new ModelAndView("compte", "comptes", compteService.findAll());
    }
    @GetMapping("/lister/{n}")
    public ModelAndView lister(@PathVariable Integer n) {
        Optional<Compte> compte = compteService.findById(n);
        return new ModelAndView("detailCompte", "compte", compte.orElse(null));
    }
    @PostMapping("/creer")
    public String creer(@ModelAttribute("compte") Compte compte) {
        compteService.save(compte);
        return "redirect:/compte/lister";
    }
    @PostMapping("/editer")
    public ModelAndView editer(Compte compte) {
        return new ModelAndView("modifierCompte", "compte", compte);
    }
    @PostMapping("/editer/submit")
    public String submit(Compte compte) {
        compteService.save(compte);
        return "redirect:/compte/lister";
    }
    @PostMapping("/effacer")
    public String effacer(@RequestParam("idCompte") Integer id) {
        compteService.delete(id);
        return "redirect:/compte/lister";
    }
}
