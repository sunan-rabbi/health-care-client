"use client"
import assets from "@/assets";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ReUseForm from "@/components/Shared/Form/ReForm";
import ReUseInput from "@/components/Shared/Form/ReInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/Redux/api/authApi";


const resetValidationSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters")
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


const defaultValues = {
    newPassword: '',
    confirmPassword: '',
}


const resetPasswordPage = () => {

    const params = useSearchParams()
    const id = params.get('id')
    const token = params.get('token')

    const router = useRouter()
    const [resetPassword] = useResetPasswordMutation()

    const handleResetPassword = async (data: FieldValues) => {

        const values = {
            id,
            newPassword: data?.newPassword
        }
        localStorage.setItem('accessToken', token as string)

        try {
            const response = await resetPassword(values).unwrap()

            if (response.status === 200) {
                toast.success("Password is Changed successfully!!!")
                localStorage.removeItem('accessToken')
                router.push('/login')
            }
            else {
                toast.error(response.message)
                throw new Error()
            }
        } catch (error: any) {
            toast.error("Failed to Change")
        }

    }
    return (
        <Container>
            <Stack
                marginTop={10}
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
                                Reset Password
                            </Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ margin: '30px 0px' }}>
                        <ReUseForm onSubmit={handleResetPassword} resolver={zodResolver(resetValidationSchema)} defaultValues={defaultValues} >
                            <Grid container spacing={2}>
                                <Grid item md={12}>
                                    <ReUseInput
                                        name="newPassword"
                                        label="New Password"
                                        type="password"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <ReUseInput
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" sx={{ margin: '15px 0px 15px 0px' }} fullWidth={true}>Submit</Button>
                        </ReUseForm>
                    </Box>
                </Box>
            </Stack>
        </Container>);
};

export default resetPasswordPage;