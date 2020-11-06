import React from 'react';
import NotesBoard from './NotesBoard';

const mock = [
    {
      "id": "3effea2c-fc90-98e0-51d0-22c32efb2177",
      "text": "Hey I am Ajain... ",
      "title": "Hello",
      "grid": {
        "i": "3effea2c-fc90-98e0-51d0-22c32efb2177",
        "x": 0,
        "y": null,
        "w": 2,
        "h" : 2,
        "isResizable": false
      },
      "contentEditable": true,
      "timeStamp": "13 Feb 2017 2:53 PM"
    },
    {
      "id": "3effea2c-fc90-98e0-51d0-22c32efb2178",
      "text": "If you liked stickies... contribute by liking it... ",
      "title": "Contribute",
      "grid": {
        "i": "3effea2c-fc90-98e0-51d0-22c32efb2178",
        "x": 4,
        "y": 0,
        "w": 4,
        "h" : 4,
        "isResizable": false
      },
      "contentEditable": true,
      "timeStamp": "13 Feb 2017 2:53 PM"
    }
  ]

export default class Page extends React.Component {  
    static defaultProps = {};
  
    constructor(props) {
      super(props);
  
      this.state = {
        notes: mock,
        showTape: false,
        showOutput: false,
        showTitle: true,
        showFooter: true,
        output: '',
        colors: ['#FFFFFF'],
        showCustomColors: false,
        showMock: false
      };

      this.onChange = this.onChange.bind(this);
    }
  
    onChange(notes) {
      this.setState({
        output: JSON.stringify(notes, null, 2),
        notes
      });
    }
  
    render() {
      let wrapperStyle = {};
      if (this.state.showBound) {
        wrapperStyle = {
          height: '700px',
          width: '700px',
          background: 'rgba(0, 0, 0, 0.2)',
          border: '2px solid #fff',
          overflow: 'auto',
          padding: '10px'
        };
      }
      return (
          <NotesBoard
            notes={this.state.notes}
            onChange={this.onChange}
        />
      );
    }
}