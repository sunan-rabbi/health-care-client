import DoctorCard from '@/components/UI/Doctor/DoctorCard';
import { IDoctor } from '@/type';
import { Box, Container } from '@mui/material';
import React from 'react';

const DoctorsPage = async () => {
    const res = await fetch('http://localhost:5000/api/v1/doctor')
    const { data } = await res.json()

    return (
        <Container sx={{
            my: 4
        }}>

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
            </Box>
        </Container>
    );
};

export default DoctorsPage;