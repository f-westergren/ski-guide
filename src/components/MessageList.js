import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import SkiGuideApi from '../SkiGuideApi';
import MessageCard from './MessageCard';

const MessageList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await SkiGuideApi.getMessages();      
        setMessages(res)
        setIsLoading(false);
      } catch (err) {
        setIsError(true)
        setIsLoading(false);
      }
    }
    getMessages()
  }, [])
  
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center mt-5">
        <p>Can't load messages right now.</p>
      </div>
    )
  }

  return (
    <Container className='profile mt-5 p-4 main-container'>
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
      {!messages.received.length && <p>No messages.</p>}
      {messages.received.map(message => (
        <Row>
        <Col>
          <MessageCard
            key={message.id}
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
      {!messages.sent.length && <p>No messages.</p>}      
      {messages.sent.map(message => (
        <Row>
        <Col>
          <MessageCard
            key={message.id}
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