import {
    Button,
    FormControl,
    Grid, InputLabel, MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";

function DetailClient() {
    const [client, setClient] = useState({})
    // Le compte emetteur sélectionné
    const [compteEmetteurSelected, setCompteEmetteurSelected] = useState('');
    // Les compte bénéficiaires
    const [comptesBeneficiaires, setComptesBeneficiaires] = useState([]);
    // Le compte bénéficiaire sélectionné
    const [compteBeneficiaireSelected, setCompteBeneficiaireSelected] = useState('');
    // Montant virement
    const [montantVirement, setMontantVirement] = useState(0)
    const queryParameters = new URLSearchParams(window.location.search)
    let id = queryParameters.get("id");

    useEffect(() => {
        fetch('api/client/lister/'+id)
            .then(response => response.json())
            .then(data => setClient(data));
    }, [])

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
    function handleCompteEmmetteurChange(event) {
        setCompteEmetteurSelected(event.target.value)
        let comptesBeneficiaire = []
        client.comptes.map(compte => {
            if (compte.id !== event.target.value) {
                comptesBeneficiaire.push(compte)
            }
        })
        setComptesBeneficiaires(comptesBeneficiaire);
    }
    function handleCompteBeneficiaireChange(event) {
        setCompteBeneficiaireSelected(event.target.value)
    }
    function handleMontantChange(event) {
        setMontantVirement(event.target.value)
    }
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h2">Détail du client : {client.id}</Typography>
                    <Typography variant="h3">Nom : {client.nom}</Typography>
                    <Typography variant="h3">Prénom : {client.prenom}</Typography>
                    <Typography variant="h3">Découvert : {client.decouvert}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Grid container sx={{textAlign: 'center'}}>
                        <Grid item xs={6}>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="compte-emetteur">Compte émetteur</InputLabel>
                                <Select
                                    labelId="compte-emetteur"
                                    label="Compte émetteur"
                                    onChange={handleCompteEmmetteurChange}
                                    value={compteEmetteurSelected}>
                                    {client.comptes != null ? client.comptes.map((row) => (
                                        <MenuItem key={row.id} value={row.id}>{row.id}</MenuItem>
                                    )) : <MenuItem/>}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="compte-beneficiaire">Compte bénéficiaire</InputLabel>
                                <Select
                                    labelId="compte-beneficiaire"
                                    label="Compte bénéficiaire"
                                    value={compteBeneficiaireSelected}
                                    onChange={handleCompteBeneficiaireChange}>
                                    {comptesBeneficiaires != null ? comptesBeneficiaires.map((row) => (
                                        <MenuItem key={row.id} value={row.id}>{row.id}</MenuItem>
                                    )) : <MenuItem/>}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="montant-transmis" label="Montant transmis" type="number" onChange={handleMontantChange} value={montantVirement}/>
                        </Grid>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <Button variant="contained" onClick={() => handleValidate()}>Valider</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Identifiant</TableCell>
                            <TableCell>Solde</TableCell>
                            <TableCell>Taux</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {client.comptes != null ? client.comptes.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.solde}</TableCell>
                                <TableCell>{row.taux}</TableCell>
                            </TableRow>
                        )) :
                            <TableRow>
                                <TableCell>Vide</TableCell>
                                <TableCell>Vide</TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DetailClient