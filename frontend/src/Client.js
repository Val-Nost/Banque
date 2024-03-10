import {useEffect, useState} from "react";
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import DialogClient from "./DialogClient";
import {Link} from "react-router-dom";

function Client() {
    const [clients, setClients] = useState([])
    const [clientSelected, setClientSelected] = useState({})
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch('api/client/lister')
            .then(response => response.json())
            .then(data => setClients(data))
    }, [])

    // init();
    const handleClickOpen = (client) => {
        setClientSelected(client)
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    function handleClientSubmit(event)  {
        fetch('api/client', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nom: event.target.elements.nom.value,
                prenom: event.target.elements.prenom.value,
                decouvert: event.target.elements.decouvert.value
            })
        })
            .then(response => response.json())
            .then(() => {window.location.reload()})
        event.preventDefault();
    }
    function effacer(id) {
        let requestOptions= {
            method: 'DELETE'
        };
        fetch('api/client/effacer/' + id, requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    window.location.reload()
                } else {
                    alert("Impossible de supprimer ce client, veuillez d'abord supprimer tous ses comptes")
                }
            });
    }
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <Typography variant="h2">Liste des clients</Typography>
                </header>
                <DialogClient open={open} onClose={handleClose}
                              id={clientSelected?.id}
                              nom={clientSelected?.nom}
                              prenom={clientSelected?.prenom}
                              decouvert={clientSelected?.decouvert}
                              comptes={clientSelected?.comptes}/>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <form onSubmit={handleClientSubmit}>
                            <TextField size="small" label="Nom" id="nom" name="nom" type="text" required/>
                            <TextField size="small" label="Prénom" id="prenom" name="prenom" type="text" required/>
                            <TextField size="small" label="Découvert" id="decouvert" name="decouvert" type="text" required/>
                            <Button variant='contained' type="submit">Créer</Button>
                        </form>
                    </Grid>
                    <Grid item xs={8}>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prénom</TableCell>
                                        <TableCell>Découvert</TableCell>
                                        <TableCell>Détail</TableCell>
                                        <TableCell>Modifier</TableCell>
                                        <TableCell>Supprimer</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clients.map((row) => (
                                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>{row.nom}</TableCell>
                                            <TableCell>{row.prenom}</TableCell>
                                            <TableCell>{row.decouvert}</TableCell>
                                            <TableCell><Link to={'/detail-client?id=' + row.id}><Button variant='contained'>Détail</Button></Link></TableCell>
                                            <TableCell><Button type="submit" variant='contained' onClick={() => handleClickOpen(row)}>Modifier</Button></TableCell>
                                            <TableCell><Button type="submit" variant='contained' onClick={() => effacer(row.id)}>Supprimer</Button></TableCell>
                                            <DialogClient/>
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
export default Client;
