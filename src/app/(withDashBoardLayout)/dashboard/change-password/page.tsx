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
import { useChangePasswordMutation } from "@/Redux/api/authApi";


const loginValidationSchema = z.object({
    oldPassword: z.string().min(8, "Password Must 8 characters"),
    newPassword: z.string().min(8, "Password Must 8 characters")
})

const defaultValues = {
    oldPassword: '',
    newPassword: ''
}

const ChangePasswordPage = () => {

    const [changePassword] = useChangePasswordMutation()

    const handleChangePassword = async (data: FieldValues) => {

        const loadingId = toast.loading("Password Changing!!!")
        try {
            const response = await changePassword(data).unwrap()

            if (response.success) {
                toast.success(response.message, { id: loadingId })
            }
            else {
                toast.error(response.message)
                throw new Error()
            }
        } catch (error: any) {
            toast.error("Failed to Change", { id: loadingId })
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
                                Change Password
                            </Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ margin: '30px 0px' }}>
                        <ReUseForm onSubmit={handleChangePassword} resolver={zodResolver(loginValidationSchema)} defaultValues={defaultValues} >
                            <Grid container spacing={2}>
                                <Grid item md={6}>
                                    <ReUseInput
                                        name="oldPassword"
                                        label="Old Password"
                                        type="password"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <ReUseInput
                                        name="newPassword"
                                        label="New Password"
                                        type="password"
                                        fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" sx={{ margin: '15px 0px 15px 0px' }} fullWidth={true}>Change</Button>
                        </ReUseForm>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default ChangePasswordPage;