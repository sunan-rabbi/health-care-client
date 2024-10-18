"use client"
import { Box, Button, IconButton, Skeleton } from "@mui/material";
import { useState } from 'react'
import ScheduleModal from "./component/ScheduleModal";
import { useDeleteScheduleMutation, useGetAllScheduleQuery } from "@/Redux/api/scheduleApi";
import dayjs from 'dayjs';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "sonner";
import { ISchedules } from "@/type";

const schedulesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isLoading, isFetching, data } = useGetAllScheduleQuery({})
    const schedules = data?.schedules as ISchedules[]

    const [deleteSchedule] = useDeleteScheduleMutation()

    const handleDelete = async (id: string) => {

        try {
            const res = await deleteSchedule(id).unwrap()
            if (res.success) {
                toast.success(res.message)
            }

        } catch (error: any) {
            console.log(error.message);
        }
    }

    const formattedSchedules = schedules?.map((schedule) => ({
        id: schedule.id,
        startDate: dayjs(schedule.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(schedule.endDate).format('YYYY-MM-DD'),
        startTime: dayjs(schedule.startDate).format('HH:mm A'),
        endTime: dayjs(schedule.endDate).format('HH:mm A'),
    }))

    const columns: GridColDef[] = [
        { field: 'startDate', headerName: 'Start Date', flex: 1 },
        { field: 'endDate', headerName: 'End Date', flex: 1 },
        { field: 'startTime', headerName: 'Start Time', flex: 1 },
        { field: 'endTime', headerName: 'End Time', flex: 1 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => {
                return (
                    <Box >
                        <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
                            <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                    </Box>
                )
            }
        }

    ];

    return (
        <Box>
            <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
            <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
            <Box sx={{ mt: 4 }}>
                {
                    (isLoading && isFetching) ?
                        <Skeleton variant="rounded" width='100%' height={130} /> : <DataGrid
                            rows={formattedSchedules}
                            columns={columns}
                            hideFooter
                        />
                }
            </Box>
        </Box>
    );
};

export default schedulesPage;