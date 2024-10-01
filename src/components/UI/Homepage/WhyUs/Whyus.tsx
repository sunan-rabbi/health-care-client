import assets from "@/assets";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import choose from '@/assets/choose-us.png'

const Whyus = () => {
    const servicesData = [
        {
            imageSrc: assets.svgs.award,
            title: "Award Winning Service",
            description:
                "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
        },
        {
            imageSrc: assets.svgs.award,
            title: "Best Quality Pregnancy Care",
            description:
                "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
        },
        {
            imageSrc: assets.svgs.award,
            title: "Complete Medical Equipments",
            description:
                "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
        },
        {
            imageSrc: assets.svgs.award,
            title: "Dedicated Emergency Care",
            description:
                "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
        },
    ];

    return (
        <Container>
            <Box textAlign="center">
                <Typography color='primary.main' variant="h6" component='h1' fontWeight={600}>
                    Why Us
                </Typography>
                <Typography variant="h4" component='h1' fontWeight={700}>
                    Why Choose Us
                </Typography>
            </Box>
            <Box>
                <Grid container spacing={5} my={5} >
                    <Grid item md={7} >
                        <Box display='flex' alignItems='center' gap={2} sx={{ backgroundColor: 'rgba(245,245,245,1)', padding: '15px', borderRadius: '10px 10px 100px 10px' }} my={2}>
                            <Box sx={{ backgroundColor: '#fff', padding: "10px", borderRadius: '10px' }}>
                                <Image src={servicesData[0].imageSrc} alt="award" width={50} height={50} />
                            </Box>
                            <Box>
                                <Typography variant="h6" component='h1' fontWeight={600}>
                                    {
                                        servicesData[0].title
                                    }
                                </Typography>
                                <Typography variant='body2' color='primary.body1' fontWeight={300}>
                                    {
                                        servicesData[0].description
                                    }
                                </Typography>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='center' gap={2} sx={{ backgroundColor: 'rgba(245,245,245,1)', padding: '15px', borderRadius: '10px 100px 10px 10px' }} my={2}>
                            <Box sx={{ backgroundColor: '#fff', padding: "10px", borderRadius: '10px' }}>
                                <Image src={servicesData[1].imageSrc} alt="award" width={50} height={50} />
                            </Box>
                            <Box>
                                <Typography variant="h6" component='h1' fontWeight={600}>
                                    {
                                        servicesData[1].title
                                    }
                                </Typography>
                                <Typography variant='body2' color='primary.body1' fontWeight={300}>
                                    {
                                        servicesData[1].description
                                    }
                                </Typography>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='center' gap={2} sx={{ backgroundColor: 'rgba(245,245,245,1)', padding: '15px', borderRadius: '10px 10px 100px 10px' }} my={2}>
                            <Box sx={{ backgroundColor: '#fff', padding: "10px", borderRadius: '10px' }}>
                                <Image src={servicesData[2].imageSrc} alt="award" width={50} height={50} />
                            </Box>
                            <Box>
                                <Typography variant="h6" component='h1' fontWeight={600}>
                                    {
                                        servicesData[2].title
                                    }
                                </Typography>
                                <Typography variant='body2' color='primary.body1' fontWeight={300}>
                                    {
                                        servicesData[2].description
                                    }
                                </Typography>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='center' gap={2} sx={{ backgroundColor: 'rgba(245,245,245,1)', padding: '15px', borderRadius: '10px 100px 10px 10px' }} my={2}>
                            <Box sx={{ backgroundColor: '#fff', padding: "10px", borderRadius: '10px' }}>
                                <Image src={servicesData[3].imageSrc} alt="award" width={50} height={50} />
                            </Box>
                            <Box>
                                <Typography variant="h6" component='h1' fontWeight={600}>
                                    {
                                        servicesData[3].title
                                    }
                                </Typography>
                                <Typography variant='body2' color='primary.body1' fontWeight={300}>
                                    {
                                        servicesData[3].description
                                    }
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={5}>
                        <Image src={choose} alt="choose" width={400} height={600} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Whyus;