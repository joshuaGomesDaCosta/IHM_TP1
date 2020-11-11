import React from 'react';
import { TextArea, Form, Icon, Rail, Segment, List, Modal, Button, Header} from 'semantic-ui-react';
import ConfirmModal from './ConfirmModal';

import 'semantic-ui-css/semantic.min.css';
import './style.css';

export default class RailCodeCouleur extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: props.notes,
            colors: props.colors,
            openFormAdd: false,
            fields: {
                name: '',
                color: '',
                desc: '',
            },
        }
        this.handleFormAddChange = this.handleFormAddChange.bind(this);
    }

    setOpenFormAdd(isOpen) {
        this.setState({ openFormAdd: isOpen });
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

    handleDelete(colorId){
        let isOk = true;
        this.state.notes.forEach((note) => {
            if (note.colorId === colorId){
                isOk = false;
            }
        });
        if(isOk) {
            this.state.colors.splice(colorId,1);
            this.state.colors.map( color => {
                if (color.id > colorId) {
                    color.id--;
                }
                return color;
            });
            this.state.notes.map( note => {
                if (note.colorId > colorId) {
                    note.colorId--;
                }
                return note;
            });
            this.setState({
                colors: this.state.colors,
                notes: this.state.notes,
            });
        }
        else {
            alert('not allowed');
        }
    }

    renderFormAddModal(){
        return (
            <Modal
                onClose={() => this.setOpenFormAdd(false)}
                onOpen={() => this.setOpenFormAdd(true)}
                open={this.state.openFormAdd}
                trigger={<Button color='blue' icon='add' content='Create a color'/>}
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
                                this.setOpenFormAdd(false);
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
                                
                                this.setState({
                                    fields: { color: '', name: '', desc: '' },
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
                        onClick={() => this.setOpenFormAdd(false)}
                        negative
                    />       
                </Modal.Actions>
            </Modal>
        );
    }

    renderClose(colorId) {
        if(colorId > 3) {
            return (
                <List.Content floated='right'>
                    <ConfirmModal trigger={<Icon name='close'/>} onConfirm={() => this.handleDelete(colorId)}/>
                </List.Content>
            );
        }
        return (<div></div>);
    }

    render() {
        return (
            <Rail close position='right'>
                <Segment>
                    <Header>Your color code</Header>
                    <List divided>
                        {this.state.colors.map( (color) => {
                            return (
                                <List.Item>
                                    { this.renderClose(color.id)}
                                    <List.Content>
                                        <List.Header >
                                            <List.Icon position='left' name='circle thin' style={{color:color.color}}/>
                                            {color.name}
                                        </List.Header>
                                        <List.Description>
                                            <TextArea
                                                className='editable'
                                                rows={1}
                                                maxLength={40}
                                                value={color.desc}
                                                onChange={ (e) => this.handleChange(e, color)}
                                            />
                                            <List.Icon color='grey' size='small' corner='top left' name='edit'/>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            );
                        })}
                    </List>
                    {this.renderFormAddModal()}
                </Segment>
            </Rail>
        );
    }
}
