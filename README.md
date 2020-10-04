# Ski Guide App
Match yourself with local skiers whenever you’re skiing. Enter a location and get matched with a local skier who will show you around the slopes. Could possibly grow into a system where transactions are made too, guides enter how much they charge for a day or half-day, and then a review system as well. 

When you visit the site, you enter a location for your trip and page will search for guides in that area who are available and the user can request to book them or send them a message. Later on functionality for ski type, skill level and dates will all be available.

If you’re a guide you can register and enter information about yourself, and availability, in order to be matched with a skier looking for a guide. 

The site is deployed here: https://ski-guide.netlify.app/

## Data
The site uses these APIs:

https://openweathermap.org/
https://developers.google.com/places/web-service/autocomplete


## Features
- Search for a location and find any local guides registered in that area. 
- See current weather in searched location.
- Create a profile, and register as guide if desired. Add your location to be
  searchable in that area.
- Request a reservation with guides, send messages to guides, and add guides to favorites.
- As guide, message skiers who have requested a reservation with you and confirm or cancel
  reservation requests.

## User Flow
1. On the landing page, the user can enter a location and search available guides in that area.
   Through the navbar the user can also log in and sign up.
2. Once logged in the user can select guides from search result, add them to favorites, request
   to book and send a message. Users can remove favorites and cancel reservations. Users can also
   update their profile information and delete their account. 
3. Logged in users can register as guides, and enter their location to be searchable in that area.
   Guides can edit their guide profile and unregister as guides. 

## Tech Stack
- Backend: Node, Express, Postgres
- Frontend: React

## Database Diagram
An overview of the database is set up can be found [here](https://dbdiagram.io/d/5f5b792610a0a51c74d4a93c).

## Upcoming Changes/Next Steps
- Update messaging functionality.
- Add date functionality.
- Add map search.
- Add [Amplitude API](https://amplitude.com/)
- Update styling and design using Material UI.
- Add Passport.js
- Add filter functionality for type, dates, distance to resort.
- Implement review functionality.
- User Faker to seed database.

