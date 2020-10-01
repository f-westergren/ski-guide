import React, { useState } from 'react';
import { Col, Row, Button, Form, FormGroup, Input, Container } from 'reactstrap';
import SkiGuideApi from '../SkiGuideApi';
import GuideList from './GuideList';
import WeatherCard from './WeatherCard';
import AutoCompleteSearch from './AutoCompleteSearch';

const Search = () => {
  const [guides, setGuides] = useState(['start']);
  const [isError, setIsError] = useState(false);
  const [autoCompleteData, setAutoCompleteData] = useState({})

  const addAutoCompleteData = (data) => setAutoCompleteData(data)
  console.log('COORDINATES')

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await SkiGuideApi.getGuides(autoCompleteData)
      setGuides(result.guides)
    } catch (err) {
      setIsError(true);
    }
  }

  return (
    <div className="background">
            <Row className="mt-5">
        <Col />
        <Col />
        <Col>
          <WeatherCard lat={autoCompleteData.lat || 37.9} lng={autoCompleteData.lng || -107.8} />
        </Col>
        <Col />
        <Col />
      </Row>
      <Container className="main-container p-4 mt-5">
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <AutoCompleteSearch addAutoCompleteData={addAutoCompleteData} />
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
        <h4 className="text-center mt-5">Can't find any guides in that location</h4>
      }
      {guides[0] !== 'start' && guides.length !== 0 && <GuideList guides={guides} />}

      </Container>
    </div>
  );
}

export default Search;