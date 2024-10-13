import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useGetAllSpecialityQuery } from '@/Redux/api/specialityApi';
import { Skeleton } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

type ISpeciality = {
    id: string;
    title: string;
    icon: string;
}

type IMultiple = {
    selectedSpeciality: string[],
    setSelectedSpeciality: React.Dispatch<React.SetStateAction<string[]>>
}

export default function MultipleSelected({ selectedSpeciality, setSelectedSpeciality }: IMultiple) {


    const theme = useTheme();
    const { data: convertedDate, isLoading, isFetching } = useGetAllSpecialityQuery({})

    if (isFetching || isLoading) {
        return <Skeleton variant="rounded" width="100%" height={130} />;
    }


    const handleChange = (event: SelectChangeEvent<typeof selectedSpeciality>) => {
        const {
            target: { value },
        } = event;
        setSelectedSpeciality(

            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-chip-label">Speciality</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    fullWidth
                    value={selectedSpeciality}
                    size='small'
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                                const selectValue = convertedDate.find((schedule: ISpeciality) => schedule.id === value)
                                return <Chip key={value} label={selectValue?.title} />
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {convertedDate.map((Date: ISpeciality) => (
                        <MenuItem
                            key={Date.id}
                            value={Date.id}
                            style={getStyles(Date?.title, selectedSpeciality, theme)}
                        >
                            {Date?.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
