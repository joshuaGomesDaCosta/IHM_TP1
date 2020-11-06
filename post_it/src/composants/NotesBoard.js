import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import semanticUIReact from 'semantic-ui-css/semantic.min.css';
import './postIt.css'

const { Container, Divider, Dropdown, Segment, Form, Input, Modal, Button, Header, Icon, Textarea} = semanticUIReact;

export default class NotesBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id:0,
          grid:{ x: 0, y: 0, w: .9, h: 1 },
          title: "Hello World",
          text: 'IHM project is  WIP',
          color: 'green',
        },
        {
          id:1,
          grid:{ x: 0, y: 0, w: .9, h: 1 },
          title: "IHM Project",
          text: 'take care of the UI',
          color: 'green',
        },
        {
          id:2,
          grid:{ x: 0, y: 0, w: .9, h: 1 },
          title: "Coucou",
          text: 'Well done!',
          color: 'green',
        },
      ]

    };
    this.renderNote = this.renderNote.bind(this);
  }

deleteNote(currentNote) {
    const notes = this.state.notes;
    notes.forEach((note, index) => {
      if (currentNote.key === note.key) {
        notes.splice(index, 1);
      }
    });
    this.setState({
      notes
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.notes, 'delete');
        if (typeof this.props.onDelete === 'function') {
          this.props.onDelete(currentNote);
        }
      }
    });
  }


  renderNote(note) {
    return (
      <div key={note.id} data-grid={note.grid} className='note'>
          <div className="note-header">
            <div className="title">
              {note.title}
            </div>
            <div className="note-close" onClick={() => this.deleteNote(note)}></div>
          </div>
          <div className="note-body">
            {note.text}
          </div>
          <div className="note-footer">
          </div>
      </div>
    );
  }

  render() {
    return (
      <ReactGridLayout
        className="layout"
        cols={6}
        rowHeight={100}
        width={1200}
        isDraggable='true'
        isResizable='false'
        draggableCancel="input, textarea, div.note-close"
        compactType="horizontal"
      >
        {this.state.notes.length !== 0 ? this.state.notes.map( this.renderNote):<p>pas de post-It</p>}
      </ReactGridLayout>
    );
  }
}