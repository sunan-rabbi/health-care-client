"use client";
import { useGetMyProfileQuery } from '@/Redux/api/userApi';
import { Box, Container, Skeleton } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import DoctorStyledComponent from './Component/DoctorStyledComponent';

const ProfilePage = () => {
    const { data, isFetching, isLoading } = useGetMyProfileQuery({});

    if (isFetching || isLoading) {
        return <Skeleton variant="rounded" width="100%" height={130} />;
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            height: 300,
                            width: '100%',
                            overflow: 'hidden',
                            borderRadius: 1,
                        }}
                    >
                        <Image width={400} height={300} src={data?.profilePhoto} alt="Doctor Photo" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <DoctorStyledComponent data={data} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
