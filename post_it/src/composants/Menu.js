import React from 'react';
import FormNewPostIt from './FormNewPostIt';

export default function Menu(props) {
    return (
        <div className="Menu">
            <h1>Welcome to your NoteBoard !</h1>
            <FormNewPostIt colors={props.colors} onSubmit={props.addVote}/>
        </div>
    );
}