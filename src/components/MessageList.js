import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
  import SkiGuideApi from '../SkiGuideApi';
  import { useAuth } from './context/auth';
  import getIdFromToken from '../utils';
  import MessageCard from './MessageCard';

const MessageList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([])

  const { authToken } = useAuth();

  const userId = getIdFromToken(authToken)

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await SkiGuideApi.getMessages();      
        setMessages(res)
        setIsLoading(false);
      } catch (err) {
        setError(true)
        setIsLoading(false);
      }
    }
    getMessages()
  }, [userId])

  // const handleSubmit = async e => {
  //   e.preventDefault()
  //     try {
  //       console.log("THINGS", userId, formData)
  //       await SkiGuideApi.update(userId, formData)
  //       setIsUpdating(false)
  //     } catch (err) {
  //       err[0] === 'Invalid Credentials' ? setError(err[0]) : setError('Invalid or missing input')
  //       setTimeout(function(){ setError(false) }, 3000);
  //     }
  // }
  
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p>Can't load user.</p>
      </div>
    )
  }

  return (
    <Container className='profile mt-5 p-4' style={{ backgroundColor: '#fff',  borderRadius: '10px' }}>
      <Row>
        <Col>
        <h2 className="text-center">Inbox</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Received</h4>
        </Col>
      </Row>
      {messages.received.map(message => (
        <Row>
        <Col>
          <MessageCard
            content={message.content}
            time_stamp={message.time_stamp}
            first_name={message.first_name}
            id={message.id} />
        </Col>
        </Row>
      ))}
      <Row className="mt-4">
        <Col>
          <h4>Sent</h4>
        </Col>
      </Row>      
      {messages.sent.map(message => (
        <Row>
        <Col>
          <MessageCard
            sent={true}
            content={message.content}
            time_stamp={message.time_stamp}
            first_name={message.first_name}
            id={message.id} />
        </Col>
        </Row>
      ))}      
    </Container>
  )
}

export default MessageList;