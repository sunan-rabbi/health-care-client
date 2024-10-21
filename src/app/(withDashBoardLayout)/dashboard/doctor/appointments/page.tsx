'use client';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VideocamIcon from '@mui/icons-material/Videocam';
import Link from 'next/link';
import { useGetMyAppointmentQuery } from '@/Redux/api/appointmentApi';
import { IAppointment } from '@/type';
import dayjs from 'dayjs';


const DoctorAppointmentsPage = () => {
    const { data, isLoading, isFetching } = useGetMyAppointmentQuery({});
    if (isLoading || isFetching) {
        return <p>Loading...</p>
    }
    const appointments = data?.appointments as IAppointment[];
    const meta = data?.meta;


    const formattedData = appointments.map((appointment: IAppointment) => ({
        id: appointment.id,
        name: appointment.patient.name,
        contactNumber: appointment.patient.contactNumber,
        appointmentDate: dayjs(appointment.schedule.startDate).format('YYYY-MM-DD'),
        appointmentTime: dayjs(appointment.schedule.startDate).format('hh:mm A'),
        paymentStatus: appointment.paymentStatus


    }))

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Patient Name',
            flex: 1,
        },
        {
            field: 'contactNumber',
            headerName: 'Contact Number',
            flex: 1,
        },
        {
            field: 'appointmentDate',
            headerName: 'Appointment Date',
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'appointmentTime',
            headerName: 'Appointment Time',
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },

        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'action',
            headerName: 'Join',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => {
                return (
                    <Link href={`/video?videoCallingId=${row?.videoCallingId}`}>
                        <IconButton>
                            <VideocamIcon />
                        </IconButton>
                    </Link>
                );
            },
        },
    ];

    return (
        <Box>
            {!isLoading ? (
                <Box my={2}>
                    <DataGrid
                        rows={formattedData ?? []}
                        columns={columns}
                        loading={isLoading}
                    />
                </Box>
            ) : (
                <h1>Loading.....</h1>
            )}
        </Box>
    );
};

export default DoctorAppointmentsPage;