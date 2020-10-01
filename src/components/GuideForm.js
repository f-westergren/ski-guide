import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import SkiGuideApi from '../SkiGuideApi';
import AutoCompleteSearch from './AutoCompleteSearch';
import { useAuth } from './context/auth';
import getFromToken from '../utils';

const GuideForm = () => {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [autoCompleteData, setAutoCompleteData] = useState({})
  const [error, setError] = useState(false);

  const history = useHistory()
  const { authToken, setAuthToken } = useAuth();

  const addAutoCompleteData = (data) => setAutoCompleteData(data)

  const guideId = getFromToken(authToken, 'id')
  const isGuide = getFromToken(authToken, 'is_guide')

  useEffect(() => {
    const getGuide = async () => {
      try {
        if (isGuide) {
          const res = await SkiGuideApi.getGuide(guideId)
          setFormData({
            location: res.location,
            bio: res.bio,
            lat: res.lat,
            lng: res.lng
          })
        }
        setIsLoading(false);
      } catch (err) {
        setError(true);
      }
    }
    getGuide();
  }, [])
  
  const handleChange = e => {
    let { name, value } = e.target
    // Create array from selected values in multiple choice input.
    // Then turn it into string.
    if (name === 'type') {
      let value = Array.from(e.target.selectedOptions, option => option.value);
      value = value.join(',') 
      setFormData(data => ({
        ...data,
        'type': value
      }));
    } else {
      setFormData(data => ({
        ...data,
        [name]: value
      }));
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const data = {...formData, ...autoCompleteData}
      try {
        setError(false)
        if (isGuide) {
          await SkiGuideApi.updateGuide(guideId, data)
        } else {
          const res = await SkiGuideApi.registerGuide(data)
          setAuthToken(res.token);
        }
        history.push('/profile');
      } catch (err) {
        setError(err);
      }
  }

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <Container className='profile mt-3 p-4 main-container'>
      <h4 className="text-center">{isGuide ? 'Edit Guide Profile' : 'Guide Registration'}</h4>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="location">Location</Label>
          <AutoCompleteSearch addAutoCompleteData={addAutoCompleteData} location={formData.location}/>
        </FormGroup>
        <FormGroup>
          <Label for="bio">Tell the skiers about yourself</Label>
          <Input 
            type="textarea" 
            name="bio" 
            id="bio" 
            placeholder="I love skiing..."
            onChange={handleChange}
            value={formData['bio'] || ''}
          />
        </FormGroup>
        <FormGroup>
          <Input 
            type="select" 
            name="type" 
            id="type"
            multiple 
            onChange={handleChange} 
          >
            <option value="ski">Ski</option>
            <option value="snowboard">Snowboard</option>
            <option value="telemark">Telemark</option>
          </Input>
          {error && <span className="text-danger">{error}</span>}
        </FormGroup>
        <Button color="primary">Submit</Button>
        <a className="btn btn-danger ml-2" href="/profile">Cancel</a>
      </Form>
    </Container>
  );
}

export default GuideForm;