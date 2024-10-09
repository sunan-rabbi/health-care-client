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
    const [userRole, setUserRole] = useState<UserRole | ''>('');  // State for user role

    useEffect(() => {
        const userInfo = getUserInfo();  // Retrieve user info

        if (userInfo && userInfo.role) {  // Check if role exists
            setUserRole(userInfo.role);
        } else {
            console.error("No valid user info or role found.");
            setUserRole('');  // Set to empty string or a default role if needed
        }
    }, []);

    const roleMenuItems = drawerItems(userRole as UserRole);  // Pass userRole to drawerItems function

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
                {roleMenuItems.map((item, index) => (
                    <SidebarListItem key={index} item={item} />
                ))}
            </List>
        </Box>
    );
};

export default SidebarItem;
