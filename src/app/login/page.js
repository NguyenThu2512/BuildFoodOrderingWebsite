'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import {signIn} from "next-auth/react";

function LoginPage() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [loginProcess, setLoginProcess]=useState(false)
    const [createdUser, setCreatedUser]=useState(false)
    const [isError, setIsError]=useState(false)
    const handleSubmitForm=async(e)=>{
        e.preventDefault();
        await signIn('credentials', {email, password, callbackUrl:'/'})
    }
  return (
    <div className="my-9">
      <div className="text-4xl text-primary font-bold text-center">Login</div>
      
      <form action="" className="max-w-xs mx-auto" onSubmit={handleSubmitForm}>
        <input type="email" placeholder="email" disabled={loginProcess}  value={email} onChange={e=> setEmail(e.target.value)} />
        <input type="password" placeholder="password"  disabled={loginProcess} value={password} onChange={e=> setPassword(e.target.value)}/>
        <button type="submit">Login</button>
        <div className='text-center my-4'>or login with provider</div>
        <button onClick={()=> signIn("google", {callbackUrl:'/'})} className="flex  gap-2 justify-center items-center" disabled={loginProcess}>
            <Image src="/google.png" alt="google" width={'30'} height={'30'} />
            Login with google
        </button>
        <div className='text-center my-4'>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
