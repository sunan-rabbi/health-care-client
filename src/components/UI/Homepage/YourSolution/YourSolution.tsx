import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import doctor from '@/assets/how-it-works-img.png'
import Image from "next/image";
import assets from "@/assets";

const YourSolution = () => {
    return (
        <Container sx={{ my: 4, py: 10 }}>
            <Box textAlign='start'>
                <Typography component='p' color='primary.main'>
                    How it Works
                </Typography>
                <Typography component='h1' variant="h4" fontWeight={600} my={1}>
                    4 Easy Steps to Get Your Solution
                </Typography>
                <Typography component='p'>
                    Access to export physicians and surgeons, advanced technologies
                </Typography>
                <Typography component='p'>
                    and top-quality surgery facilities right here
                </Typography>
            </Box>
            <Grid container spacing={3} mt={2}>
                <Grid item md={5}>
                    <Image src={doctor} alt="doctor" width={500} />
                </Grid>
                <Grid item md={7}>
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <Box sx={{ border: '1px solid #8DC3C7', padding: '17px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: "8px" }}>
                                <Image src={assets.icon.search} alt="search" width={40} />
                                <Typography variant="h5" component='h1' fontWeight={600}>
                                    Search Doctor
                                </Typography>
                                <Typography component='p' fontWeight={500}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci eligendi impedit aut facilis,
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ border: '1px solid #8DC3C7', padding: '17px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: "8px" }}>
                                <Image src={assets.icon.appointment} alt="search" width={40} />
                                <Typography variant="h5" component='h1' fontWeight={600}>
                                    Schedule Appointment
                                </Typography>
                                <Typography component='p' fontWeight={500}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci eligendi impedit aut facilis,
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ border: '1px solid #8DC3C7', padding: '17px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: "8px" }}>
                                <Image src={assets.icon.doctor} alt="search" width={40} />
                                <Typography variant="h5" component='h1' fontWeight={600}>
                                    Check Doctor Profile
                                </Typography>
                                <Typography component='p' fontWeight={500}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci eligendi impedit aut facilis,
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box sx={{ border: '1px solid #8DC3C7', padding: '17px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: "8px" }}>
                                <Image src={assets.icon.charity} alt="search" width={40} />
                                <Typography variant="h5" component='h1' fontWeight={600}>
                                    Get Your Solution
                                </Typography>
                                <Typography component='p' fontWeight={500}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci eligendi impedit aut facilis,
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            <Stack direction='row' sx={{
                backgroundImage: 'linear-gradient(90deg, rgba(22,42,181,1) 0%, rgba(33,22,225,1) 18%, rgba(0,212,255,1) 71%)',
                borderRadius: '10px'
            }} justifyContent="space-around" px={2} py={3} mt={5}>
                <Box>
                    <Typography color='white' variant="h4" fontWeight={400}>180+</Typography>
                    <Typography color='white' component='p'>Expert Doctors</Typography>
                </Box>
                <Box>
                    <Typography color='white' variant="h4" fontWeight={400}>26+</Typography>
                    <Typography color='white' component='p'>Expert Service</Typography>
                </Box>
                <Box>
                    <Typography color='white' variant="h4" fontWeight={400}>10K+</Typography>
                    <Typography color='white' component='p'>Happy Patient</Typography>
                </Box>
                <Box>
                    <Typography color='white' variant="h4" fontWeight={400}>150+</Typography>
                    <Typography color='white' component='p'>Best Award Winners</Typography>
                </Box>
            </Stack>
        </Container >
    );
};

export default YourSolution;