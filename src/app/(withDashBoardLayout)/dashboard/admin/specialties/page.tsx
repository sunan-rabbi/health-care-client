'use client'
import { Box, Button, IconButton, Skeleton, Stack, TextField, Typography } from "@mui/material";
import SpecialtyModal from "./component/specialtyModal";
import { useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDeleteSpecialityMutation, useGetAllSpecialityQuery } from "@/Redux/api/specialityApi";
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "sonner";



const SpecialtiesPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetAllSpecialityQuery({})
    const [deleteSpeciality] = useDeleteSpecialityMutation()

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteSpeciality(id).unwrap()
            if (res.success) {
                toast.success(res.message)
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }


    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', width: 300 },
        {
            field: 'icon',
            headerName: 'Icon',
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ mt: 1 }}>

                        <Image src={row.icon} width={30} height={30} alt='icon' />
                    </Box>
                )
            }
        },
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
                <Button onClick={() => setIsOpen(true)}>Create Specialty</Button>
                <SpecialtyModal open={isOpen} setOpen={setIsOpen} />
                <TextField size="small" placeholder="Search Specialist" />
            </Stack>
            <Box sx={{ mt: 4 }}>
                {
                    isLoading ?
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

export default SpecialtiesPage;