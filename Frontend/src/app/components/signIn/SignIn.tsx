
'use client';


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'console';
import { redirect, useRouter } from 'next/navigation';


interface SignIn {
    email: string;
    password: string;
}
function Copyright(props: any) {



    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const signIn = async (signInData: SignIn): Promise<any> => {
    try {
        const response = await fetch("http://localhost:8000/api/signIn", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth_token': `${Cookies.get('auth_token')}`,
            },
            body: JSON.stringify(signInData)
        })
        if (!response.ok) {
            throw new Error('Failed to login user')
        }

        const data = response.json();
        return data;
    } catch (error) {
        console.log("Error in user SignIn", error);

    }
};
const fetchToken = async (req: any): Promise<any> => {
    try {
        const response = await fetch("http://localhost:8000/auth/", {
            method: 'GET',
            headers: {
                'auth_token': `${Cookies.get('auth_token')}`
            }
        });
        const data = await response.json()
        console.log("Token", data);

        return data;
    } catch (error) {
        console.log("Error in fetch token");

    }
};
// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export default function SignIn() {
    const router = useRouter();
    const { data, isLoading } = useQuery({
        queryKey: ['auth_token'],
        queryFn: fetchToken,

    })
    if (isLoading) {
        return <div>Loading</div>
    }


    const { isPending, mutateAsync } = useMutation({
        mutationFn: signIn,
        onSuccess: async ({ token }) => {

            await Cookies.set('auth_token', token, { expires: 7, secure: true });
            router.push('/dashboard')
        }

    })







    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('email') as string,
            password: data.get('password') as string,
        };
        try {
            event.currentTarget.reset();
            await mutateAsync(userData)


        } catch (error) {
            console.log("error", error);

        }
    };



    return (
        <>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isPending ? 'Loading...' : 'sign In'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="./signUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>

        </>
    );
}