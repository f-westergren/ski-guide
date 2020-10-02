import React, { useState, useEffect } from 'react';
import { 
  Container,
  Row, 
  Col,
  Button,
  Spinner,
  Form,
  FormGroup,
  Label,
  Input
   } from 'reactstrap';
  import SkiGuideApi from '../SkiGuideApi';
  import { useAuth } from './context/auth';
  import getFromToken from '../utils';


const Profile = () => {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { authToken } = useAuth();
  const userId = getFromToken(authToken, 'id');
  const isGuide = getFromToken(authToken, 'is_guide');
  const fields = ['email', 'first_name', 'last_name', 'image_url'];

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await SkiGuideApi.getUser(userId);      
        setFormData(res.user)
        setIsLoading(false);
      } catch (err) {
        setError(true);
        setIsLoading(false);
      }
    }
    getUser()
  }, [userId])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
      try {
        await SkiGuideApi.updateUser(userId, formData)
        setIsUpdating(false)
      } catch (err) {
        err[0] === 'Invalid Credentials' ? setError(err[0]) : setError('Invalid or missing input')
        setTimeout(function(){ setError(false) }, 3000);
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
    <Container className='profile mt-5 p-4 main-container'>
      <Row>
        <Col>
        <h2 className="text-center">Profile</h2>
        </Col>
      </Row>
      <Row>
        <Col>
        {isUpdating ? 
          <Form>
            {fields.map(i => 
              <FormGroup key={i}>
                <Label className="font-weight-bold text-capitalize" for={i}>
                {(i.indexOf('_') !== -1) ? i.replace('_', ' ') : i}
                </Label>
                <Input 
                  className='form-control' 
                  type={(i === 'email' ) ? i : 'text'} 
                  name={i} 
                  id={i}
                  onChange={handleChange}
                  value={formData[i] || ''}
                  minLength={(i === 'email') ? 5 : 1}                   
                />
              </FormGroup>
              )}
            {error && <span className="text-danger">{error}</span>}          
          </Form>
        :
          <>      
            <Label className="font-weight-bold">Email</Label>
            <p>{formData.email}</p>
            <Label className="font-weight-bold">First Name</Label>
            <p>{formData.first_name}</p>
            <Label className="font-weight-bold">Last Name</Label>
            <p>{formData.last_name}</p>
            <Label className="font-weight-bold">Skill Level</Label>
            <p>{formData.skill_level}</p>          
          </>
        }
      </Col>
        <Col />
        <Col className="text-center">         
          <img 
            src={formData.image_url || 'https://bit.ly/340DhLe'} 
            style={{ borderRadius: '10px' }}
            height="200px" 
            alt='profile'
          />  
        </Col>
      </Row>
      <Row>
        <Col>
          {isUpdating && <Button className="mr-2" onClick={handleSubmit}>Save Changes</Button>}
          <Button 
            color={isUpdating ? "danger" : "secondary"} 
            onClick={() => setIsUpdating(!isUpdating)}
          >
            {isUpdating ? 'Cancel' : 'Edit Profile'}
          </Button>
          
          <a className="btn btn-success mr-2 float-right" href="/profile/guide">
            {isGuide ? 'Edit Guide Profile' : 'Become a Guide'}
          </a>
          
        </Col>
      </Row>
    </Container>
  )
}

export default Profile;