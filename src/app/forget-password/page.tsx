"use client"
import assets from "@/assets";
import { Alert, Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ReUseForm from "@/components/Shared/Form/ReForm";
import ReUseInput from "@/components/Shared/Form/ReInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logoutUser from "@/Service/actions/logOut";
import { useRouter } from "next/navigation";
import { useForgetPasswordMutation } from "@/Redux/api/authApi";
import CheckIcon from '@mui/icons-material/Check';


const loginValidationSchema = z.object({
    email: z.string().email('Provide a Valid Email Address!!!')
})

const defaultValues = {
    email: ''
}

const ForgetPasswordPage = () => {
    const router = useRouter()
    const [forgetPassword, { isSuccess }] = useForgetPasswordMutation()

    const handleForgetPassword = async (data: FieldValues) => {

        try {
            const response = await forgetPassword(data).unwrap()
            console.log(response);
            if (response.status === 200) {
                toast.success("Reset Link is sent to Your email Address")
                logoutUser(router)
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
                                Forget Password
                            </Typography>
                        </Box>
                    </Stack>
                    {
                        isSuccess ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            Reset Link is sent to Your email Address
                        </Alert> : <Box sx={{ margin: '30px 0px' }}>
                            <ReUseForm onSubmit={handleForgetPassword} resolver={zodResolver(loginValidationSchema)} defaultValues={defaultValues} >
                                <Grid container spacing={2}>
                                    <Grid item md={12}>
                                        <ReUseInput
                                            name="email"
                                            label="Email"
                                            type="email"
                                            fullWidth={true}
                                        />
                                    </Grid>
                                </Grid>
                                <Button type="submit" sx={{ margin: '15px 0px 15px 0px' }} fullWidth={true}>Submit</Button>
                            </ReUseForm>
                        </Box>
                    }
                </Box>
            </Stack>
        </Container>);
};

export default ForgetPasswordPage;