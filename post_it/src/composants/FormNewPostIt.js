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
    }

    setOpen(isOpen) {
        this.setState({ open: isOpen });
    } 

    handleChange(e, {name,value}) {
        const newFields = { ...this.state.fields, [name]: value };
        this.setState({ fields: newFields });
    };

    render() {
        const options = this.props.colors.map( (color) => {
            return { 
                key: color.id,
                value: color.color,
                text: color.name + ': ' + color.desc,
            }
        });
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
                        <Form.Button
                            type='submit'
                            color='green'
                            content="Create"
                            icon='checkmark'
                            onClick={ () => {
                                this.props.onSubmit(this.state.fields);
                                this.setOpen(false);
                                this.setState({
                                    fields: { title: '', text: '', color: '' },
                                });
                            }}
                            positive
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='red'
                        content="Cancel"
                        icon='cancel'
                        onClick={() => this.setOpen(false)}
                        negative
                    />       
                </Modal.Actions>
            </Modal>
        );
    } 
}