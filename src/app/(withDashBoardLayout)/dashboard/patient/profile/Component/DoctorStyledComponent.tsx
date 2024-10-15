
import { Box, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import { IDoctor } from '@/type';

const StyleInfoBox = styled(Box)(({ theme }) => ({
    background: '#f4f7fe',
    borderRadius: theme.spacing(1),
    width: '45%',
    padding: '8px 16px',
    '& p': {
        fontWeight: 600,
    },
}));

const DoctorStyledComponent = ({ data }: { data: IDoctor }) => {
    return (
        <>
            <Typography variant="h5" color="primary.main" marginBottom={1}>
                Basic Information
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} gap={2} flexWrap={'wrap'}>

                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Role
                    </Typography>
                    <Typography>{data?.role}</Typography>
                </StyleInfoBox>

                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Name
                    </Typography>
                    <Typography>{data?.name}</Typography>
                </StyleInfoBox>

                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Email
                    </Typography>
                    <Typography>{data?.email}</Typography>
                </StyleInfoBox>

                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Gender
                    </Typography>
                    <Typography>{data?.gender}</Typography>
                </StyleInfoBox>

                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Designation
                    </Typography>
                    <Typography>{data?.designation}</Typography>
                </StyleInfoBox>

            </Stack>
            <br />
            <Typography variant="h5" color="primary.main" marginBottom={1}>
                Professional Information
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} gap={2} flexWrap={'wrap'}>

                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Appointment Fee
                    </Typography>
                    <Typography>{data?.apointmentFee}</Typography>
                </StyleInfoBox>

                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Qualification
                    </Typography>
                    <Typography>{data?.qualification}</Typography>
                </StyleInfoBox>

                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Current Working Place
                    </Typography>
                    <Typography>{data?.currentWorkingPlace}</Typography>
                </StyleInfoBox>

                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Joined
                    </Typography>
                    <Typography>{dayjs(data?.createdAt).format('YYYY-MM-DD')}</Typography>
                </StyleInfoBox>

                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Current Status
                    </Typography>
                    <Typography>{data?.status}</Typography>
                </StyleInfoBox>
                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Average Rating
                    </Typography>
                    <Typography>{data?.averageRating}</Typography>
                </StyleInfoBox>
                <StyleInfoBox>
                    <Typography color="secondary" variant="caption">
                        Experience
                    </Typography>
                    <Typography>{data?.experience}</Typography>
                </StyleInfoBox>

            </Stack>
        </>
    );
};

export default DoctorStyledComponent;