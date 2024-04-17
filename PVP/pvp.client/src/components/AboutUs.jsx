import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import KTU from "../assets/KTU.png";

export default function AboutUs() {
    return (
        <Container
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                pt: { xs: 8, sm: 14 },
                pb: { xs: 8, sm: 12 },

            }}
        >
            <Typography variant="h1" sx={{
                fontSize: '75px',
                fontWeight: '900',
                fontFamily: 'Roboto',
                fontStyle: 'italic'

            }}>
              About us
            </Typography>
            <Grid container alignItems="center">
                <Grid item xs={3}>
                    <img src={KTU} alt="Logo" style={{ width: '250px' }} />
                </Grid>
                <Grid item xs={9}>
                    <Box
                        sx={{
                            mt: { xs: 8, sm: 10 },
                            alignSelf: 'center',
                            height: { xs: 200, sm: 400 },
                            width: '60%',
                            backgroundSize: 'cover',
                            borderRadius: '10px',
                            outline: '1px solid',
                            alignItems: 'center',
                            outlineColor: alpha('#9CCCFC', 0.1),
                            boxShadow: `0 0 24px 12px ${alpha('#033363', 0.2)}`,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            textAlign: 'center',
                            px: 5,

                        }}
                    >
                        <Typography sx={{ fontSize: '22px' }}>
                            We are third-year students at Kaunas University of Technology. We aim to motivate people to pursue personal development. To do this, we offer our platform - HabitBook, which not only allows people to track their progress by giving up bad habits or developing good ones but also allows them to interact with other people who have embarked on their personal development journey.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            
        </Container>
    );
}