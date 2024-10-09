import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import { removeAccessToken } from '@/Service/actions/authservice';
import { useRouter } from 'next/navigation';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogOut = () => {
        setAnchorEl(null);
        removeAccessToken();
        router.push('/login')
    };

    return (
        <>
            <IconButton
                id="account-menu-button"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    backgroundColor: '#ffffff',
                    boxShadow: 1,
                    padding: '8px',
                    borderRadius: '12px',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                        boxShadow: 2,
                    },
                    transition: 'background-color 0.3s, box-shadow 0.3s',
                }}
            >
                <KeyboardArrowDownIcon sx={{ color: 'primary.main' }} />
            </IconButton>

            <Menu
                id="account-menu"
                aria-labelledby="account-menu-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        borderRadius: '10px',
                        minWidth: 160,
                    },
                }}
            >
                <MenuItem onClick={handleClose} sx={{ color: 'primary.main' }}>
                    Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut} sx={{ color: 'red' }}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountMenu;
