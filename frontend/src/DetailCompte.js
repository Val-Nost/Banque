import {Typography} from "@mui/material";
import {useEffect, useState} from "react";

function DetailCompte() {
    const [compte, setCompte] = useState({})
    const [client, setClient] = useState({})
    const queryParameters = new URLSearchParams(window.location.search)
    let id = queryParameters.get("id");
    useEffect(() => {
        fetch('api/compte/lister/'+id)
            .then(response => response.json())
            .then(data => setCompte(data))
        fetch('api/compte/lister/'+id+'/client')
            .then(response => response.json())
            .then(data => setClient(data))

    }, [])
    console.log(compte)
    return(
        <>
            <Typography variant="h2">Détail du compte : {compte.id}</Typography>
            <Typography variant="h3">Détenteur du compte : {client.nom + ' ' + client.prenom}</Typography>
            <Typography variant="h3">Solde : {compte.solde}</Typography>
            <Typography variant="h3">Taux : {compte.taux}</Typography>
        </>
    )
}

export default DetailCompte