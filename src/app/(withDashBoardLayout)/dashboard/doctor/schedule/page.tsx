'use client'
import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import DoctorScheduleModal from './component/ScheduleModal';

const DoctorSchedule = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Box>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Button onClick={() => setIsOpen(true)}>Create Doctor Schedule</Button>
                <DoctorScheduleModal open={isOpen} setOpen={setIsOpen} />
                <TextField size="small" placeholder="Search Schedule" />
            </Stack>
        </Box>
    );
};

export default DoctorSchedule;