
import { Box, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import { IAdmin } from '@/type';

const StyleInfoBox = styled(Box)(({ theme }) => ({
    background: '#f4f7fe',
    borderRadius: theme.spacing(1),
    width: '45%',
    padding: '8px 16px',
    '& p': {
        fontWeight: 600,
    },
}));

const AdminStyledComponent = ({ data }: { data: IAdmin }) => {
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
                        Contact No
                    </Typography>
                    <Typography>{data?.contactNumber}</Typography>
                </StyleInfoBox>

            </Stack>
            <br />
            <Typography variant="h5" color="primary.main" marginBottom={1}>
                Professional Information
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} gap={2} flexWrap={'wrap'}>
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
            </Stack>
        </>
    );
};

export default AdminStyledComponent;