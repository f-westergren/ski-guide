import React from 'react';
import { Card, CardBody, CardLink } from 'reactstrap';

const GuideCard = ({ id, first_name, image_url, type, rating, location }) => {
  
  return (
    <Card className="mt-2">
      <CardBody>
        <h6 className="d-flex justify-content-between">
          <span className="text-capitalize">{first_name}</span>
          <img className="thumbnail"
            src={image_url || 
            '/placeholder.jpg'} 
            height="50px" 
            alt={`${first_name}`} 
          />  
        </h6>
        <p>Location: {location}</p>
        <p className="text-capitalize">{type.join(', ')}</p>
        <span>{rating ? `Rating: ${rating}/5` : 'No reviews yet'}</span>
      </CardBody>
      <CardLink className="stretched-link" href={`/guides/${id}`}/>
    </Card>
  )
}

export default GuideCard