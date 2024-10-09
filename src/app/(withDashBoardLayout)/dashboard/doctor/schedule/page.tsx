'use client';
import { Box, Button, IconButton, Skeleton, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DoctorScheduleModal from './component/ScheduleModal';
import { useDeleteDoctorScheduleMutation, useGetMyDoctorScheduleQuery } from '@/Redux/api/doctorScheduleApi';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { toast } from 'sonner';

const DoctorSchedule = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data, isFetching, isLoading } = useGetMyDoctorScheduleQuery({});
    const [formattedSchedules, setFormattedSchedules] = useState([]);
    const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation()

    useEffect(() => {
        if (data) {
            const schedules = data.map((schedule: any) => ({
                id: schedule?.schedule?.id,
                date: dayjs(schedule?.schedule?.startDate).format('YYYY-MM-DD'),
                startTime: dayjs(schedule?.schedule?.startDate).format('HH:mm A'),
                endTime: dayjs(schedule?.schedule?.endDate).format('HH:mm A'),
            }));
            setFormattedSchedules(schedules);
        }
    }, [data]);

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteDoctorSchedule(id).unwrap()
            if (res.success) {
                toast.success(res.message)
            }

        } catch (error: any) {
            console.log(error.message);
        }

    };

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'startTime', headerName: 'Start Time', flex: 1 },
        { field: 'endTime', headerName: 'End Time', flex: 1 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => (
                <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
            ),
        },
    ];

    return (
        <Box>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Button onClick={() => setIsOpen(true)}>Create Doctor Schedule</Button>
                <DoctorScheduleModal open={isOpen} setOpen={setIsOpen} />
                <TextField size="small" placeholder="Search Schedule" />
            </Stack>
            <Box sx={{ mt: 4 }}>
                {isLoading || isFetching ? (
                    <Skeleton variant="rounded" width='100%' height={130} />
                ) : (
                    <DataGrid
                        rows={formattedSchedules}
                        columns={columns}
                        hideFooter
                    />
                )}
            </Box>
        </Box>
    );
};

export default DoctorSchedule;
