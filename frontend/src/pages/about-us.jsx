import { Avatar, Box, createTheme, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import ToysIcon from '@mui/icons-material/Toys';
import { GoogleMap } from "../cmps/google-map";
import LocationCard from "../cmps/location-card";


const location1={place: 'Tel-Aviv', phone:'(123)-456-7899', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptas dolorum modi, eius sapiente temporibus soluta laborum ut est officia perferendis et placeat magnam. Sequi sint fugiat ratione perspiciatis doloribus?' }
const location2={place: 'Haifa', phone:'(123)-456-7899', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptas dolorum modi, eius sapiente temporibus soluta laborum ut est officia perferendis et placeat magnam. Sequi sint fugiat ratione perspiciatis doloribus?' }
const location3={place: 'Kfar Qasim', phone:'(123)-456-7899', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptas dolorum modi, eius sapiente temporibus soluta laborum ut est officia perferendis et placeat magnam. Sequi sint fugiat ratione perspiciatis doloribus?' }

export function AboutUs() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={false} sm={8} md={7}>
          <GoogleMap/>
        </Grid>
        <Grid item xs={12} sm={4} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <ToysIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Our Locations
            </Typography>
            <LocationCard location={location1}/>
            <LocationCard location={location2}/>
            <LocationCard location={location3}/>

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
}