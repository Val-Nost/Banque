import {useEffect, useState} from "react";
import {
    Button, FormControl,
    Grid, InputLabel, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import DialogCompte from "./DialogCompte";
import {Link} from "react-router-dom";

function Compte() {
    const [comptes, setComptes] = useState([])
    const [compteSelected, setCompteSelected] = useState('')
    const [open, setOpen] = useState(false)
    const [clients, setClients] = useState([])
    const [clientSelected, setClientSelected] = useState('')


    useEffect(() => {
        fetch('api/compte/lister')
            .then(response => response.json())
            .then(data => setComptes(data))
        fetch('api/client/lister')
            .then(response => response.json())
            .then(data => setClients(data))

    }, [])

    // init();
    const handleClickOpen = (compte) => {
        setCompteSelected(compte)
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    function handleCompteSubmit(event)  {
        fetch('api/client/lister/'+event.target.elements.client.value)
            .then(response => response.json())
            .then((client) => {
                fetch('api/compte', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        solde: event.target.elements.solde.value,
                        taux: event.target.elements.taux.value,
                        client: client
                    })
                })
                    .then(response => response.json())
                    .then(() => {window.location.reload()})
                }
            )
        event.preventDefault();
    }
    function effacer(id) {
        let requestOptions= {
            method: 'DELETE'
        };
        fetch('api/compte/effacer/' + id, requestOptions)
            .then(() => {window.location.reload()});
    }
    function handleChangeClient(event) {
        setClientSelected(event.target.value)
    }
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <Typography variant="h2">Liste des comptes</Typography>
                </header>
                <DialogCompte open={open} onClose={handleClose}
                              id={compteSelected?.id}
                              solde={compteSelected?.solde}
                              taux={compteSelected?.taux}
                              comptes={compteSelected?.comptes}/>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <form onSubmit={handleCompteSubmit}>
                            <TextField size="small" label="Solde" id="solde" name="solde" type="text" required/>
                            <TextField size="small" label="Taux" id="taux" name="taux" type="text" required/>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="client">Client</InputLabel>
                                <Select
                                    required
                                    name="client"
                                    labelId="client"
                                    label="Client"
                                    onChange={handleChangeClient}
                                    value={clientSelected}>
                                    {clients != null ? clients.map((row) => (
                                        <MenuItem key={row.id} value={row.id}>{row.nom + ' ' + row.prenom}</MenuItem>
                                    )) : <MenuItem/>}
                                </Select>
                            </FormControl>
                            <Button variant='contained' type="submit">Créer</Button>
                        </form>
                    </Grid>
                    <Grid item xs={8}>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Solde</TableCell>
                                        <TableCell>Taux</TableCell>
                                        <TableCell>Détail</TableCell>
                                        <TableCell>Modifier</TableCell>
                                        <TableCell>Supprimer</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {comptes.map((row) => (
                                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>{row.solde}</TableCell>
                                            <TableCell>{row.taux}</TableCell>
                                            <TableCell><Link to={'/detail-compte?id=' + row.id}><Button variant='contained'>Détail</Button></Link></TableCell>
                                            <TableCell><Button type="submit" variant='contained' onClick={() => handleClickOpen(row)}>Modifier</Button></TableCell>
                                            <TableCell><Button type="submit" variant='contained' onClick={() => effacer(row.id)}>Supprimer</Button></TableCell>
                                            <DialogCompte/>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
export default Compte;
