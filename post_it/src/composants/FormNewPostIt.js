import React from 'react';
import { Form, Modal, Button} from 'semantic-ui-react';

export default class FormNewPostIt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            fields: {
                title: '',
                text: '',
                color: '#FFF',
            },
        }
        this.setOpen = this.setOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setOpen(isOpen) {
        this.setState({ open: isOpen });
    } 

    handleChange(e, {name,value}) {
        const newFields = { ...this.state.fields, [name]: value };
        this.setState({ fields: newFields });
    };

    handleSubmit (e) {
        alert("hey");
        this.props.onSubmit(this.state.fields);
        /*
        const res = await fetch({ url: 'localhost:3000', method: "POST", body: this.state.fields });
        const data = await res.json();
        return data;*/
    };

    render() {
        //const options = this.props.colors.map( (color) => {return { key: color, value: color, text: color }}).toArray();
        const options = [
            { key: 'af', value: 'af', text: 'Afghanistan' },
            { key: 'ax', value: 'ax', text: 'Aland Islands' },
            { key: 'al', value: 'al', text: 'Albania' },
        ];
        return (
            
            <Modal
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.open}
                trigger={<Button>Create a note</Button>}
              >
                <Modal.Header>Create a note</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input 
                            label='Title'
                            name='title'
                            placeholder='title' 
                            onChange={this.handleChange}
                        />
                        <Form.TextArea 
                            label='Text'
                            name='text' 
                            placeholder='type the text here...'
                            onChange={this.handleChange}
                        />
                        <Form.Select 
                            label='Color'
                            name='color'
                            placeholder='Color'
                            options={options}
                            onChange={this.handleChange}
                        />
                        <Button
                            color='green'
                            content="Create"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={() => this.setOpen(false)}
                            positive
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='red'
                        content="Cancel"
                        labelPosition='right'
                        icon='cancel'
                        onClick={() => this.setOpen(false)}
                        negative
                    />       
                </Modal.Actions>
            </Modal>
        );
    } 
}