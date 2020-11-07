import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import semanticUIReact from 'semantic-ui-css/semantic.min.css';
import Menu from './Menu';
import FormNewPostIt from './FormNewPostIt';
import Moment from 'moment';

import './postIt.css'

const { Container, Divider, Dropdown, Segment, Form, Input, Modal, Button, Header, Icon, Textarea} = semanticUIReact;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default class NotesBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id: guid(),
          grid: { x: 0, y: 0, w: .9, h: 1 },
          title: "Hello World",
          text: 'IHM project is  WIP',
          color: 'green',
        },
        {
          id: guid(),
          grid: { x: 0, y: 0, w: .9, h: 1 },
          title: "IHM Project",
          text: 'take care of the UI',
          color: 'green',
        },
        {
          id: guid(),
          grid:{ x: 0, y: 0, w: .9, h: 1 },
          title: "Coucou",
          text: 'Well done!',
          color: 'green',
        },
      ]

    };
    this.addNote = this.addNote.bind(this);
    this.renderNote = this.renderNote.bind(this);
  }

  deleteNote(currentNote) {
    const notes = this.state.notes;
    notes.forEach((note, index) => {
      if (currentNote.id === note.id) {
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

  addNote() {
    const grid = {};
    const uid = guid();
    const note = {
      grid: {
        i: `${uid}`,
        x: Infinity,
        y: Infinity, // puts it at the bottom
        w: grid.w || 2,
        h: grid.h || 2
      },
      id: uid,
      text: 'this a note',
      title: 'New note',
      color: 'green',
    };
    this.setState({
      // Add a new item. It must have a unique key!
      notes: this.state.notes.concat(note),
      // Increment the counter to ensure key is always unique.
    });
    if (typeof this.props.onAdd === 'function') {
      this.props.onAdd(note);
    }
  }

  render() {
    return (
      <div className="nimp">
        <Menu onAddNote={this.addNote}/>
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
        <FormNewPostIt />
      </div>
    );
  }
}
