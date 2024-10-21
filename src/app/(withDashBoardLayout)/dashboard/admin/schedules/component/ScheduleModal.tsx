import ReDatePicker from '@/components/Shared/Form/ReDatePicker';
import ReUseForm from '@/components/Shared/Form/ReForm';
import ReTimePicker from '@/components/Shared/Form/ReTimePicker';
import ReModal from '@/components/Shared/Modal/ReModal';
import { Button, Grid } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { FieldValues } from 'react-hook-form';
import dayjs from 'dayjs';
import { useCreateScheduleMutation } from '@/Redux/api/scheduleApi';
import { toast } from 'sonner';

type IProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ScheduleModal = ({ open, setOpen }: IProps) => {

    const [createSchedule] = useCreateScheduleMutation()

    const handleSubmit = async (data: FieldValues) => {
        const id = toast.loading("Creating Schedule...")
        try {
            // Formatting the values from the form to match your required format
            const formattedData = {
                startDate: dayjs(data.startDate).format('YYYY-MM-DD'),  // Format to YYYY-MM-DD
                endDate: dayjs(data.endDate).format('YYYY-MM-DD'),      // Format to YYYY-MM-DD
                startTime: dayjs(data.startTime).format('HH:mm'),       // Format to HH:mm (24-hour format)
                endTime: dayjs(data.endTime).format('HH:mm'),           // Format to HH:mm (24-hour format)
            };

            const res = await createSchedule(formattedData)

            if (res?.data?.length > 0) {
                toast.success('Schedule is Created Successfully!!!', { id })
                setOpen(false)
            }

        } catch (error: any) {
            console.log(error)
            toast.error(error.message, { id });
        }
    }

    return (
        <ReModal open={open} setOpen={setOpen} title='Create schedule'>
            <ReUseForm onSubmit={handleSubmit}>
                <Grid container mb={2} spacing={2}>
                    <Grid item md={12}>
                        <ReDatePicker name='startDate' label='Start Date' />
                    </Grid>
                    <Grid item md={12}>
                        <ReDatePicker name='endDate' label='End Date' />
                    </Grid>
                    <Grid item md={6}>
                        <ReTimePicker name='startTime' label='Start Time' />
                    </Grid>
                    <Grid item md={6}>
                        <ReTimePicker name='endTime' label='End Time' />
                    </Grid>
                </Grid>
                <Button type='submit'>Create</Button>
            </ReUseForm>
        </ReModal>
    );
};

export default ScheduleModal;
