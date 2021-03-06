import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Button, Spinner } from 'reactstrap';
import MessageModal from './MessageModal';
import SkiGuideApi from '../SkiGuideApi';
import { useAuth } from './context/auth';
import getFromToken from '../utils';

const Guide = () => {
  const [loadError, setLoadError] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState({});
  const [guide, setGuide] = useState({});
  const [reserved, setReserved] = useState(false)
  const { id } = useParams();
  const { authToken } = useAuth();

  const user = getFromToken(authToken, 'id');

  const createNewReservation = async () => {
    try {
      setError('');
      await SkiGuideApi.newReservation({ guide_id: id })
      setReserved(true);
    } catch (err) {
      setError("Can't create a new reservation right now.");
    }
  }

  const addRemoveFavorite = async () => {
    try {
      setError('');
      if (Object.keys(favorite).length) {
        await SkiGuideApi.deleteFavorite(favorite.id)
        setFavorite({})
      } else {
        const result = await SkiGuideApi.newFavorite(id)
        setFavorite(result)
      }
    } catch (err) {
      setError("Can't do that right now.");
    }
    
  }

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const result = await SkiGuideApi.getGuide(id);
        setGuide(result);
        setIsLoading(false);
      } catch(err) {
        setLoadError(true);
        setIsLoading(false);
      }
    }
    fetchGuide();
  }, [id]);

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const result = await SkiGuideApi.getFavorite(id);
        setFavorite(result);
      } catch (err) {
        // null
      }
    }
    fetchFavorite();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center mt-2">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (loadError) {
    return (
      <h4 className="text-white text-center mt-5">Can't find that guide.</h4>
    )
  }

  return (
    <Container className="main-container mt-5 p-4">
      <Row>
        <Col className="text-center">
          <h4>{`${guide.first_name} ${guide.last_name}`}</h4>
          <br />
          <img 
            className="guide-image img-fluid" 
            src={guide.image_url || "/placeholder.jpg"} 
            alt="guide" 
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
        {user && 
          <>
          <Button 
            className="text-uppercase float-right ml-2"
            id={guide.id}
            onClick={addRemoveFavorite}
          >
            {Object.keys(favorite).length ? 'Remove from favorites': 'Add to favorites'}
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
          </>
        }
        </Col>
      </Row>
      {error && <div className="text-danger text-center">{error}</div>}
  </Container>
  )
}

export default Guide