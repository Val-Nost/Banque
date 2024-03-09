package fr.limayrac.banque.controller;

import fr.limayrac.banque.dto.VirementDto;
import fr.limayrac.banque.model.Client;
import fr.limayrac.banque.model.Compte;
import fr.limayrac.banque.service.ICompteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compte")
public class WSCompteController {
    Logger logger = LoggerFactory.getLogger(WSCompteController.class);
    @Autowired
    private ICompteService compteService;
    @GetMapping("/lister")
    public List<Compte> comptes() {
        return (List<Compte>) compteService.findAll();
    }
    @GetMapping("lister/{n}")
    public Compte trouver(@PathVariable Integer n) {
        return compteService.findById(n).orElse(null);
    }
    @GetMapping("lister/{n}/client")
    public Client trouverClientCompte(@PathVariable Integer n) {
        return compteService.findById(n).orElse(null).getClient();
    }

    @PostMapping
    public Compte creer(@RequestBody Compte newCompte) {
        if (newCompte.getSolde() != null && newCompte.getTaux() != null) {
            return compteService.save(newCompte);
        }
        return null;
    }
    @PutMapping("/remplacer/{id}")
    public Compte modifier(@PathVariable Integer id, @RequestBody Compte newCompte) {
        return compteService.findById(id)
                .map(compte -> {
                    compte.setSolde(newCompte.getSolde());
                    compte.setTaux(newCompte.getTaux());
//                    compte.setComptes(newCompte.getComptes());
                    return compteService.save(compte);
                })
                .orElseGet(() -> compteService.save(newCompte));
    }
    @DeleteMapping("/effacer/{id}")
    public void effacer(@PathVariable Integer id) {
        compteService.delete(id);
    }
    @PostMapping("/virement")
    public Boolean virementInterne(@RequestBody VirementDto virementDto) {
        Compte emetteur = compteService.findById(virementDto.getEmetteur()).orElse(null);
        Compte beneficiaire = compteService.findById(virementDto.getBeneficiaire()).orElse(null);

        if (emetteur != null && beneficiaire != null) {
            int montantDebite = emetteur.getSolde() - virementDto.getMontant();
            if (montantDebite < 0) {
                if (-emetteur.getClient().getDecouvert() < montantDebite) {
                    // Virement possible
                    String msgLog = "Virement entre les comptes %d et %d d'un montant de %d";
                    msgLog = String.format(msgLog, virementDto.getEmetteur(), virementDto.getBeneficiaire(), virementDto.getMontant());
                    logger.info(msgLog);
                    emetteur.setSolde(montantDebite);
                    beneficiaire.setSolde(beneficiaire.getSolde() + virementDto.getMontant());
                    compteService.save(emetteur);
                    compteService.save(beneficiaire);
                    return true;
                } else {
                    // Virement impossible
                    logger.error("Virement impossible, solde insuffisant");
                    return false;
                }
            } else {
                String msgLog = "Virement entre les comptes %d et %d d'un montant de %d";
                msgLog = String.format(msgLog, virementDto.getEmetteur(), virementDto.getBeneficiaire(), virementDto.getMontant());
                logger.info(msgLog);
                emetteur.setSolde(montantDebite);
                beneficiaire.setSolde(beneficiaire.getSolde() + virementDto.getMontant());
                compteService.save(emetteur);
                compteService.save(beneficiaire);
                return true;
            }
        } else {
            // Un des deux comptes est introuvable
            logger.error("Virement impossible, l'un des comptes est introuvables");
            return false;
        }
    }
}
