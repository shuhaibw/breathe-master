"use client"

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function SignOut() {
    
    useEffect(() => {
        
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
    }, [])
    return <>
    </>
}