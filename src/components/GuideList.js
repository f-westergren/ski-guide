import React, { useState } from 'react';
import GuideCard from './GuideCard';

const GuideList = ({ guides }) => {
  return (
    <div className="container">
      {guides.map(guide => (
        <GuideCard 
          first_name={guide.first_name}
          image_url={guide.image_url}
          type={guide.type}
          id={guide.id}
          key={guide.id}
          rating={guide.avg}
        />
      ))}
    </div>
  )
}

export default GuideList