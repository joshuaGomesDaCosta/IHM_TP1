import React from 'react';
import {Modal, Button} from 'semantic-ui-react';

export default function ConfirmModal(props) {
  const [open, setOpen] = React.useState(false)
  return(
    <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={props.trigger}
    >
      <Modal.Header>Confirm</Modal.Header>
      <Modal.Content>
        <Button.Group>
          <Button negative onClick={() => setOpen(false)}>Cancel</Button>
          <Button.Or />
          <Button positive onClick={() => {setOpen(false); props.onConfirm();}}>Confirm</Button>
        </Button.Group>
      </Modal.Content>
    </Modal>
  );
}