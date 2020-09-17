import React from 'react';
import GuideCard from './GuideCard';
import { Grid } from '@material-ui/core';


const GuideList = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <GuideCard 
          title="Folke Westergren" 
          subtitle="A passionate skier and educator" 
          avatarSrc="https://www.mountaineers.org/blog/wobble-your-way-through-ski-season-finding-fun-as-a-first-time-skier/@@images/image"
          imgSrc="https://content.tui.co.uk/adamtui/2016_11/9_3/3df4164d-2057-4a29-8ee7-a6b90036a8d2/CAN_BAN_F0099WebOriginalCompressed.jpg?i10c=img.resize(width:658);img.crop(width:658%2Cheight:370)"
          description="I have been skiing my entire life. I love skiing. I will ski with you all day and all night!"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <GuideCard />
      </Grid>
      <Grid item xs={12} sm={4}>
        <GuideCard />
      </Grid>
    </Grid>
    )
}

export default GuideList;