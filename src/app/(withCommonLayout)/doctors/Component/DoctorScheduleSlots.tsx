'use client';
import { useGetAllDoctorScheduleQuery } from '@/Redux/api/doctorScheduleApi';
import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
dayjs.extend(utc);

const DoctorScheduleSlots = ({ id }: { id: string }) => {
    const [scheduleId, setScheduleId] = useState('');

    const router = useRouter();

    const query: Record<string, any> = {};

    query['doctorId'] = id;

    query['startDate'] = dayjs(new Date())
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString();

    query['endDate'] = dayjs(new Date())
        .utc()
        .hour(23)
        .minute(59)
        .second(59)
        .millisecond(999)
        .toISOString();

    const { data: todaySchedule, isLoading: isLoadingToday } = useGetAllDoctorScheduleQuery({ ...query })

    const formatTodaySchedule = todaySchedule?.data.map((schedule) => ({
        scheduleId: schedule.scheduleId,
        slot: `${dayjs(schedule.schedule.startDate).format('HH:mm A')} - ${dayjs(schedule.schedule.endDate).format('HH:mm A')}`

    }))

    const currentDate = new Date();
    const today = currentDate.toLocaleDateString('en-US', { weekday: 'long' });


    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const tomorrow = nextDate.toLocaleDateString('en-US', { weekday: 'long' });


    query.startDate = dayjs(nextDate)
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString();

    query.endDate = dayjs(nextDate)
        .utc()
        .hour(23)
        .minute(59)
        .second(59)
        .millisecond(999)
        .toISOString();

    const { data: tomorrowSchedule, isLoading: isLoadingTomorrow } = useGetAllDoctorScheduleQuery({ ...query })

    const formatTomorrowSchedule = tomorrowSchedule?.data.map((schedule) => ({
        scheduleId: schedule.scheduleId,
        slot: `${dayjs(schedule.schedule.startDate).format('HH:mm A')} - ${dayjs(schedule.schedule.endDate).format('HH:mm A')}`

    }))

    if (isLoadingToday || isLoadingTomorrow) {
        return <p>Loading...</p>
    }

    return (
        <Box mb={5}>
            <Box sx={{ bgcolor: 'white', p: 3, mt: 1 }}>
                <Typography variant='h4' mb={3} color='primary.main'>
                    Availability
                </Typography>
                <Box sx={{ my: 4 }}>
                    <Typography variant='h6' fontSize={16}>
                        <b>
                            Today:{' '}{dayjs(new Date().toISOString()).format('YYYY-MM-DD')}{' '}{today}

                        </b>
                    </Typography>
                    <Box sx={{ borderBottom: '2px dashed #d0d0d0', mt: 2, mb: 3 }} />
                    <Stack direction='row' alignItems='center' flexWrap='wrap' gap={2}>
                        {
                            ((formatTodaySchedule?.length as number) > 0) ? (
                                formatTodaySchedule?.map((schedule) => (
                                    <Button
                                        key={schedule.scheduleId}
                                        color='primary'
                                        onClick={() =>
                                            setScheduleId(schedule.scheduleId)
                                        }
                                        variant={`${schedule.scheduleId === scheduleId
                                            ? 'contained'
                                            : 'outlined'
                                            }`}
                                    >
                                        {schedule.slot}
                                    </Button>
                                ))
                            ) : (<span style={{ color: 'red' }}>
                                No Schedule is Available Today!
                            </span>)
                        }
                    </Stack>
                </Box>
                <Box>
                    <Typography variant='h6' fontSize={16}>
                        <b>
                            Tomorrow:{' '}{dayjs().add(1, 'day').format('YYYY-MM-DD')}{' '}{tomorrow}
                        </b>
                    </Typography>
                    <Box sx={{ borderBottom: '2px dashed #d0d0d0', mt: 2, mb: 3 }} />
                    <Stack direction='row' alignItems='center' flexWrap='wrap' gap={2}>
                        {
                            ((formatTomorrowSchedule?.length as number) > 0) ? (
                                formatTomorrowSchedule?.map((schedule) => (
                                    <Button
                                        key={schedule.scheduleId}
                                        color='primary'
                                        onClick={() =>
                                            setScheduleId(schedule.scheduleId)
                                        }
                                        variant={`${schedule.scheduleId === scheduleId
                                            ? 'contained'
                                            : 'outlined'
                                            }`}
                                    >
                                        {schedule.slot}
                                    </Button>
                                ))
                            ) : (<span style={{ color: 'red' }}>
                                No Schedule is Available Today!
                            </span>)
                        }
                    </Stack>
                </Box>
            </Box>

            <Button
                sx={{ display: 'block', mx: 'auto', my: 1 }}
            >
                Book Appointment Now
            </Button>
        </Box >
    );
};

export default DoctorScheduleSlots;