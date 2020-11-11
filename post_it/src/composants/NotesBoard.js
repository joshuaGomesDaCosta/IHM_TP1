import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import Menu from './Menu';
import Moment from 'moment';
import { Editor, EditorState, ContentState, Modifier } from 'draft-js';
import { Dropdown, Input, Grid, Segment, Icon, Header, TextArea} from 'semantic-ui-react';
import RailCodeCouleur from './RailCodeCouleur';
import ConfirmModal from './ConfirmModal';

import 'semantic-ui-css/semantic.min.css';
import './style.css';

export default class NotesBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFormat: 'lll',
      showEditableBorder: this.props.showEditableBorder || false,
      colors: [
        {
          id: 0,
          color: "green",
          name: "Green",
          desc: "tache pas importante",
        },
        {
          id: 1,
          color: "yellow",
          name: "Yellow",
          desc: "tache peu importante",
        },
        {
          id: 2,
          color: "orange",
          name: "Orange",
          desc: "tache importante",
        },
        {
          id: 3,
          color: "red",
          name: "Red",
          desc: "tache très importante",
        },
      ],
      notes: [
        {
          id: 0,
          grid: { x: 0, y: 0, w: 1, h: 1 },
          title: "Hello",
          text: 'You can edit and drag your post-it',
          colorId: 0,
          //timeStamp: Moment().format(this.state.dateFormat),
          contentEditable: true,
        },
      ],
    };

    this.handleFormAddNote = this.handleFormAddNote.bind(this);

    this.renderNote = this.renderNote.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notes && nextProps.notes.length) {
      this.setState({
        notes: nextProps.notes
      });
    }
    this.setState({
      colors: [],
      //dateFormat: nextProps.dateFormat || 'lll'
    });
  }

  handleFormAddNote(newNote) {
    const grid = {};
    const uid = this.state.notes.length;
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
      colorId: newNote.colorId.length === null ? 0 : newNote.colorId,
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

  handleDeleteNote(noteId) {
    this.state.notes.splice(noteId, 1);;
    this.state.notes.forEach((note) => {
      if (note.id > noteId) {
        note.id--;
      }
    });
    this.setState({
      notes: this.state.notes
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.notes, 'delete');
        if (typeof this.props.onDelete === 'function') {
          this.props.onDelete(noteId);
        }
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

  handleTextAreaChange(e, currentNote) {
    const text = e.target.value;
    const array = text.split('\n');
    let lines = array.length;

    array.forEach(el => {
      lines += Math.floor(el.length / 20);
    });

    if (lines < 10) {
      currentNote.text = text;
      currentNote.lines = lines;
      this.setState({
        notes: this.state.notes,
      })
    }
  }

  handleEditColorNote(noteId, colorId) {
    let notes = this.state.notes;
    notes[noteId].colorId = colorId;
    this.setState({
      notes,
    })
  }

  renderNextColor(noteId) {
    return(
      <Dropdown icon='pencil' onClick={() => this.setState({colors:this.state.colors})}>
        <Dropdown.Menu scrolling>
          <Dropdown.Header content='Color'/>
          <Dropdown.Divider/>
          {this.state.colors.map((color) => (
            <Dropdown.Item
              key={color.id}
              text={color.name}
              description={color.desc}
              value={color.id}
              label={{ style: {backgroundColor:color.color}, circular: true, empty: true}}
              onClick={() => this.handleEditColorNote(noteId, color.id)}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

/*
                <Icon name='sync' onClick={ () => {
                note.colorId = (note.colorId + 1) % this.state.colors.length;
                this.setState({
                  notes: this.state.notes,
                });
              }}/>
*/

  renderNote(note) {
    const style = this.state.showEditableBorder ? {border: 'solid 1px black'} : {};
    const styleColor = {backgroundColor: this.state.colors[note.colorId].color};
    return (
      <div key={note.id} data-grid={note.grid} style={styleColor} className='note'>
          <div className='note-header'>
            <div className='note-title'>
              <TextArea
                className='editable'
                placeholder='New Note...'
                rows={1}
                maxLength={20}
                value={note.title}
                onChange={ (text) => this.handleTitleChange(text, note)}/>
            </div>
            <div className='note-nextColor'>
              {this.renderNextColor(note.id)}
            </div>
            <ConfirmModal trigger={<div className='note-close'><Icon name='close'/></div>} onConfirm={() => this.handleDeleteNote(note.id)}/>
          </div>
          <div className='note-body' style={style}>
            <TextArea 
              className='editable'
              placeholder='Click here to edit...'
              rows={note.lines-1}
              maxLength={200}
              value={note.text}
              onChange={ e => this.handleTextAreaChange(e, note)}
            />
          </div>
          <div className='note-footer'>
          </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header><Menu colors={this.state.colors} onFormAddNote={this.handleFormAddNote}/></Header>
        <Grid className="grid" columns={16}>
          <Grid.Column width={12}>
            <Segment>
              <ReactGridLayout
                className='layout'
                cols={6}
                rowHeight={200}
                width={1200}
                isDraggable='true'
                isResizable='false'
                draggableCancel='div.note-title, div.note-body, div.note-close, div.note-nextColor'
                compactType="horizontal"
                verticalCompact="false"
                horizontalCompact="false"
              >
                {this.state.notes.length !== 0 ? this.state.notes.map( this.renderNote):<p>pas de post-It</p>}
              </ReactGridLayout>
              <RailCodeCouleur notes={this.state.notes} colors={this.state.colors}/>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
