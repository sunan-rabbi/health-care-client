import DoctorCard from '@/components/UI/Doctor/DoctorCard';
import ScrollData from '@/components/UI/Doctor/ScrollData';
import { IDoctor } from '@/type';
import { Box, Container } from '@mui/material';
import React from 'react';

interface PropType {
    searchParams: { specialties: string };
}


const DoctorsPage = async ({ searchParams }: PropType) => {

    let res;


    if (searchParams.specialties && searchParams.specialties === 'all') {

        res = await fetch('http://localhost:5000/api/v1/doctor');
    }
    else if (searchParams.specialties && searchParams.specialties !== 'all') {

        res = await fetch(
            `http://localhost:5000/api/v1/doctor?specialties=${searchParams.specialties}`
        );
    } else {
        res = await fetch('http://localhost:5000/api/v1/doctor');
    }

    const { data } = await res.json();

    return (
        <Container sx={{
            my: 4
        }}>
            <ScrollData />
            <Box sx={{ mt: 2, p: 3, bgcolor: 'secondary.light' }}>
                {
                    data.map((doctor: IDoctor, index: number) => (
                        <Box key={doctor.id}>
                            <DoctorCard doctor={doctor} />
                            {
                                index === data.length - 1 ? null : <Box sx={{
                                    borderBottom: '2px dashed',
                                    borderColor: 'secondary',

                                    my: 4
                                }}>

                                </Box>
                            }
                        </Box>
                    ))
                }

                {data.length === 0 && (
                    <Box>No Doctor Found With This Specialty</Box>
                )}
            </Box>
        </Container>
    );
};

export default DoctorsPage;