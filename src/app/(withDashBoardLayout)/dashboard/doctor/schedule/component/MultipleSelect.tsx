import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { ISchedules } from '@/type';
import dayjs from 'dayjs';

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

type IMultiple = {
    schedules: ISchedules[],
    selectedSchedules: string[],
    setSelectedSchedules: React.Dispatch<React.SetStateAction<string[]>>
}

export default function MultipleSelectChip({ schedules, selectedSchedules, setSelectedSchedules }: IMultiple) {

    const convertedDate = schedules.map(item => {
        const start = dayjs(item.startDate).format('hh:mm A');
        const end = dayjs(item.endDate).format('hh:mm A');
        const value = `${start} to ${end}`;

        return {
            id: item.id,
            value: value
        };
    });

    const theme = useTheme();


    const handleChange = (event: SelectChangeEvent<typeof selectedSchedules>) => {
        const {
            target: { value },
        } = event;
        setSelectedSchedules(

            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Time Slot</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedSchedules}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                                const selectValue = convertedDate.find(schedule => schedule.id === value)
                                return <Chip key={value} label={selectValue?.value} />
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {convertedDate.map((Date) => (
                        <MenuItem
                            key={Date.id}
                            value={Date.id}
                            style={getStyles(Date.value, selectedSchedules, theme)}
                        >
                            {Date.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
