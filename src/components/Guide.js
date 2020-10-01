import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Button, Spinner} from 'reactstrap';
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
      setIsError(err);
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
    <Container className="main-container mt-5 p-4">
      <Row>
        <Col className="text-center">
          <h4>{`${guide.first_name} ${guide.last_name}`}</h4>
          <br />
          <img 
            className="guide-image" 
            src={guide.image_url || "https://bit.ly/335Iqm0"} 
            alt="Card image cap" 
          />
        </Col>
      </Row>
      <Row>
        <Col>
        <br />
        <ul className='guide-info'>
          <li><b>Location</b>: {guide.location}</li>
          <li><b>Snow Vehicle</b>: {guide.type.join(', ')}</li>
          <li><b>Bio</b>: {guide.bio}</li>
          <li><b>Rating</b>: {guide.avg ? `${guide.avg}/5` : 'No reviews yet'}</li>
        </ul>
          <br />
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
          <MessageModal id={id} btnText='Message' />
        </Col>

      </Row>
  </Container>
  )
}

export default Guide