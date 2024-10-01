import List from '@mui/material/List';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import assets from '@/assets';
import Link from 'next/link';
import { drawerItems } from '@/utils/drawerItem';
import { UserRole } from '@/type';
import SidebarListItem from './Sidebar';
import { useEffect, useState } from 'react';
import { getUserInfo } from '@/Service/actions/authservice';


const SidebarItem = () => {
    const [userRole, setUserRole] = useState('')
    useEffect(() => {
        const { role } = getUserInfo() as any
        setUserRole(role)
    }, [])
    return (
        <Box>
            <Stack
                sx={{
                    py: 1,
                    mt: 1
                }}
                direction='row'
                justifyContent='center'
                alignContent='center'
                gap={2}
                component={Link}
                href='/'
            >
                <Image src={assets.svgs.logo} alt='logo' width={40} height={40} />
                <Typography variant="h6" component='h1' fontWeight={600}>
                    <Box component='span' color='primary.main'>H</Box>ealth Care
                </Typography>
            </Stack>
            <List>
                {drawerItems(userRole as UserRole).map((item, index) => (
                    <SidebarListItem key={index} item={item} />
                ))}
            </List>
        </Box>
    );
};

export default SidebarItem;