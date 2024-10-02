"use client"
import { Box, Button, IconButton, Skeleton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import DoctorModal from "./component/doctorModal";
import { useDeleteDoctorMutation, useGetAllDoctorQuery } from "@/Redux/api/doctorApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDebounced } from "@/hook/useDebounce";
import { toast } from "sonner";


const doctorsPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState('')
    const query: Record<string, string> = {}

    const debouncedTerm = useDebounced({ searchTerm, delay: 600 })
    if (!!debouncedTerm) {
        query['searchTerm'] = debouncedTerm
    }

    const { data, isLoading, isFetching } = useGetAllDoctorQuery({ ...query })

    const [deleteDoctor] = useDeleteDoctorMutation()

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteDoctor(id).unwrap()
            if (res.success) {
                toast.success(res.message)
            }

        } catch (error: any) {
            console.log(error.message);
        }
    }


    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        { field: 'registrationNumber', headerName: 'Registration Number', flex: 1 },
        { field: 'apointmentFee', headerName: 'Appointment Fee', flex: 1 },
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
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )
            }
        }

    ];

    return (
        <Box>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Button onClick={() => setIsOpen(true)}>Create Doctor</Button>
                <DoctorModal open={isOpen} setOpen={setIsOpen}></DoctorModal>
                <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    placeholder="Search Doctor"
                />
            </Stack>
            <Box sx={{ mt: 4 }}>
                {
                    (isLoading && isFetching) ?
                        <Skeleton variant="rounded" width='100%' height={130} /> : <DataGrid
                            rows={data}
                            columns={columns}
                            hideFooter
                        />
                }
            </Box>
        </Box>
    );
};

export default doctorsPage;