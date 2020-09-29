import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';

const ReservationCard = ({ guide_id, first_name, date }) => {
  
  return (
    <Card className="mt-2">
      <CardBody>
        <h6>Reservation with {first_name} on {date}</h6>
        <a className="btn btn-danger float-right ml-2" href="/profile">Cancel</a>      
        <Button className="float-right" color="primary" onClick="">Confirm</Button>       
      </CardBody>
    </Card>
  )
}

export default ReservationCard