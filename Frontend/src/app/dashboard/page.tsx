'use client'
import React from 'react'
import Cookies from 'js-cookie'
import { response } from 'express'
import { redirect, useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query';
import { cookies } from 'next/headers'






export default function pages() {
    const fetchAuth = async (req: any) => {

        try {
            const token = Cookies.get('auth_token');
            if (!token) return router.push('../')
            const response = await fetch("http://localhost:8000/auth/", {
                method: 'GET',
                headers: {
                    'auth_token': `${Cookies.get('auth_token')}`
                }
            });
            const data = response.json();
            return data;
        } catch (error) {
            console.log("error in fetch auth Function");

        }
    };
    const { data, isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: fetchAuth
    })
    const router = useRouter();

    if (isLoading) {
        return <div>Loading</div>
    };
    return (
        <div>
            Dash board page
        </div>
    )
}
