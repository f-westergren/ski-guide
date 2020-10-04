import React from 'react';
import { Card, CardBody } from 'reactstrap';
import MessageModal from './MessageModal';

const MessageCard = ({ from_id, content, time_stamp, first_name, image_url, sent=true }) => {

  const dateTime = new Date(time_stamp).toString().slice(0, 24) //Format date and remove timezone
  
  return (
    <Card className="mt-2">
      <CardBody>
        <h6 className="d-flex justify-content-between">
          <span className="text-capitalize">{sent ? 'To: ' : 'From: '}{first_name}</span>
          <small>{dateTime}</small> 
          <img className="thumbnail"
            src={image_url || 
            '/placeholder.jpg'} 
            height="50px" 
            alt={`${first_name}`} 
          />  
        </h6>
        <p>{content}</p>  
        <br />
        {!sent && <MessageModal id={from_id} btnText='Reply' />}
      </CardBody>
        
    </Card>
  )
}

export default MessageCard