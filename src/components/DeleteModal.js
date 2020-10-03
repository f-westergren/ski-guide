import React, { useState } from 'react';
import { Button, Modal, ModalFooter } from 'reactstrap';

const DeleteModal = ({ btnText, remove, className='' }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleClick = () => {
    remove();
    toggle();
  }

  return(
    <>
    <Button className={className} color="danger" onClick={toggle}>{btnText}</Button>
    <Modal isOpen={modal} toggle={toggle}>
      <h4 className="text-center">Are you sure?</h4>
      <ModalFooter>
        <Button color="danger" onClick={handleClick}>Delete</Button>
        <Button outline color="danger" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
    </>
  )
}

export default DeleteModal;