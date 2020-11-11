import React from 'react';
import FormNewPostIt from './FormNewPostIt';
import {Icon, List} from 'semantic-ui-react';

export default function Menu(props) {
    return (
        <div className="Menu">
            <h1>Welcome to your NoteBoard !</h1>
            <FormNewPostIt colors={props.colors} onSubmit={(fields) => props.onFormAddNote(fields)}/>
            Icons list :
            <List celled horizontal>
                <List.Item><Icon name="pencil"/>edit color</List.Item>
                <List.Item><Icon name="edit"/>indicates editable text</List.Item>
                <List.Item><Icon name="close"/>delete</List.Item>
                <List.Item><Icon name="add"/>create</List.Item>
            </List>
        </div>
    );
}
/* todo
 * améliorer ui (zone editable pas claire, zone draggable trop fine quand le post-it est surchargé,)
 * ajouter alarmes
 */