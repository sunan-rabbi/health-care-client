import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Controller, useFormContext } from 'react-hook-form';
import { SxProps } from '@mui/material';

type IDatePicker = {
    name: string;
    label?: string;
    size?: "small" | 'medium';
    fullWidth?: boolean;
    required?: boolean;
    sx?: SxProps;
}

const ReDatePicker = ({ name, label, size = 'small', required, fullWidth = true, sx }: IDatePicker) => {

    const { control, formState } = useFormContext();
    const isError = formState.errors[name] !== undefined;

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={dayjs(new Date().toDateString())}
            render={({ field: { onChange, value, ...field } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label={label}
                        disablePast
                        {...field}
                        onChange={(date: Dayjs | null) => onChange(date)}
                        value={value ? dayjs(value) : dayjs()}
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

export default ReDatePicker;
