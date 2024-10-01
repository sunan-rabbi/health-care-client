import { useCreateDoctorMutation } from "@/Redux/api/Doctor/doctorApi";
import ReUseForm from "@/components/Shared/Form/ReForm";
import ReUseInput from "@/components/Shared/Form/ReInput";
import ReUseSelect from "@/components/Shared/Form/ReSelect";
import ReFullModal from "@/components/Shared/Modal/ReFullModal";
import { modifyPayload } from "@/utils/FormData/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


type IModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const doctorSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    name: z.string().min(1, { message: 'Name cannot be empty' }),
    contactNumber: z.string().min(11, { message: 'Invalid contact number format' }),
    address: z.string().min(1, { message: 'Address cannot be empty' }),
    registrationNumber: z.string().min(1, { message: 'Registration number cannot be empty' }),
    experience: z.string().min(1, { message: 'Experience must be a non-negative integer' }),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER'], { message: 'Invalid gender value' }),
    apointmentFee: z.string().min(0, { message: 'Appointment fee must be a non-negative number' }),
    qualification: z.string().min(1, { message: 'Qualification cannot be empty' }),
    currentWorkingPlace: z.string().min(1, { message: 'Current working place cannot be empty' }),
    designation: z.string().min(1, { message: 'Designation cannot be empty' }),
});

const schema = z.object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    doctor: doctorSchema,
});
const defaultValues = {
    password: "",
    doctor: {
        email: "",
        name: "",
        contactNumber: "",
        address: "",
        registrationNumber: "",
        experience: "",
        gender: "",
        apointmentFee: "",
        qualification: "",
        currentWorkingPlace: "",
        designation: ""
    }
}

const DoctorModal = ({ open, setOpen }: IModal) => {
    const [createDoctor] = useCreateDoctorMutation()
    const handleSubmit = async (value: FieldValues) => {
        value.doctor.apointmentFee = Number(value.doctor.apointmentFee)
        value.doctor.experience = Number(value.doctor.experience)
        const data = modifyPayload(value)
        const id = toast.loading("Creating Doctor...")
        try {
            const res = await createDoctor(data).unwrap()
            if (res?.id) {
                toast.success('Doctor Created Successfully!!!', { id })
                setOpen(false)
            }

        } catch (error: any) {
            console.log(error);
            toast.error(error.message, { id });
        }

    }
    return (
        <ReFullModal open={open} setOpen={setOpen} title="Create Doctor" >
            <ReUseForm onSubmit={handleSubmit} defaultValues={defaultValues} resolver={zodResolver(schema)}>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Name" name="doctor.name" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Email" name="doctor.email" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="password" label="Password" name="password" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Contact Number" name="doctor.contactNumber" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Address" name="doctor.address" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Registration Number" name="doctor.registrationNumber" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Experience" name="doctor.experience" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseSelect type="text" label="Gender" name="doctor.gender" options={['MALE', 'FEMALE']} />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Appointment Fee" name="doctor.apointmentFee" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Qualification" name="doctor.qualification" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Current Working Place" name="doctor.currentWorkingPlace" />
                    </Grid>
                    <Grid item md={4}>
                        <ReUseInput type="text" label="Designation" name="doctor.designation" />
                    </Grid>
                </Grid>
                <Button sx={{ mt: 1 }} type="submit">Create</Button>
            </ReUseForm>
        </ReFullModal>
    );
};

export default DoctorModal;