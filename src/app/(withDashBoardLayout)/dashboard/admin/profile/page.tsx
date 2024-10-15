"use client";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from '@/Redux/api/userApi';
import { Box, Container, Skeleton } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { AutoUpload } from '@/components/Shared/Form/AutoUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AdminStyledComponent from './Component/AdminStyledComponent';

const ProfilePage = () => {
    const { data, isFetching, isLoading } = useGetMyProfileQuery({});
    const [updateMyProfile, { isLoading: uploading }] = useUpdateMyProfileMutation()

    if (isFetching || isLoading) {
        return <Skeleton variant="rounded" width="100%" height={130} />;
    }


    const handleSubmit = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({}))
        await updateMyProfile(formData)
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
                        <Image width={400} height={300} src={data?.profilePhoto} alt="Profile Photo" />
                    </Box>
                    {
                        uploading ? <p>Uploading</p> :
                            <AutoUpload
                                name='file'
                                label='Choose Your Profile Photo'
                                variant='text'
                                icon={<FileUploadIcon />}
                                onFileUpload={handleSubmit}
                            />
                    }
                </Grid>
                <Grid item xs={12} md={8}>
                    <AdminStyledComponent data={data} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
