import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import Menu from './Menu';
import Moment from 'moment';
import ContentEditable from './ContentEditable';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'semantic-ui-css/semantic.min.css';
import { Modal, Button} from 'semantic-ui-react';

import './postIt.css'


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

/**
* @method: tranformEditorState
* @desc: Tranforms the text to editor state
**/
function transformEditorState(notes) {
  const notesData = notes.default || notes;
  const data = notesData.map((note) => {
    const text = note.default ? note.default.text : note.text || '';
    note.editorState = note.editorState || EditorState.createWithContent(ContentState.createFromText(text));
    return note;
  });
  return data;
}

/**
* @method: transformContentState
* @desc: Tranforms editor state to text content
**/
function transformContentState(notes) {
  const clonedNotes = Object.assign([], notes);
  const data = clonedNotes.map( (note) => {
    const text = note.editorState.getCurrentContent().getPlainText();
    note.text = text;
    return note;
  });
  return data;
}

export default class NotesBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFormat: 'lll',
      showEditableBorder: this.props.showEditableBorder || false,
      colors: [
        {
          id: guid(),
          color: "green",
          name: "Green",
          desc: "tache pas importante",
        },
        {
          id: guid(),
          color: "yellow",
          name: "Yellow",
          desc: "tache peu importante",
        },
        {
          id: guid(),
          color: "orange",
          name: "Orange",
          desc: "tache importante",
        },
        {
          id: guid(),
          color: "red",
          name: "Red",
          desc: "tache très importante",
        },
      ],
      notes: transformEditorState([
        {
          id: guid(),
          grid: { x: 0, y: 0, w: 1, h: 1 },
          title: "Hello World",
          text: 'IHM project is  WIP',
          color: 'green',
          editorState: EditorState.createWithContent(ContentState.createFromText('IHM project is  WIP')),
          //timeStamp: Moment().format(this.state.dateFormat),
          contentEditable: true,
        },
        {
          id: guid(),
          grid: { x: 0, y: 0, w: 1, h: 1 },
          title: "IHM Project",
          text: 'take care of the UI',
          color: 'yellow',
          editorState: EditorState.createWithContent(ContentState.createFromText('take care of the UI')),
          //timeStamp: Moment().format(this.state.dateFormat),
          contentEditable: true,
        },
        {
          id: guid(),
          grid:{ x: 0, y: 0, w: 1, h: 1 },
          title: "Coucou",
          text: 'Well done!',
          color: 'orange',
          editorState: EditorState.createWithContent(ContentState.createFromText('Well done!')),
          //timeStamp: Moment().format(this.state.dateFormat),
          contentEditable: true,
        },
      ]),
    };

    this.handleFormAddNote = this.handleFormAddNote.bind(this);
    this.renderNote = this.renderNote.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notes && nextProps.notes.length) {
      this.setState({
        notes: transformEditorState(nextProps.notes)
      });
    }
    this.setState({
      colors: [],
      //dateFormat: nextProps.dateFormat || 'lll'
    });
  }

  handleFormAddNote(newNote) {
    const grid = {};
    const uid = guid();
    const note = {
      grid: {
        i: `${uid}`,
        x: 0,
        y: Infinity, // puts it at the bottom
        w: grid.w || 1,
        h: grid.h || 1
      },
      id: uid,
      title: newNote.title.length === 0 ? 'New note' : newNote.title,
      text: newNote.text.length === 0 ? 'Click here to edit...' : newNote.text,
      color: newNote.color.length === 0 ? 'green' : newNote.color,
      editorState: EditorState.createWithContent(ContentState.createFromText(newNote.text)),
      //timeStamp: Moment().format(this.state.dateFormat),
      contentEditable: true,
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

  handleDeleteNote(currentNote) {
    this.setOpenConfimDelete(false);
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

  onLayoutChange(layout) {
    const notes = this.state.notes;
    notes.forEach((note) => {
      layout.forEach((grid) => {
        if (grid.i === note.id) {
          note.grid = grid;
        }
      });
    });
    this.setState({
      notes
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.notes, 'layout');
        if (typeof this.props.onLayoutChange === 'function') {
          this.props.onLayoutChange(layout);
        }
      }
    });
  }

  handleTextChange(editorState, currentNote) {
    const notes = this.state.notes;
    //const dateFormat = this.state.dateFormat;
    notes.forEach((note) => {
      if (currentNote.id === note.id) {
        note.editorState = editorState;
        //note.timeStamp = Moment().format(dateFormat);
      }
    });
    this.setState({
      notes
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(transformContentState(this.state.notes), 'update');
      }
    });
  }

  handleTitleChange(html, currentNote) {
    const notes = this.state.notes;
    notes.forEach((note) => {
      if (currentNote.id === note.id) {
        note.title = html.target.value;
      }
    });
    this.setState({
      notes
    }, () => {
      if (this.props.onTitleChange) {
        this.props.onTitleChange(html, currentNote);
      }
    });
  }

  setOpenConfimDelete(isOpen) {
    this.setState({
      openConfirmDelete : isOpen,
    }); 
  }

  renderClose(note){
    return(
      <Modal
          onClose={() => this.setOpenConfimDelete(false)}
          onOpen={() => this.setOpenConfimDelete(true)}
          open={this.state.openConfirmDelete}
          trigger={<div className='note-close'></div>}
      >
        <Modal.Header>Confirm the suppression</Modal.Header>
        <Modal.Content>
          <Button.Group>
            <Button negative onClick={() => this.setOpenConfimDelete(false)}>Cancel</Button>
            <Button.Or />
            <Button positive onClick={() => this.handleDeleteNote(note)}>Confirm</Button>
          </Button.Group>
        </Modal.Content>
      </Modal>
    );
  }

  renderNote(note) {
    const style = this.state.showEditableBorder ? {border: 'solid 1px black'} : {};
    const styleColor = {backgroundColor: note.color};
    return (
      <div key={note.id} data-grid={note.grid} style={styleColor} className='note'>
          <div className='note-header'>
            <div className='note-title'>
              <ContentEditable
                html={note.title}
                onChange={ (html) => this.handleTitleChange(html, note)}
              />
            </div>
            {this.renderClose(note)}
          </div>
          <div className='note-body' style={style}>
            <Editor
              editorState={note.editorState}
              onChange={editorState => this.handleTextChange(editorState, note)}
              placeholder='Click here to edit...'
            />
          </div>
          <div className='note-footer'>
          </div>
      </div>
    );
  }

  render() {
    return (
      <div className='nimp'>
        <Menu colors={this.state.colors} onFormAddNote={this.handleFormAddNote}/>
        <ReactGridLayout
          className='layout'
          cols={6}
          rowHeight={200}
          width={1200}
          isDraggable='true'
          isResizable='false'
          draggableCancel='div.note-title, div.note-body, div.note-close'
          //compactType="horizontal"
          //verticalCompact="false"
        >
          {this.state.notes.length !== 0 ? this.state.notes.map( this.renderNote):<p>pas de post-It</p>}
        </ReactGridLayout>
      </div>
    );
  }
}
