
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
import Cookies from 'js-cookie';
import { useMutation, MutateFunction, useQueryClient, useQuery } from '@tanstack/react-query'
import { promises } from 'dns';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'console';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';


interface SignUpData {
    firstName: string;
    lastName: string;
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


const addData = async (signUpData: SignUpData): Promise<any> => {
    try {
        const response = await fetch('http://localhost:8000/api/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData)
        });
        if (!response.ok) {
            throw new Error('Failed to create user')
        }
        const data = response.json();


        return data;
    } catch (error) {
        console.log("error in  data sign up", error);

    }
};

const fetchToken = async (req: any): Promise<any> => {
    try {
        const response = await fetch("http://localhost:8000/auth/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': `${Cookies.get('auth_token')}`
            }
        });
        const data = await response.json()


        return data;
    } catch (error) {
        console.log("Error in fetch token", error);

    }
};
// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export default function SignUp() {
    const [signUpData, setSignUpData] = React.useState<SignUpData>({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const router = useRouter();
    // const mutation = useMutation({ mutationFn: (newData: SignUpData) => addData(newData) })
    const { isPending, mutateAsync, } = useMutation({
        mutationFn: addData,
        onSuccess: async ({ token }) => {
            await Cookies.set('auth_token', token, { expires: 7, secure: true });
            router.push('/dashboard')
        }
    });

    const { data, } = useQuery({
        queryKey: ['auth_token'],
        queryFn: fetchToken,
    })



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }


        try {
            e.currentTarget.reset();
            await mutateAsync(userData)

        } catch (error) {
            console.error("Error creating user", error);
        }
    }
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
                        Sign Up
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            disabled={isPending}
                        >
                            Sign Up
                        </Button>
                        <Grid
                            container
                            item
                            justifyContent='center'

                        >
                            <Link href="./" >
                                {"Don't have an account? Sign Up"}
                            </Link>

                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    );
}