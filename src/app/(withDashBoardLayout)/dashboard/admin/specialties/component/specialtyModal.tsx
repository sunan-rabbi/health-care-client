import { useCreateSpecialityMutation } from "@/Redux/api/specialityApi";
import ReUseForm from "@/components/Shared/Form/ReForm";
import ReUseInput from "@/components/Shared/Form/ReInput";
import { ReUseUpload } from "@/components/Shared/Form/ReUpload";
import ReModal from "@/components/Shared/Modal/ReModal";
import { modifyPayload } from "@/utils/FormData/modifyPayload";
import { Button, Grid, TextField } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type IModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SpecialtyModal = ({ open, setOpen }: IModal) => {
    const [createSpeciality] = useCreateSpecialityMutation()
    const handleSubmit = async (value: FieldValues) => {
        const data = modifyPayload(value)
        try {
            const id = toast.loading("Creating Speciality")
            const res = await createSpeciality(data).unwrap()
            if (res?.id) {
                toast.success('Speciality Created Successfully!!!', { id })
                setOpen(false)

            }
        } catch (error: any) {
            console.log(error.message);
        }

    }
    return (
        <ReModal open={open} setOpen={setOpen} title='Create A New Specialist'>
            <ReUseForm onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <ReUseInput type="text" label="Title" name="title" />
                    </Grid>
                    <Grid item md={6}>
                        <ReUseUpload name="file" label="File Upload" />
                    </Grid>
                </Grid>
                <Button sx={{ mt: 1 }} type="submit">Create</Button>
            </ReUseForm>
        </ReModal>
    );
};

export default SpecialtyModal;