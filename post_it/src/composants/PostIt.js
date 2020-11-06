import React from 'react';
import Draggable from 'react-draggable'
import ContentEditable from './ContentEditable'
import './postIt.css';

export default class PostIt extends React.Component {
  static #num = 0;
  static #list = [];

  static getList(){
    return PostIt.#list;
  }

  constructor( props) {
    super(props);
    this.state = {
      title: props.title,
      text: props.text,
      color: props.color,
    };

    this.id = PostIt.#num++;
    this.coordX = 0;
    this.coordY = 0;
    PostIt.#list.push(this);
  }

  getText() {
    return this.state.text;
  }

  getColor() {
    return this.state.color;
  }

  handleTitleChange(html) {
    this.setState({
      title: html
    }, () => {
      if (this.props.onTitleChange) {
        this.props.onTitleChange(html);
      }
    });
  }

  handleTextChange(html) {
    this.setState({
      text: html
    }, () => {
      if (this.props.onTextChange) {
        this.props.onTextChange(html);
      }
    });
  }

  render(){
    const closeStyle = Object.assign({}, {
      float: 'right',
    }, this.props.closeStyle || {});

    const closeIcon = 'X';
    
    const noteStyle = Object.assign({}, {
      display: "block",
      background: this.state.color,
      color: "black",
      width: "100px",
      padding: "10px",
      fontFamily: "Arial",
      boxShadow: "3px 3px 1px 1px #9E9E9E",
    }, this.props.noteStyle || {});
    
    const noteHeaderStyle = Object.assign({}, {
      display: 'block'
    }, this.props.noteHeaderStyle || {});
    
    const noteBodyStyle = Object.assign({}, {
      display: 'block'
    }, this.props.noteBodyStyle || {});
    
    const noteTitleStyle = Object.assign({}, {
      display: 'block'
    }, this.props.noteTitleStyle || {});
    
    const noteFooterStyle = Object.assign({}, {
      display: 'block'
    }, this.props.noteFooterStyle || {});

    return (
      <Draggable 
        allowAnyClick='true'
        bounds='parent'
      >
        <div className="note" style={noteStyle}>
          <div className="note-header" style={noteHeaderStyle}>
            <div 
            className="title"
            style={noteTitleStyle}
            >
              {this.state.title}
            </div>
            <button
              className='close'
              onClick={() => this.props.onCloseClick}
              style={closeStyle}
            >
              {closeIcon}
            </button>
          </div>
          <div 
            className="note-body"
            style={noteBodyStyle}
          >
            {this.state.text}
          </div>
          <div
            className="note-footer"
            style={noteFooterStyle}
          >
          </div>
        </div>
      </Draggable>
    );
  }
}