import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';

const ReservationCard = ({ guide_id, first_name, date }) => {
  
  return (
    <Card className="mt-2">
      <CardBody>
        <h6>Reservation with {first_name} on {date}</h6>
        <Button className="float-right" color="danger" onClick="">Cancel</Button>       
        <Button className="float-right mr-2" color="primary" onClick="">Confirm</Button>       
      </CardBody>
    </Card>
  )
}

export default ReservationCard