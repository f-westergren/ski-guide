import React, { useState } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import SkiGuideApi from '../SkiGuideApi';

const ReservationCard = ({ id, first_name, date, confirmed, guide }) => {
  const [isConfirmed, setIsConfirmed] = useState(confirmed);
  const [error, setError] = useState(false);
  const [canceled, setCanceled] = useState(false);

  const confirm = async e => {
    e.preventDefault();
    try {
      setError(false);
      await SkiGuideApi.updateReservation(id, { is_confirmed: true })
      setIsConfirmed(true);
    } catch (err) {
      setError("Can't confirm reservation right now.")
    }
  }

  const cancel = async e => {
    e.preventDefault();
    try {
      setError(false);
      await SkiGuideApi.deleteReservation(id)
      setCanceled("Reservation canceled")
    } catch (err) {
      setError("Can't cancel reservation right now.")
    }
  }

  return (
    <Card className='mt-2'>
      <CardBody>
        <h6>Reservation with {first_name} on {date.slice(0, 10)}</h6>
        {!isConfirmed && <small className="font-italic">Awaiting confirmation from Guide</small>}
        <Button 
          className="float-right" 
          color="danger" 
          onClick={cancel} 
          disabled={canceled === 'Reservation canceled'}
        >
          Cancel
        </Button> 
        {guide &&       
        <Button 
          className="float-right mr-2" 
          color="primary" 
          onClick={confirm}
          disabled={isConfirmed}
        >
          {isConfirmed ? 'Confirmed' : 'Confirm'}
        </Button> }
        {error && <small className="text-danger">{error}</small>}      
        {canceled && <small className="text-danger">{canceled}</small>}      
      </CardBody>
    </Card>
  )
}

export default ReservationCard;