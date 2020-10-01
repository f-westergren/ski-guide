import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import SkiGuideApi from '../SkiGuideApi';

const MessageModal = ({ btnText, id }) => {
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleChange = e => {
    setMessage(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await SkiGuideApi.newMessage({
        'to_user_id': id,
        'content': message
      })
      toggle();
    } catch (err) {
      setIsError(true)
    }
  }
  
  return(
    <>
    <Button className="text-uppercase" color="success" onClick={toggle}>{btnText}</Button>
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>
        Create Message
      </ModalHeader>
      <Form className="m-2" onSubmit={handleSubmit}>
      <FormGroup>
        <Input 
          type="textarea" 
          name="content" 
          onChange={handleChange}
          id="content" />
      </FormGroup>
      <ModalFooter>
        <Button>Submit</Button>
        <Button color="danger" onClick={toggle}>Cancel</Button>
      </ModalFooter>
      
      {isError && <span className="text-danger">Can't send message.</span>}
    </Form>

    </Modal>
    </>
  )
}

export default MessageModal;