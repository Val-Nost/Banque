import {Component} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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

class Client extends Component {
    state = {
        clients: [],
        open : false
    };

    showDialog = (client) => {

        const handleClickOpen = () => {
            this.state.open = true;
        };
        const handleClose = () => {
            this.state.open = false;
        };

        return (
                <Dialog
                    open={this.state.open}
                    onClose={handleClose}>
                    <DialogTitle>Modifier un client</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus required margin="dense" id="id" name="id" type="hidden"/>
                        <TextField autoFocus required margin="dense" id="nom" name="nom" label="Nom" type="text" variant="standard" value={client.nom}/>
                        <TextField autoFocus required margin="dense" id="prenom" name="prenom" label="Prenom" type="text" variant="standard" value={client.prenom}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button >Valider</Button>
                    </DialogActions>
                </Dialog>
        );
    }
    async saveOrUpdate(client) {
        let lien = ''
        let requestOptions;
        if (client.id !== undefined) {
            lien = 'api/client/remplacer/' + client.id
            requestOptions= {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(client)
            };
        } else {
            lien = 'api/client';
            requestOptions= {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(client)
            };
        }


        const response = fetch(lien, requestOptions);
    }

    effacer = (id) => {
        let requestOptions= {
            method: 'DELETE'
        };

        const response = fetch('api/client/effacer/' + id, requestOptions);
        return null;
    }

    async componentDidMount() {
        const response = await fetch('api/client/lister');
        const body = await response.json();
        this.state.clients = body
        // this.setState({clients: body});
    }

    render() {
        const handleClientSubmit = (event) => {
            event.preventDefault();
            console.log(event)
        };
        const clients = this.state.clients;
        return (
            <div className="App">
                <header className="App-header">
                    <Typography variant="h2">Liste des clients</Typography>
                </header>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        {/* TODO Changer action*/}

                        <form action="api/client" method="post" onSubmit={handleClientSubmit}>
                            <TextField size="small" label="Nom" id="nom" name="nom" type="text" required/>
                            <TextField size="small" label="Prénom" id="prenom" name="prenom" type="text" required/>
                            <Button variant='contained'>Créer</Button>
                            {/*<input type="submit" value="Créer"/>*/}
                        </form>
                    </Grid>
                    <Grid item xs={8}>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prénom</TableCell>
                                        <TableCell>Détail</TableCell>
                                        <TableCell>Modifier</TableCell>
                                        <TableCell>Supprimer</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clients.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{row.nom}</TableCell>
                                            <TableCell>{row.prenom}</TableCell>
                                            <TableCell><Button type="submit" variant='contained'>Détail</Button></TableCell>
                                            <TableCell><Button type="submit" variant='contained' onClick={this.showDialog(row)}>Modifier</Button></TableCell>
                                            <TableCell><Button type="submit" variant='contained' onClick={this.effacer(row.id)}>Supprimer</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default Client;
