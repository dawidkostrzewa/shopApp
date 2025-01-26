
import { useNavigate } from 'react-router-dom';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { Box, Grid } from "@mui/joy"
import { Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { useState } from 'react'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BoxLogin, ContainerLogin } from '../../../Context/AppContext';

export type LoginData = {
    email: string;
    password: string;
}
const Sign = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    });
    return (
        <>
            <Container sx={ContainerLogin}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={BoxLogin}
                >
                    <TextField
                        required
                        label="Email"
                        onChange={(e) => {
                            setLoginData(
                                {
                                    ...loginData,
                                    email: e.target.value
                                }
                            )
                        }}
                    />
                    <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => {
                                setLoginData(
                                    {
                                        ...loginData,
                                        password: e.target.value
                                    }
                                )
                            }}
                            endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <Grid
                        container
                        sx={{
                            margin: '0 0 0 auto',
                        }}
                    >
                        <Button
                            size="small"
                            variant="contained"
                            sx={{
                                textTransform: 'none',
                            }}
                            onClick={() => {
                                navigate('/Registration');
                            }} >Registration</Button>
                        <Button
                            size="small"
                            variant="contained"
                            sx={{
                                textTransform: 'none',
                                margin: '0 10px',
                            }}
                            onClick={() => {
                                navigate('/Home');
                            }} >Back to Home Page</Button>
                        <Button
                            disableRipple
                            size="small"
                            variant="contained"
                            disabled={loginData.email.length === 0 || loginData.password.length === 0}
                            sx={{
                                textTransform: 'none',
                            }}
                            onClick={() => {
                                alert(`login: ${loginData.email} password: ${loginData.password}`)
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Box>
            </Container >
            <Button variant="outlined" startIcon={<ArrowBackIosOutlinedIcon />} onClick={() => {
                navigate(-1);
            }}
            >Back</Button>
        </>
    )
}

export default Sign