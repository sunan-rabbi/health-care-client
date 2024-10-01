import * as React from 'react';
import { SxProps, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@mui/material';

type IUpload = {
    name: string;
    label: string;
    sx?: SxProps
}

export const ReUseUpload = ({ name, label, sx }: IUpload) => {
    const { control } = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{ ...sx }}
                >
                    {label || 'Upload file'}
                    <Input
                        {...field}
                        type={name}
                        value={value?.fileName}
                        onChange={(e) => onChange((e?.target as HTMLInputElement).files?.[0])}
                        sx={{ display: 'none' }}
                    />
                </Button>
            )}
        />
    )
}