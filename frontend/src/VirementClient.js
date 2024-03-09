import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";

function Virement() {
    const[clients, setClients] = useState([])
    const[clientEmetteur, setClientEmetteur] = useState('')
    const[clientBeneficiaire, setClientBeneficiaire] = useState('')

    const[comptesEmetteurs, setComptesEmetteurs] = useState([])
    const[compteEmetteurSelected, setCompteEmetteurSelected] = useState('')

    const[comptesBeneficiaires, setComptesBeneficiaires] = useState([])
    const[compteBeneficiaireSelected, setCompteBeneficiaireSelected] = useState('')

    const [montantVirement, setMontantVirement] = useState('')

    useEffect(() => {
        fetch('api/client/lister')
            .then(response => response.json())
            .then(data => setClients(data));
    }, [])

    function handleChangeClientEmetteur(event) {
        setClientEmetteur(event.target.value)
        fetch('api/client/lister/'+event.target.value)
            .then(response => response.json())
            .then(data => setComptesEmetteurs(data.comptes));
    }

    function handleChangeClientBeneficiaire(event) {
        setClientBeneficiaire(event.target.value)
        fetch('api/client/lister/'+event.target.value)
            .then(response => response.json())
            .then(data => setComptesBeneficiaires(data.comptes));
    }

    function handleChangeCompteEmetteur(event) {
        setCompteEmetteurSelected(event.target.value)
    }

    function handleChangeCompteBeneficiaire(event) {
        setCompteBeneficiaireSelected(event.target.value)
    }
    function handleMontantChange(event) {
        setMontantVirement(event.target.value)
    }
    function handleValidate() {
        fetch('api/compte/virement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                emetteur: compteEmetteurSelected,
                beneficiaire: compteBeneficiaireSelected,
                montant: montantVirement
            })
        })
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    window.location.reload()
                } else {
                    alert("Erreur, veuillez vérifier les montants et découverts de vos comptes")
                }
        })
    }

    return (
        <>
            <Typography variant="h2">Virement entre client</Typography>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="client-emetteur">Client émetteur</InputLabel>
                        <Select
                            labelId="client-emetteur"
                            label="Client émetteur"
                            onChange={handleChangeClientEmetteur}
                            value={clientEmetteur}>
                            {clients != null ? clients.map((row) => (
                                <MenuItem key={row.id} value={row.id}>{row.nom + ' ' + row.prenom}</MenuItem>
                            )) : <MenuItem/>}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="client-beneficiaire">Client bénéficiaire</InputLabel>
                        <Select
                            labelId="client-beneficiaire"
                            label="Client bénéficiaire"
                            onChange={handleChangeClientBeneficiaire}
                            value={clientBeneficiaire}>
                            {clients != null ? clients.map((row) => (
                                <MenuItem key={row.id} value={row.id}>{row.nom + ' ' + row.prenom}</MenuItem>
                            )) : <MenuItem/>}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="compte-emetteur">Comptes émetteurs (Id - Solde)</InputLabel>
                        <Select
                            labelId="compte-emetteur"
                            label="Compte emetteur"
                            onChange={handleChangeCompteEmetteur}
                            value={compteEmetteurSelected}>
                            {comptesEmetteurs != null ? comptesEmetteurs.map((row) => (
                                <MenuItem key={row.id} value={row.id}>{row.id + ' - ' + row.solde}</MenuItem>
                            )) : <MenuItem/>}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="compte-beneficiaire">Compte bénéficiaire (Id - Solde)</InputLabel>
                        <Select
                            labelId="compte-beneficiaire"
                            label="Compte bénéficiaire"
                            onChange={handleChangeCompteBeneficiaire}
                            value={compteBeneficiaireSelected}>
                            {comptesBeneficiaires != null ? comptesBeneficiaires.map((row) => (
                                <MenuItem key={row.id} value={row.id}>{row.id + ' - ' + row.solde}</MenuItem>
                            )) : <MenuItem/>}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField id="montant-transmis" label="Montant transmis" type="number" onChange={handleMontantChange} value={montantVirement}/>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => handleValidate()}>Valider</Button>
                </Grid>
            </Grid>
        </>
    )
}
export default Virement;