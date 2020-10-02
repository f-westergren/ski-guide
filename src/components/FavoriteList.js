import React, { useState, useEffect } from 'react';
import { Spinner, Container } from 'reactstrap';
import FavoriteCard from './FavoriteCard';
import SkiGuideApi from '../SkiGuideApi';

const FavoriteList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [favorites, setFavorites] = useState([])
  
  useEffect(() => {
    
      const fetchFavorites = async () => {
        try {
          const res = await SkiGuideApi.getFavorites();
          setFavorites(res.favorites)
          setIsLoading(false);
        } catch (err) {
          setIsError(true)
          setIsLoading(false);
        }
      }
      fetchFavorites();
  }, [])
  
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <h4 className="text-white text-center mt-5">Can't get favorites.</h4>
    )
  }

  return (
    <Container className='profile mt-5 p-4 main-container'>
      <h2 className="text-center">Favorites</h2>
      {!favorites.length && <p className="text-center">You have no favorites yet :(</p>}
      {favorites.map(fav => (
        <FavoriteCard 
          first_name={fav.first_name}
          image_url={fav.image_url}
          location={fav.location}
          guideId={fav.guide_id}
          key={fav.id}
          id={fav.id}
        />
      ))}
    </Container>
  )
}

export default FavoriteList