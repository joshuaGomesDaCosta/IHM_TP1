import React from 'react';
import PostIt from './PostIt';
import ReactStickies from 'react-stickies'

class Page extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            postIts: [
                {
                    key: 0,
                    text: "do IHM Project to have good mark",
                    color: "Red",
                },
                {
                    key: 1,
                    text: "Hello world",
                    color: "Green",
                },
                {
                    key: 2,
                    text: "viiiiiite moin d'une semaine",
                    color: "Yellow",
                },
            ],
            colors: [],
        }
    } 

    addPostIt(text,colorId){
        this.setState({
            postIts: this.state.postIts.push({
                key: this.state.num,
                text: text,
                color: this.state.colors[colorId]
            }),
            num: this.state.num + 1,
        });
    }

    style = {
        display: 'block',
        width: "800px",
        height: "400px",
    };

    handleCloseClick(postItId){
        console.log("close");
        this.setState({
            postIts: this.state.postIts.pop(postItId),
        });
    }

    render(){
        let listItem = this.state.postIts.map( postIt => {
            return <PostIt key={postIt.key} text={postIt.text} color={postIt.color}/>;
        });
        return(
            <div style={this.style}>
                {listItem}
            </div>
        )

    }
}

export default Page;