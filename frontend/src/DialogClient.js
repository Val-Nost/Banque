import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

function DialogClient(props) {
    const { onClose, open=false, id, nom, prenom, decouvert, comptes} = props;
    function handlePopUpSubmit(event)  {
        event.preventDefault();
        console.log(event.target.elements.decouvert.value)
        fetch('api/client/remplacer/' +  event.target.elements.id.value, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: event.target.elements.id.value,
                nom:  event.target.elements.nom.value,
                prenom:  event.target.elements.prenom.value,
                decouvert:  event.target.elements.decouvert.value,
                comptes:  comptes
            })
        })
            .then(response => response.json())
        .then(() => {window.location.reload()});
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => handlePopUpSubmit(event)
        }}>
            <DialogTitle>Modifier un client</DialogTitle>
            <DialogContent>
                <TextField required margin="dense" id="id" name="id" type="hidden" value={id}/>
                <TextField required margin="dense" id="nom" name="nom" label="Nom" type="text" variant="standard" defaultValue={nom}/>
                <TextField required margin="dense" id="prenom" name="prenom" label="Prénom" type="text" variant="standard" defaultValue={prenom}/>
                <TextField required margin="dense" id="decouvert" name="decouvert" label="Découvert" type="text" variant="standard" defaultValue={decouvert}/>
                <TextField type="hidden" value={comptes}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fermer</Button>
                <Button type="submit">Valider</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogClient