'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

export default function RegisterPage() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [isCreatingUser, setIsCreatingUser]=useState(false)
    const [createdUser, setCreatedUser]=useState(false)
    const [isError, setIsError]=useState(false)
    const handleSubmitForm=async(e)=>{
        e.preventDefault();
        setIsCreatingUser(true)
        const res= await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        if(res.ok){
          setCreatedUser(true)
        }else{
          setIsError(true)
          setCreatedUser(false)
        }
        
        setIsCreatingUser(false)
    }
  return (
    <div className="my-9">
      <div className="text-2xl text-primary font-bold text-center">Register</div>
      {createdUser && <div className="text-center font-semibold"> User created, now you can <Link href="/login" className="underline">Login</Link></div>}
      {isError && <div className="text-red-500 text-center font-semibold"> An error has occured, please try again!</div>}

      <form action="" className="max-w-xs mx-auto" onSubmit={handleSubmitForm}>
        <input type="email" placeholder="email" disabled={isCreatingUser} required value={email} onChange={e=> setEmail(e.target.value)} />
        <input type="password" placeholder="password" required disabled={isCreatingUser} value={password} onChange={e=> setPassword(e.target.value)}/>
        <button type="submit">Registers</button>
        <div className='text-center my-4'>or login with provider</div>
        <button onClick={()=> signIn("google", {callbackUrl:'/'})} className="flex  gap-2 justify-center items-center" disabled={isCreatingUser}>
            <Image src="/google.png" alt="google" width={'30'} height={'30'} />
            Login with google
        </button>
        <div className='text-center my-4'>
          Existing account? <Link href="/login" className="underline">Login here &raquo;</Link>
        </div>
      </form>
    </div>
  )
}
