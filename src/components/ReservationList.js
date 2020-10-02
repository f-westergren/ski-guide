import React, { useState, useEffect } from 'react';
import { Spinner, Container } from 'reactstrap';
import ReservationCard from './ReservationCard';
import SkiGuideApi from '../SkiGuideApi';

const ReservationList = () => {
  const [reservations, setReservations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getReservations = async () => {
      try {
        const result = await SkiGuideApi.getReservations();
        console.log("RESULT", result);
        setReservations(result);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    getReservations();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (isError) {
    return (
      <h4 className="text-white text-center mt-5">Can't get reservations.</h4>
    )
  }
  return (
    <Container className='profile mt-5 p-4 main-container'>
      <h2 className="text-center">Reservations</h2>
      {!reservations.asUser && <p className="text-center">You have no reservations :(</p>}
      {reservations.asUser.map(res => (
        <ReservationCard 
          first_name={res.first_name}
          date={res.date}
          key={res.id}
          confirmed={res.is_confirmed}
          id={res.id}
          guide={false}
        />
      ))}
      <br />
      {reservations.asGuide && <h4 className="text-center">Guide Reservations</h4>}
      {reservations.asGuide.map(res => (
        <ReservationCard 
          first_name={res.first_name}
          date={res.date}
          key={res.id}
          confirmed={res.is_confirmed}
          id={res.id}
          guide={true}
        />
      ))}
    </Container>
  )
}

export default ReservationList;