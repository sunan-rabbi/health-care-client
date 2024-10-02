"use client"
import { Box, Button } from "@mui/material";
import { useState } from 'react'
import ScheduleModal from "./component/ScheduleModal";


const schedulesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <Box>
            <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
            <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
            <Box my={5}>
                Display Schedule
            </Box>
        </Box>
    );
};

export default schedulesPage;