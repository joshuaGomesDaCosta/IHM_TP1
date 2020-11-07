import React from 'react';

function Menu(props) {
    return (
        <div className="Menu">
            <p>menu</p>
            <button className='bAddNote' onClick={props.onAddNote}>Add a Note</button>
        </div>
    );
}

export default Menu;