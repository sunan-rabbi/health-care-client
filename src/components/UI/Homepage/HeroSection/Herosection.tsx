import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const Herosection = () => {
    return (
        <Container sx={{ display: 'flex', direction: 'row', my: 16, gap: 4 }} >
            <Box sx={{ flex: 1, position: 'relative', }}>
                <Box sx={{ position: 'absolute', width: '700px', top: '-90px', left: '-120px' }}>
                    <Image src={assets.svgs.grid} alt="grid" />
                </Box>
                <Box>
                    <Typography variant="h3" component="h1" fontWeight={500}>
                        Healthier Hearts
                    </Typography>
                    <Typography variant="h3" component="h1" fontWeight={500}>
                        Come From
                    </Typography>
                    <Typography variant="h3" component="h1" fontWeight={500} color='primary.main'>
                        Preventive Care
                    </Typography>
                </Box>
                <Box sx={{ my: 3 }}>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, obcaecati. Sit asperiores quasi quas consectetur laborum? Quos error doloribus consequatur quibusdam recusandae voluptate mollitia cum iste optio voluptatem, unde adipisci.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button>Make Appoinment</Button>
                    <Button variant="outlined">Contact Us</Button>
                </Box>
            </Box>
            <Box sx={{ flex: 1, position: 'relative' }}>
                <Box sx={{ position: 'absolute', top: '-75px', left: '160px' }}>
                    <Image src={assets.svgs.arrow} alt="arrow" width={100} height={100} />
                </Box>
                <Box sx={{ position: 'absolute', }}>
                    <Image src={assets.images.doctor1} alt="doctor1" width={240} height={380} />
                </Box>
                <Box sx={{ position: 'absolute', top: '-30px', right: '57px' }}>
                    <Image src={assets.images.doctor2} alt="doctor2" width={240} height={350} />
                </Box>
                <Box sx={{ position: 'absolute', top: '180px', left: '100px' }}>
                    <Image src={assets.images.doctor3} alt="doctor3" width={240} height={240} />
                </Box>
                <Box sx={{ position: 'absolute', zIndex: -1, bottom: '-90px', right: '50px' }}>
                    <Image src={assets.images.stethoscope} alt="stethoscope" width={180} height={180} />
                </Box>
            </Box>
        </Container>
    );
};

export default Herosection;