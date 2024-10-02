import { useCreateDoctorMutation, useGetDoctorQuery, useUpdateDoctorMutation } from "@/Redux/api/doctorApi";
import ReUseForm from "@/components/Shared/Form/ReForm";
import ReUseInput from "@/components/Shared/Form/ReInput";
import ReFullModal from "@/components/Shared/Modal/ReFullModal";
import { IDoctor } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type IModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
};

const doctorSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    name: z.string().min(1, { message: 'Name cannot be empty' }).optional(),
    contactNumber: z.string().min(11, { message: 'Invalid contact number format' }).optional(),
    address: z.string().min(1, { message: 'Address cannot be empty' }).optional(),
    registrationNumber: z.string().min(1, { message: 'Registration number cannot be empty' }).optional(),
    experience: z.number().optional(),
    apointmentFee: z.number().optional(),
    qualification: z.string().min(1, { message: 'Qualification cannot be empty' }).optional(),
    currentWorkingPlace: z.string().min(1, { message: 'Current working place cannot be empty' }).optional(),
    designation: z.string().min(1, { message: 'Designation cannot be empty' }).optional(),
});

const DoctorUpdate = ({ open, setOpen, id }: IModal) => {

    const { isFetching, isLoading, data: fetchData } = useGetDoctorQuery(id);
    const [updateDoctor] = useUpdateDoctorMutation()

    const data: IDoctor = { ...fetchData }

    if (isFetching || isLoading) {
        return (
            <Skeleton variant="rounded" width='100%' height={130} />
        )
    }

    const defaultValues = {
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        address: data.address,
        registrationNumber: data.registrationNumber,
        experience: data.experience,
        apointmentFee: data.apointmentFee,
        qualification: data.qualification,
        currentWorkingPlace: data.currentWorkingPlace,
        designation: data.designation
    }

    const handleSubmit = async (value: FieldValues) => {
        value.apointmentFee = Number(value?.apointmentFee);
        value.experience = Number(value?.experience);

        try {
            const res = await updateDoctor({ id, data: value }).unwrap();

            if (res?.id) {
                toast.success('Doctor Updated Successfully!!!');
                setOpen(false);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (

        <ReFullModal open={open} setOpen={setOpen} title="Update Doctor">
            <ReUseForm onSubmit={handleSubmit} resolver={zodResolver(doctorSchema)} defaultValues={defaultValues}>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Name" name="name" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Email" name="email" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Contact Number" name="contactNumber" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Address" name="address" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Registration Number" name="registrationNumber" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Experience" name="experience" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Appointment Fee" name="apointmentFee" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Qualification" name="qualification" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Current Working Place" name="currentWorkingPlace" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Designation" name="designation" />
                    </Grid>
                </Grid>
                <Button sx={{ mt: 1 }} type="submit">
                    Update
                </Button>
            </ReUseForm>
        </ReFullModal>

    );
};

export default DoctorUpdate;
