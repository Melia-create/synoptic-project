import Paper from '@mui/material/Paper';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

function LandingPage() {
    return (
        <>
            <Paper
                square
                elevation={3}
                sx={{
                    margin: "auto",
                    width: 'max-content',
                    height: 'auto'
                }}>
      <Grid container spacing={3} align='center' sx={{marginTop: 10}}>
        <Grid item xs={12}>
        <PersonPinCircleIcon
                    sx={{
                        color: '#80cbc4',
                        width: 150,
                        height: 150,
                    }} />
          <Typography variant='h3' component='h1'>
            Community Events Ltd
          </Typography>
        </Grid>
        <Grid item container spacing={3} >
          <Grid item xs={12}>
          <Typography>
            Providing the tools to bring your community together.
          </Typography>
          <Typography>
              Discover and create events in your area. 
            </Typography>
            <Button
            href='/register'
            sx={{ mt: 3, mb: 2, bgcolor: '#80cbc4', marginRight: 5, ':hover': { bgcolor: 'teal', color: 'white' }}}
              variant='contained'>
              Get Started Today
            </Button>
            <Button
            href='/login'
            sx={{ mt: 3, mb: 2, bgcolor: '#80cbc4', ':hover': { bgcolor: 'teal', color: 'white' }}}
              variant='contained'>
              Already a Member? 
            </Button>
          </Grid>
          </Grid>
          </Grid>
            </Paper>

        </>
    )
}

export default LandingPage