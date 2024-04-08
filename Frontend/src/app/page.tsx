
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
import { QueryClient, QueryClientProvider, useMutation, useQueries, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import SignIn from './components/signIn/SignIn';


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
    const response = await fetch("http://localhost:8000/api/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token',
      },
      body: JSON.stringify(signInData)
    })
    if (!response.ok) {
      throw new Error('Failed to login user')
    }
    const data = response.json();
    return data;
  } catch (error) {
    throw new Error("Error in user SignIn")
  }
}
// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export default function pages() {
  const queryClient = new QueryClient();





  return (
    <QueryClientProvider client={queryClient}>
      <SignIn />
    </QueryClientProvider>
  );
}