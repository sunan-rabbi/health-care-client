import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from '@/assets/landing_page/facebook.png'
import instagramIcon from '@/assets/landing_page/instagram.png'
import linkedinIcon from '@/assets/landing_page/linkedin.png'
import twitterIcon from '@/assets/landing_page/twitter.png'

const Footer = () => {
    return (
        <Box bgcolor="rgb(17,26,34)" py={5}>
            <Container>
                <Stack direction="row" justifyContent="center" gap={4}>
                    <Typography component={Link} color="white" href="/consultation" >
                        Consultation
                    </Typography>
                    <Typography component={Link} color="white" href="/healthplan" >
                        Health Plans
                    </Typography>
                    <Typography component={Link} color="white" href="/medicine" >
                        Medicine
                    </Typography>
                    <Typography component={Link} color="white" href="/diagnostics" >
                        Diagnostics
                    </Typography>
                    <Typography component={Link} color="white" href="/ngos" >
                        NGOs
                    </Typography>
                </Stack>
                <Stack direction="row" justifyContent="center" gap={4} py={3}>
                    <Image src={facebookIcon} alt="facebook" width={30} height={30} />
                    <Image src={instagramIcon} alt="facebook" width={30} height={30} />
                    <Image src={linkedinIcon} alt="facebook" width={30} height={30} />
                    <Image src={twitterIcon} alt="facebook" width={30} height={30} />
                </Stack>
                <Box sx={{
                    borderBottom: '2px dashed',
                    borderColor: 'secondary.light',
                    my: 4
                }}></Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" gap={4} py={3}>
                    <Typography component='p' color='white'>
                        &copy;2024 HealthCare. All Rights Reserved.
                    </Typography>
                    <Typography variant="h4" component={Link} href="/" fontWeight={600} color='white'>
                        <Box component='span' color='primary.main'>H</Box>ealth Care
                    </Typography>
                    <Typography component='p' color='white'>
                        Privacy Policy! Terms & Conditions
                    </Typography>

                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;