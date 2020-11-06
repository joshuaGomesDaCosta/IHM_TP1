import React from 'react';
import NotesBoard from './Stickies'

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
        "isDraggable": false
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
        "isDraggable": false
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
        notes: [],
        showTape: false,
        showOutput: false,
        showTitle: true,
        showFooter: true,
        output: '',
        colors: ['#FFFFFF'],
        showCustomColors: false,
        showMock: false
      };
      this.toggleValue = this.toggleValue.bind(this);
      this.onChange = this.onChange.bind(this);
      this.fetchMock = this.fetchMock.bind(this);
    }
  
    toggleValue(e) {
      this.setState({
        [e.target.name]: !this.state[e.target.name]
      });
    }
  
    onChange(notes) {
      this.setState({
        output: JSON.stringify(notes, null, 2),
        notes
      });
    }
  
    fetchMock() {
      this.setState({
        showMock: true
      }, () => {
        this.setState({
          notes: mock
        });
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
        <div>
          <div className="header">
            React Stickies - Sticky Notes for React
          </div>
          <NotesBoard
            notes={this.state.notes}
            onChange={this.onChange}
            />
          <div className="config">
            <form>
              <input type="radio" name="showCustomColors" value="show_custom_colors" checked={this.state.showCustomColors} onClick={this.toggleValue} />Custom Colors
              <input type="radio" name="showTape" value="show_tape" checked={this.state.showTape} onClick={this.toggleValue} />Show Tape
              <input type="radio" name="showOutput" value="show_output" checked={this.state.showOutput} onClick={this.toggleValue} />Show Output
              <input type="radio" name="showTitle" value="show_title" checked={this.state.showTitle} onClick={this.toggleValue} />Show Title
              <input type="radio" name="showFooter" value="show_footer" checked={this.state.showFooter} onClick={this.toggleValue} />Show Footer
              <input type="radio" name="showMock" value="show_mock" checked={this.state.showMock} onClick={this.fetchMock} />Load Mock Data
            </form>
            <div className="output" style={{ display: this.state.showOutput ? 'block' : 'none' }}>
              <label className="note-header">Output JSON</label>
              <div>
                <pre>
                  {this.state.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      );
    }
}