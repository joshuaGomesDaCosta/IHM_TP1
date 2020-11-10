import React from 'react';
import FormNewPostIt from './FormNewPostIt';
import ModalCodeCouleur from './ModalCodeCouleur';

export default function Menu(props) {
    return (
        <div className="Menu">
            <h1>Welcome to your NoteBoard !</h1>
            <FormNewPostIt colors={props.colors} onSubmit={(fields) => props.onFormAddNote(fields)}/>
            <ModalCodeCouleur colors={props.colors}/>
        </div>
    );
}
/* todo
 * améliorer la limitation du texte (utiliser Modifier et enlever les \n sup)
 * gérer supression couleur
 * ajouter alarmes
 */