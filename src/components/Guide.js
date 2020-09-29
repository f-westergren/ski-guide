import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardImg, Button, Spinner} from 'reactstrap';
import MessageModal from './MessageModal';
import SkiGuideApi from '../SkiGuideApi';

const Guide = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [guide, setGuide] = useState({});
  const [reserved, setReserved] = useState(false)
  const { id } = useParams();

  const getGuide = async () => {
    try {
      const result = await SkiGuideApi.getGuide(id);
      setGuide(result);
      setIsLoading(false);
    } catch(err) {
      setIsError(true);
      setIsLoading(false);
    }
  }

  const createNewReservation = async () => {
    try {
      await SkiGuideApi.newReservation({ guide_id: id })
      setReserved(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getGuide();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center mt-2">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center mt-5">Ooops. Can't find that guide...</div>
    )
  }

  return (
    <div className="container">
      <Card className="mt-4">
       <CardImg top width="100%" src="https://bit.ly/335Iqm0" alt="Card image cap" />
        <CardBody>
          <h6 className="d-flex justify-content-between">{`${guide.first_name} ${guide.last_name}`}</h6>
          <div>Location: {guide.location}</div>
          <div>Snow Vehicle: {guide.type.join(', ')}</div>
          <div>Bio: {guide.bio}</div>
          <div>Rating: {guide.avg ? `${guide.avg}/5` : 'No reviews yet'}</div> 
          <Button 
            className="text-uppercase float-right ml-2"
            id={guide.id}
          >
            Add to favorites
          </Button>
          <Button
            className="text-uppercase float-right ml-2"
            color="primary"
            onClick={createNewReservation}
            disabled={reserved}
          >
            {reserved ? 'Request sent' : 'Request to Book'}
          </Button>
          <MessageModal id={id} />
          
        </CardBody>
      </Card>
    
  </div>
  )
}

export default Guide