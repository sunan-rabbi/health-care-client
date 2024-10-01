"use client"
import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";

const Navbar = () => {

    const AuthButton = dynamic(() => import('@/components/UI/Button/AuthButton'), { ssr: false })

    return (
        <Container>
            <Stack py={2} direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component={Link} href="/" fontWeight={600}>
                    <Box component='span' color='primary.main'>H</Box>ealth Care
                </Typography>
                <Stack direction="row" justifyContent="space-between" gap={4}>
                    <Typography component={Link} href="/consultation" >
                        Consultation
                    </Typography>
                    <Typography component={Link} href="/healthplan" >
                        Health Plans
                    </Typography>
                    <Typography component={Link} href="/medicine" >
                        Medicine
                    </Typography>
                    <Typography component={Link} href="/diagnostics" >
                        Diagnostics
                    </Typography>
                    <Typography component={Link} href="/ngos" >
                        NGOs
                    </Typography>
                </Stack>
                <AuthButton />
            </Stack>
        </Container>
    );
};

export default Navbar;