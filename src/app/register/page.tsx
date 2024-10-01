"use client"
import { saveAccessToken } from "@/Service/actions/authservice";
import { createPatient } from "@/Service/actions/createPatient";
import { login } from "@/Service/actions/login";
import assets from "@/assets";
import ReUseForm from "@/components/Shared/Form/ReForm";
import ReUseInput from "@/components/Shared/Form/ReInput";
import { modifyPayload } from "@/utils/FormData/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const patientSchema = z.object({
    name: z.string().min(1, "Give a valid Name"),
    email: z.string().email('Please Provide a valid Email'),
    contactNumber: z.string().regex(/^\d{11}/, 'Please Provide a valid Contact Number'),
    address: z.string().min(1, 'Give a proper Address')
})

const RegisterSchema = z.object({
    password: z.string().min(8, "Password Must 8 characters"),
    patient: patientSchema
})

const defaultValues = {
    password: '',
    patient: {
        name: '',
        email: '',
        contactNumber: '',
        address: ''
    }
}

const RegisterPage = () => {
    const router = useRouter()
    const [error, setError] = useState('')

    const onSubmit = async (data: FieldValues) => {

        const formData = modifyPayload(data)

        const loadingId = toast.loading("Creating Patient...")
        try {
            const response = await createPatient(formData)

            if (response.success === false) {
                throw new Error(response)
            }

            if (response.success) {
                toast.success(response.message, { id: loadingId })
                const userInfo = await login({ email: data.patient.email, password: data.password });

                if (userInfo.success === false) {
                    throw new Error(userInfo)
                }
                if (userInfo.success) {
                    saveAccessToken({ accessToken: userInfo.data.accessToken })
                    router.push('/dashboard')
                }
            }
            else {
                setError(response.message)
                throw new Error()
            }
        } catch (error: any) {
            toast.error("Failed to Create Patient", { id: loadingId })
        }

    }
    return (
        <Container>
            <Stack
                height="100vh"
                justifyContent='center'
                alignItems='center'>
                <Box
                    sx={{
                        boxShadow: 1,
                        maxWidth: 600,
                        width: "100%",
                        borderRadius: 1,
                        p: 4
                    }}
                >
                    <Stack justifyContent='center'
                        alignItems='center'>
                        <Box>
                            <Image src={assets.svgs.logo} alt="logo" width={50} height={50} />
                        </Box>
                        <Box>
                            <Typography component='h1' variant="h5" fontWeight={600}>
                                Register in Health Care
                            </Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ backgroundColor: 'red', margin: "8px", borderRadius: '10px' }}>
                        {
                            error &&
                            <Typography sx={{ padding: '10px', color: 'white' }} textAlign='center' >{error}</Typography>
                        }
                    </Box>
                    <Box sx={{ margin: '30px 0px' }}>
                        <ReUseForm onSubmit={onSubmit} resolver={zodResolver(RegisterSchema)} defaultValues={defaultValues}>
                            <Grid container spacing={2}>
                                <Grid item md={12}>
                                    <ReUseInput
                                        name="patient.name"
                                        label="Name"
                                        type="text"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <ReUseInput
                                        name="patient.email"
                                        label="Email"
                                        type="email"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <ReUseInput
                                        name="password"
                                        label="Password"
                                        type="password"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <ReUseInput
                                        name="patient.contactNumber"
                                        label="Contact Number"
                                        type="text"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <ReUseInput
                                        name="patient.address"
                                        label="Address"
                                        type="text"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                            <Button sx={{ margin: '15px 0px' }} fullWidth={true} type="submit">REGISTER</Button>
                        </ReUseForm>
                        <Typography component='p' textAlign='center'>
                            Do you already have an account? <Link href='/login' className="text-blue-500">Login</Link>
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default RegisterPage;