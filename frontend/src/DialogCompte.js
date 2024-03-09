import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

function DialogCompte(props) {
    const { onClose, open=false, id, solde, taux, comptes} = props;
    function handlePopUpSubmit(event)  {
        event.preventDefault();
        if (event.target.elements.solde.value >= 0) {
            fetch('api/compte/remplacer/' +  event.target.elements.id.value, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: event.target.elements.id.value,
                    solde:  event.target.elements.solde.value,
                    taux:  event.target.elements.taux.value
                })
            })
                .then(response => response.json())
                .then(() => {window.location.reload()});
        } else {
            alert("Le solde ne peut pas être négatif")
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => handlePopUpSubmit(event)
        }}>
            <DialogTitle>Modifier un compte</DialogTitle>
            <DialogContent>
                <TextField required margin="dense" id="id" name="id" type="hidden" value={id}/>
                <TextField required margin="dense" id="solde" name="solde" label="Solde" type="text" variant="standard" defaultValue={solde}/>
                <TextField required margin="dense" id="taux" name="taux" label="Taux" type="text" variant="standard" defaultValue={taux}/>
                <TextField type="hidden" value={comptes}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fermer</Button>
                <Button type="submit">Valider</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogCompte