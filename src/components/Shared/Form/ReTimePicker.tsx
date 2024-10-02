import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type ITimePicker = {
    name: string;
    label?: string;
    size?: "small" | 'medium';
    fullWidth?: boolean;
    required?: boolean;
    sx?: SxProps;
}

const ReTimePicker = ({ name, label, size = 'small', required, fullWidth = true, sx }: ITimePicker) => {

    const { control, formState } = useFormContext()
    const isError = formState.errors[name] !== undefined

    return (

        <Controller
            control={control}
            name={name}
            defaultValue={dayjs(new Date().toTimeString())}
            render={({ field: { onChange, value, ...field } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label={label}
                        {...field}
                        value={value || Date.now()}
                        onChange={(time) => onChange(time)}
                        timezone='system'
                        slotProps={{
                            textField: {
                                required: required,
                                size: size,
                                sx: {
                                    ...sx
                                },
                                variant: 'outlined',
                                fullWidth: fullWidth,
                                error: isError,
                                helperText: isError
                                    ? (formState.errors[name]?.message as string) : ''
                            }
                        }}
                    />
                </LocalizationProvider>
            )}

        />

    );
}

export default ReTimePicker