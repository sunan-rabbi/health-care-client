import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DialogContent, DialogTitle, Stack, SxProps } from '@mui/material';
import { BootstrapDialog } from './ReModal';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type IModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    children: React.ReactNode;
    sx?: SxProps
}

export default function ReFullModal({ open = false, setOpen, title = '', children, sx }: IModal) {


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                fullScreen
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{ ...sx }}
                TransitionComponent={Transition}
            >
                <Stack direction='row' justifyContent='space-between' alignItems="center">
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        {title}
                    </DialogTitle>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment >
    );
}
