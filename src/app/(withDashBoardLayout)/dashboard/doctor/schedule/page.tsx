'use client';
import { Box, Button, IconButton, Pagination, Skeleton, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DoctorScheduleModal from './component/ScheduleModal';
import { useDeleteDoctorScheduleMutation, useGetMyDoctorScheduleQuery } from '@/Redux/api/doctorScheduleApi';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { toast } from 'sonner';

type IDoctorSchedule = {
    id: any;
    date: string;
    startTime: string;
    endTime: string;
}

const DoctorSchedule = () => {

    const query: Record<string, any> = {}

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);

    query['page'] = page;
    query['limit'] = limit;


    const [isOpen, setIsOpen] = useState(false);
    const { data, isFetching, isLoading } = useGetMyDoctorScheduleQuery({ ...query });
    const [formattedSchedules, setFormattedSchedules] = useState<IDoctorSchedule[]>([]);
    const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation()

    useEffect(() => {
        if (data) {
            const schedules = data?.data.map((schedule: any) => ({
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

    const meta = data?.meta;
    let pageCount: number;

    if (meta?.total) {
        pageCount = Math.ceil(meta.total / limit)
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

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
                        hideFooterPagination
                        slots={{
                            footer: () => {
                                return (
                                    <Box sx={{
                                        mb: 2,
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <Pagination count={pageCount} page={page} onChange={handleChange} />
                                    </Box>
                                )
                            }
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default DoctorSchedule;
