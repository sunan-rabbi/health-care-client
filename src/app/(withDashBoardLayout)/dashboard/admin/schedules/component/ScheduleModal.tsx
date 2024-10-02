import ReUseForm from '@/components/Shared/Form/ReForm';
import ReModal from '@/components/Shared/Modal/ReModal';
import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { set } from 'react-hook-form';

type IProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ScheduleModal = ({ open, setOpen }: IProps) => {

    const handleSubmit = async () => {
        try {

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <ReModal open={open} setOpen={setOpen} title='Create schedule'>
            <ReUseForm onSubmit={handleSubmit}>
                <Button type='submit'>Create</Button>
            </ReUseForm>
        </ReModal>
    );
};

export default ScheduleModal;