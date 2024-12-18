import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Container } from "@mui/material"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { Grid } from '@mui/joy';


const Sign = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <>
            <Container sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: "translate(-50%, -50%)",
                height: '70vh',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>

                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 0 10px 1px  #ddd',
                        padding: '20px',
                        borderRadius: '5px',
                        '& .MuiTextField-root': { m: 1, width: '40ch' }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        label="Email"
                    />
                    <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
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
                                navigate('/Home');
                            }} >Back to Home Page</Button>
                        <Button
                            disableRipple
                            size="small"
                            variant="contained"
                            sx={{
                                marginLeft: '10px',
                                textTransform: 'none',

                            }}
                        >
                            Submit
                        </Button>
                    </Grid>

                </Box>



            </Container>
            <Button variant="outlined" startIcon={<ArrowBackIosOutlinedIcon />} onClick={() => {
                navigate(-1);
            }}
            >Back</Button>
        </>
    )
}

export default Sign