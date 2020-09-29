import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { Col, Row, Button, Form, FormGroup, Input } from 'reactstrap';
import SkiGuideApi from '../SkiGuideApi';
import GuideList from './GuideList';
import WeatherCard from './WeatherCard';

const Search = () => {
  const [guides, setGuides] = useState(['start']);
  const [isError, setIsError] = useState(false);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 37.9374939, lng: -107.8122852 })

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setCoordinates(latLng);
    } catch(err) {
      console.log('ERROR', err)
    }

  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await SkiGuideApi.getGuides({ latitude: coordinates.lat, longitude: coordinates.lng })
      setGuides(result.guides)
    } catch (err) {
      setIsError(true);
    }
  }

  return (
    <div className="background">
      <div className="container mt-3">
      <Row>
        <Col />
        <Col>
          <WeatherCard latitude={coordinates.lat} longitude={coordinates.lng} />
        </Col>
        <Col />
      </Row>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Row form>
        <Col md={6}>
            <FormGroup>
              <PlacesAutocomplete 
                value={address} 
                onChange={setAddress} 
                onSelect={handleSelect}
              >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <>
                  <Input 
                    type="search"
                    name="search"
                    id="search"
                    required
                    {...getInputProps({ placeholder: "Enter location" })} />
                  <div>
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map((suggestion) => {
                      const style = suggestion.active 
                        ? { backgroundColor: "#41b6e6", cursor: "pointer" } 
                        : { backgroundColor: "#fff", cursor: "pointer" }           
                      return <div 
                        {...getSuggestionItemProps(suggestion, { style })} 
                        key={suggestion.placeId}>{suggestion.description}
                      </div>
                    })}
                  </div>
                </>
              )}
              </PlacesAutocomplete>
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Input type="date" name="date" id="date" />
            </FormGroup>
          </Col>
        <Col md={1}>
        <Button className="float-right" color="primary">Search</Button>
        </Col>
        </Row>
        {isError && <span className="text-danger">Can't search right now.</span>}
      </Form>
        
      {guides.length === 0 && 
        <h4 className="text-white text-center mt-5">Can't find any guides in that location</h4>
      }
      {guides[0] !== 'start' && guides.length !== 0 && <GuideList guides={guides} />}

      </div>
    </div>
  );
}

export default Search;