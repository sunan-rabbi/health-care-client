'use client'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useGetAllSpecialityQuery } from '@/Redux/api/specialityApi';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';

const ScrollData = () => {

    const [value, setValue] = useState('');
    const { data } = useGetAllSpecialityQuery({});
    const router = useRouter();


    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        router.push(`/doctors?specialties=${newValue}`);
    };

    return (
        <Box display='flex' justifyContent='center' alignItems='center' sx={{ maxWidth: { xs: 320, sm: 480, lg: '100%' }, bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab
                    key='1e2en13iu1312'
                    label='All'
                    value="all"
                    sx={{ fontWeight: 600 }}
                />
                {data?.map((specialty: any) => (
                    <Tab
                        key={specialty.id}
                        label={specialty.title}
                        value={specialty.title}
                        sx={{ fontWeight: 600 }}
                    />
                ))}

            </Tabs>
        </Box>
    );
};

export default ScrollData;