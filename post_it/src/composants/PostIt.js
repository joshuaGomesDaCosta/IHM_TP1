import React from 'react';
//import ReactGridLayout from 'react-grid-layout';
import RGL, { WidthProvider } from 'react-grid-layout';
import _ from "lodash";
import semanticUIReact from 'semantic-ui-css/semantic.min.css';

const { Container, Divider, Dropdown, Segment, Form, Input, Modal, Button, Header, Icon, Textarea} = semanticUIReact;
const ReactGridLayout = WidthProvider(RGL);


class Postit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {postTitle: '', postBody: ''};
    this.titleChange = this.titleChange.bind(this);
    this.bodyChange = this.bodyChange.bind(this);
  }

  titleChange(event) {
    this.setState({postTitle: event.target.value});
  }
  bodyChange(event) {
    this.setState({postBody: event.target.value});
  }

  render() {
    return (
      <div className="postit">
        
      </div>
    );
  }
}

class MyFirstGrid extends React.Component {

    static defaultProps = {
        className: "layout",
        cols: 12,
        rowHeight: 30,
        onLayoutChange: function() {},
        // This turns off compaction so you can place items wherever.
        verticalCompact: false
    };

    constructor(props) {
        super(props);
    
        const layout = this.generateLayout();
        this.state = { layout };
    }


    generateDOM() {
        return _.map(_.range(notes), function(i) {
            return (
                    {i}
            );
        });
    }

    generateLayout() {
        const p = this.props;
        return _.map(new Array(p.items), function(item, i) {
            const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
            return {
                x: (i * 2) % 12,
                y: Math.floor(i / 6) * y,
                w: 2,
                h: y,
                i: i.toString()
            };
        });
    }

    onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    }


  render() {
    
    return (
        <ReactGridLayout 
            layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
        >
        

        <div key="a">
          <Postit />
        </div>
        <div
          key="b"
        >
          <Postit />
        </div>
        <div
          key="c"
        >
          <Postit />
        </div>
      </ReactGridLayout>
    );
  }
}

const notes = [{title: 'hello', body:'stuff'}, {title: 'hello', body:'stuff'}, {title: 'hello', body:'stuff'}, {title: 'hello', body:'stuff'}, {title: 'hello', body:'stuff'}];

/*const noteItems = notes.map(note => 
                           );*/


export default MyFirstGrid;

//ReactDOM.render(<MyFirstGrid />, document.getElementById("app"));
/* see my forked pen for better
ReactDOM.render(<ModalExampleControlled />, document.getElementById("modal"));
*/