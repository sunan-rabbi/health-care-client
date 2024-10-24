import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from "next/link";

const TopRatedDoctor = async () => {
    const res = await fetch('http://localhost:5000/api/v1/doctor?page=1&limit=3', {
        next: {
            revalidate: 30
        }
    })
    const { data: doctors } = await res.json()

    return (

        <Box sx={{
            my: 10,
            py: 30,
            backgroundColor: "rgba(20, 20, 20, 0.1)",
            clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
        }}>
            <Box textAlign="center">
                <Typography variant="h4" fontWeight={600}>
                    Our Top Rated Doctors
                </Typography>
                <Typography component="p" fontSize={18} fontWeight={400} sx={{ mt: 2 }}>
                    Access to expert physicians and surgeons, advanced technologies
                </Typography>
                <Typography component="p" fontSize={18} fontWeight={400}>
                    and top-quality surgery facilities right here.
                </Typography>
            </Box>
            <Container sx={{ margin: "30px auto" }}>
                <Grid container spacing={2}>
                    {
                        doctors && doctors.map((doctor: any) => (
                            <Grid item key={doctor.id} md={4}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: 300,
                                            "& img": {
                                                width: '100%',
                                                height: '100%',
                                                overflow: 'hidden',
                                                objectFit: "cover"
                                            }
                                        }}
                                    >
                                        <Image src={doctor.profilePhoto} alt="doctor" width={500} height={100} />
                                    </Box>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {doctor.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {doctor.qualification}, {doctor.designation}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" mt={1}>
                                            <LocationOnIcon /> {doctor.address}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{
                                        justifyContent: "space-between",
                                        px: 2,
                                        paddingBottom: "20px"
                                    }}>
                                        <Button >Book Now</Button>
                                        <Button variant="outlined">View Profile</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
                <Link href='/doctors'>
                    <Box textAlign="center" >
                        <Button
                            variant="outlined"
                            sx={{
                                marginTop: "20px",
                            }}
                        >
                            View ALL
                        </Button>
                    </Box>
                </Link>

            </Container>

        </Box>

    );
};

export default TopRatedDoctor;