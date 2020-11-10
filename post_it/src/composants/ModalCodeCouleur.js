import React from 'react';
import { Form, Icon, Rail, Segment, List, Input, Modal, Button, Header} from 'semantic-ui-react';
import ContentEditable from './ContentEditable';

export default class ModalCodeCouleur extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            colors: props.colors,
        }
        this.setOpen = this.setOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    setOpen(isOpen) {
        this.setState({ open: isOpen });
    } 

    handleChange(e, color) {
        color.desc=e.target.value;
        this.setState({
            colors: this.state.colors,
        });
        this.handleChange = this.handleChange.bind(this);
    };
    
    render() {
        return(
            <Modal
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.openConfirmDelete}
                trigger={<Button content='Voir votre code couleur'/>}
            >
            <Modal.Header>Your Color Code</Modal.Header>
            <Modal.Content>
                <List divided relaxed>
                    {this.state.colors.map( (color) => {
                        return (
                            <List.Item>
                                <List.Content floated='right'>
                                    <Icon name='delete' onClick={ () => alert('delete')}/>
                                </List.Content>
                                <List.Content>
                                    <List.Header style={{color:color.color}}>{color.name}</List.Header>
                                    <List.Description ><Input value = {color.desc} onChange={(e) => this.handleChange(e, color)}/></List.Description>
                                </List.Content>
                            </List.Item>
                        );
                    })}
                </List>
                <Icon name='plus' onClick={ () => alert('add')}/>
            </Modal.Content>
            </Modal>
        );
    }
}


export class RailCodeCouleur extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: props.colors,
            open: false,
            fields: {
                name: '',
                color: '',
                desc: '',
            },
        }

        this.renderFormAdd = this.renderFormAdd.bind(this);
        this.handleFormAddChange = this.handleFormAddChange.bind(this);
    }

    setOpen(isOpen) {
        this.setState({ open: isOpen });
    } 

    handleChange(e, color) {
        color.desc=e.target.value;
        this.setState({
            colors: this.state.colors,
        });
    };

    handleFormAddChange(e, {name, value}) {
        const newFields = { ...this.state.fields, [name]: value };
        this.setState({ fields: newFields });
    }

    renderFormAdd(){
        return (
            <Modal
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.open}
                trigger={<Icon name='add'/>}
              >
                <Modal.Header>Create a color</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input 
                            label='Name'
                            name='name'
                            placeholder='Name of your color' 
                            onChange={this.handleFormAddChange}
                        />
                        <Form.Input 
                            label='Color'
                            name='color' 
                            placeholder='exemple: #FFFF00'
                            onChange={this.handleFormAddChange}
                        />
                        <Form.Input 
                            label='Description'
                            name='desc' 
                            placeholder='description of the color'
                            onChange={this.handleFormAddChange}
                        />
                        <Form.Button
                            type='submit'
                            color='green'
                            content="Create"
                            icon='checkmark'
                            onClick={ () => {
                                const color = {
                                    id: this.state.colors.length,
                                    color: this.state.fields.color,
                                    name: this.state.fields.name,
                                    desc: this.state.fields.desc,
                                }
                                this.state.colors.push(color);
                                this.setState({
                                    colors: this.state.colors,
                                });

                                this.setOpen(false);
                                this.setState({
                                    fields: { title: '', text: '', colorId: 0 },
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

    render() {
        return (
            <Rail position='right'>
                <Segment>
                    <Header>Your color code</Header>
                    <List divided relaxed>
                        {this.state.colors.map( (color) => {
                                return (
                                    <List.Item>
                                        <List.Content floated='right'>
                                            <Icon name='delete' onClick={ () => alert('delete')}/>
                                        </List.Content>
                                        <List.Content>
                                            <List.Header style={{color:color.color}}>{color.name}</List.Header>
                                            <List.Description ><ContentEditable html = {color.desc} onChange={(e) => this.handleChange(e, color)}/></List.Description>
                                        </List.Content>
                                    </List.Item>
                                );
                            })}
                    </List>
                    {this.renderFormAdd()}
                </Segment>
            </Rail>
        );
    }
}
