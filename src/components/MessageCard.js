import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';

const GuideCard = ({ id, content, time_stamp, first_name, image_url, sent=false }) => {

  const dateTime = new Date(time_stamp).toString().slice(0, 24) //Format date and remove timezone
  
  return (
    <Card className="mt-2">
      <CardBody>
        <h6 className="d-flex justify-content-between">
          <span className="text-capitalize">{sent ? 'To: ' : 'From: '}{first_name}</span>
          <small>{dateTime}</small> 
          <img className="thumbnail"
            src={image_url || 
            'https://bit.ly/340DhLe'} 
            height="50px" 
            alt={`${first_name}`} 
          />  
        </h6>
        <span>{content}</span>
        {!sent && 
          <Button 
            className="float-right" 
            color="primary"
            onClick=""
          >
            Reply
          </Button>
        }        
      </CardBody>
    </Card>
  )
}

export default GuideCard