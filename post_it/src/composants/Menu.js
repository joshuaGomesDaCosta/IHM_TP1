import React from 'react';
import FormNewPostIt from './FormNewPostIt';

export default function Menu(props) {
    return (
        <div className="Menu">
            <h1>Welcome to your NoteBoard !</h1>
            <FormNewPostIt colors={props.colors} onSubmit={(fields) => props.onFormAddNote(fields)}/>
        </div>
    );
}
/* todo
 * ajouter modal code couleur et formulaire nouvelle couleur
 * ajouter bouton changer couleur sur post it (cycle ou modal avec liste déroulante)
 * ajouter confirmation de suppression
 * ajouter alarmes
 */