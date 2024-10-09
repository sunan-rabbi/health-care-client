'use client';
import ReUseForm from "@/components/Shared/Form/ReForm";
import ReModal from "@/components/Shared/Modal/ReModal";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import dayjs from "dayjs";
import { useGetAllScheduleQuery } from "@/Redux/api/scheduleApi";
import { ISchedules } from "@/type";
import utc from 'dayjs/plugin/utc';
import { Button, Grid } from "@mui/material";
import ReUseSelect from "@/components/Shared/Form/ReSelect";
import MultipleSelectChip from "./MultipleSelect";
import LoadingButton from '@mui/lab/LoadingButton';


dayjs.extend(utc);

type IModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DoctorScheduleModal = ({ open, setOpen }: IModal) => {
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()).toISOString());
    const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);

    const query: Record<string, any> = {};

    if (selectedDate) {
        const startOfDay = dayjs.utc(selectedDate).startOf('day');
        const endOfDay = dayjs.utc(selectedDate).endOf('day');

        query['startDate'] = startOfDay.toISOString();
        query['endDate'] = endOfDay.toISOString();
    }

    const { data } = useGetAllScheduleQuery(query);
    const schedules = data?.schedules as ISchedules[];

    const handleSubmit = async (value: FieldValues) => {
        try {

            console.log("Submitted values:", value);

            setOpen(false);
        } catch (error) {
            console.error("Error submitting:", error);
            toast.error("An error occurred while submitting the schedule.");
        }
    }

    return (
        <ReModal open={open} setOpen={setOpen} title='Create A Doctor Schedule'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{ m: 1, width: 300 }}
                    label="Date Picker"
                    value={dayjs(selectedDate)}
                    onChange={(newValue) => setSelectedDate(dayjs(newValue).toISOString())}
                />
            </LocalizationProvider>
            <MultipleSelectChip schedules={schedules} selectedSchedules={selectedSchedules} setSelectedSchedules={setSelectedSchedules} />
            <LoadingButton
                size='small'
                onClick={handleSubmit}
                loading={true}
                loadingIndicator='submitting...'
                variant="contained"
            >
                <span>Fetch Data</span>
            </LoadingButton>
        </ReModal>
    );
};

export default DoctorScheduleModal;
