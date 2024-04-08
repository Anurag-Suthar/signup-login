
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
import SignUp from '../components/signUp/SignUp';
import { QueryClientProvider, QueryClient, } from '@tanstack/react-query';




// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export default function pages() {





    const queryClient = new QueryClient();
    return (

        <>
            <QueryClientProvider client={queryClient}>

                <SignUp />

            </QueryClientProvider>
        </>



    );
}