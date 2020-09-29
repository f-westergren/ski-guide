import React, { useState, useEffect } from 'react';
import { Spinner, Container } from 'reactstrap';
import ReservationCard from './ReservationCard';
import SkiGuideApi from '../SkiGuideApi';

const ReservationList = () => {
  const [reservations, setReservations] = useState({asUser: '', asGuide: ''});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);



  useEffect(() => {
    const getReservations = async () => {
      try {
        const result = await SkiGuideApi.getReservations();
        setIsLoading(false);
        setReservations(result);
      } catch (err) {
        console.log(err)
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
  console.log(reservations.asUser)
  if (isError) {
    return (
      <h4 className="text-white text-center mt-5">Can't get reservations.</h4>
    )
  }
  return (
    <Container className='profile mt-5 p-4' style={{ backgroundColor: '#fff',  borderRadius: '10px' }}>
      {reservations.asUser && reservations.asUser.map(res => (
        <ReservationCard 
          guide_id={res.guide_id}
          first_name={res.first_name}
          date={res.date}
        />
      ))}
    </Container>
  )
}

export default ReservationList;