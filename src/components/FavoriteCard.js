import React from 'react';
import { Card, CardBody, CardLink } from 'reactstrap';

const FavoriteCard = ({ guideId, first_name, image_url, location }) => {

  return (
    <Card className="mt-2">
      <CardBody>
        <h6 className="d-flex justify-content-between">
          <span className="text-capitalize">{first_name}</span>
          <img className="thumbnail"
            src={image_url || 
            'https://bit.ly/335Iqm0'} 
            height="50px" 
            alt={`${first_name}`} 
          />  
        </h6>
        <p>Location: {location}</p>
      </CardBody>

      <CardLink className="stretched-link" href={`/guides/${guideId}`}/>
    </Card>
  )
}

export default FavoriteCard