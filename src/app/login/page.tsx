"use client"
import { login } from "@/Service/actions/login";
import assets from "@/assets";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ReUseForm from "@/components/Shared/Form/ReForm";
import ReUseInput from "@/components/Shared/Form/ReInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { saveAccessToken } from "@/Service/actions/authservice";

const loginValidationSchema = z.object({
    email: z.string().email('Please Provide a Valid Email Address'),
    password: z.string().min(8, "Password Must 8 characters")
})

const defaultValues = {
    email: '',
    password: ''
}

const LoginPage = () => {

    const [error, setError] = useState('')
    const handleLogin = async (data: FieldValues) => {

        const loadingId = toast.loading("Loging...")
        try {
            const response = await login(data);

            if (response.success) {
                toast.success(response.message, { id: loadingId })
                saveAccessToken({ accessToken: response?.data?.accessToken })
            }
            else {
                setError(response.message)
                throw new Error()
            }
        } catch (error: any) {
            toast.error("Failed to Login", { id: loadingId })
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
                                Login in Health Care
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
                        <ReUseForm onSubmit={handleLogin} resolver={zodResolver(loginValidationSchema)} defaultValues={defaultValues} >
                            <Grid container spacing={2}>
                                <Grid item md={6}>
                                    <ReUseInput
                                        name="email"
                                        label="Email"
                                        type="email"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <ReUseInput
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                            <Typography textAlign='end' my={1}>
                                Forgot Password?
                            </Typography>
                            <Button type="submit" sx={{ margin: '5px 0px 15px 0px' }} fullWidth={true}>LOG IN</Button>
                        </ReUseForm>
                        <Typography component='p' textAlign='center'>
                            Don't have an account? <Link href='/register' className="text-blue-500">Create an account</Link>
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default LoginPage;