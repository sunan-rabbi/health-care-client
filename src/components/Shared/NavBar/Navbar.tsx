"use client"
import { getUserInfo } from "@/Service/actions/authservice";
import { JwtDecodedData } from "@/type";
import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {

    const AuthButton = dynamic(() => import('@/components/UI/Button/AuthButton'), { ssr: false })
    const [userInfo, setUserInfo] = useState<JwtDecodedData | null>(null);

    useEffect(() => {
        const userData = getUserInfo() as JwtDecodedData;
        setUserInfo(userData);
    }, [])
    return (
        <Container>
            <Stack py={2} direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component={Link} href="/" fontWeight={600}>
                    <Box component='span' color='primary.main'>H</Box>ealth Care
                </Typography>
                <Stack direction="row" justifyContent="space-between" gap={4}>
                    <Typography >
                        Consultation
                    </Typography>
                    <Typography >
                        Health Plans
                    </Typography>
                    <Typography >
                        Medicine
                    </Typography>
                    <Typography >
                        Diagnostics
                    </Typography>
                    <Typography >
                        NGOs
                    </Typography>
                    {
                        (userInfo && userInfo?.userId) && <Typography component={Link} href='/dashboard'>
                            Dashboard
                        </Typography>
                    }
                </Stack>
                <AuthButton />
            </Stack>
        </Container>
    );
};

export default Navbar;