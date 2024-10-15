"use client";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from '@/Redux/api/userApi';
import { Box, Button, Container, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import DoctorStyledComponent from './Component/DoctorStyledComponent';
import { AutoUpload } from '@/components/Shared/Form/AutoUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { modifyPayload } from '@/utils/FormData/modifyPayload';
import DoctorInfoFullModal from './Component/DoctorInfoFullModal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const ProfilePage = () => {
    const { data, isFetching, isLoading } = useGetMyProfileQuery({});
    const [updateMyProfile, { isLoading: uploading }] = useUpdateMyProfileMutation()
    const [open, setOpen] = useState(false)

    if (isFetching || isLoading) {
        return <Skeleton variant="rounded" width="100%" height={130} />;
    }


    const handleSubmit = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({}))
        const res = await updateMyProfile(formData)
    }

    return (
        <Container>
            <DoctorInfoFullModal open={open} setOpen={setOpen} id={data?.id} />
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
                    <Button fullWidth endIcon={<ModeEditIcon />} onClick={() => setOpen(true)}>Edit Profile</Button>
                </Grid>
                <Grid item xs={12} md={8}>
                    <DoctorStyledComponent data={data} />

                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
