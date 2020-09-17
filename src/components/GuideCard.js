import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  star: {
    marginLeft: 'auto'
  }
});


const GuideCard = (props) => {
  const classes = useStyles();
  const { favorite, title, subtitle, description, imgSrc } = props; 
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={imgSrc}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Button size="small" color="primary">
          Book Now
        </Button>
        <IconButton size="small" color="secondary" className={classes.star}>
          {favorite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default GuideCard;