import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function LocationCard({location}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Location
        </Typography>
        <Typography variant="h5" component="div">
          {location.place}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {location.phone}
        </Typography>
        <Typography variant="body2">
         {location.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Directions</Button>
      </CardActions>
    </Card>
  );
}
