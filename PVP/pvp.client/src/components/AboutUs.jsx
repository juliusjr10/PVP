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
                marginBottom: '100px', // Add some bottom margin to prevent overlap with footer
                ml: '150px',
            }}
        >
            <Typography variant="h1" sx={{
                fontSize: {
                    xl: '75px',
                    lg: '75px',
                    md: '75px',
                    sm: '50px',
                    xs: '50px'
                },
                fontWeight: '900',
                fontFamily: 'Roboto',
                fontStyle: 'italic'
            }}>
                About us
            </Typography>
            <Grid container alignItems="center">
                <Grid item xs={3} sx={{
                    display: {
                        xs: 'none',
                        sm: 'flex',
                        md: 'flex',
                        lg: 'flex',
                        xl: 'flex'
                    },
                    justifyContent: 'center',
                    marginBottom: '20px', // Add margin bottom to create space
                }}>
                    <img src={KTU} alt="Logo" />
                </Grid>
                <Grid item xs={9}>
                    <Box
                        sx={{
                            mt: { xs: 8, sm: 10 },
                            alignSelf: 'center',
                            height: { xs: 150, sm: 400 },
                            width: '80%',
                            backgroundSize: 'cover',
                            borderRadius: '10px',
                            outline: '1px solid',
                            alignItems: 'center',
                            outlineColor: alpha('#9CCCFC', 0.1),
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            textAlign: 'center',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Added boxShadow
                        }}
                    >
                        <Typography sx={{
                            fontSize: {
                                xl: '22px',
                                lg: '22px',
                                md: '18px',
                                sm: '14px',
                                xs: '6px'
                            }
                        }}>
                            We are third-year students at Kaunas University of Technology. We aim to motivate people to pursue personal development. To do this, we offer our platform - HabitBook, which not only allows people to track their progress by giving up bad habits or developing good ones but also allows them to interact with other people who have embarked on their personal development journey.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}