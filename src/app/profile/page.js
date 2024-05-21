'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const session= useSession();
    const [userName, setUserName]=useState("")
    const [isSaving, setIsSaving]=useState(false)
    const [saved, setSaved]=useState(false)
    const [phone, setPhone]=useState("")
    const [address, setAddress]=useState("")
    const [admin, setAdmin]=useState(false)
    const [allUserData, setAllUserData]=useState({})
    const status= session.status
    console.log("check ss:", session)
    const fetchUserData=async ()=>{
        const res=await fetch('/api/profile');
        const data=await res.json();
        console.log("check data", data);
        setAddress(data.address)
        setPhone(data.phone)
        setAllUserData(data)
    }
    useEffect(()=>{
        setUserName(session.data?.user?.name)
        fetchUserData();
    }, [session, status])
    const imageUser=session?.data?.user?.image;


    const handleUpdateUserInfo=async(e)=>{
        e.preventDefault();
        setSaved(false);
        setIsSaving(true)
        let response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName, phone, address, admin})
        })
        setIsSaving(false)
        if(response.ok){
            setSaved(true)
            setIsSaving(false)
        }
    }
    const handleImageChange=(event)=>{
        console.log("check event", event)
    }

    if(status==='loading'){
        return "loading..."
    }
    else if(status==='unauthenticated'){
        return redirect('/login')
    }
    
    
  return (
    <section>
        {/* <div className="text-2xl text-primary font-bold text-center">Profile</div> */}
        
        <UserTabs isAdmin={allUserData?.admin}/>
        {isSaving && <div className="max-w-xl bg-blue-100 rounded-lg mx-auto p-4 text-center" >Saving...</div>}
        {saved && <div className="max-w-xl bg-green-200 rounded-lg mx-auto p-4 text-center" >Profile saved!</div>}
        <form className="max-w-xl mx-auto  my-4 mb-8" >
            <div className="flex gap-4">
                <div className="mt-3">
                    <Image src={imageUser} width={92} height={92} alt="user image"/>
                    <div className="border rounded-lg py-2 text-center mt-3">
                        <label htmlFor="imageUser" className="">
                            <input type="file"  className="hidden" id="imageUser" onChange={(e)=> handleImageChange(e)}/>
                            <span className="">Edit</span>
                        </label>
                    </div>
                </div>
                <div className="grow">
                    <input type="text"  placeholder="Your name"  value={userName} onChange={(e)=> setUserName(e.target.value)}/>
                    <input type="email" disabled value={session.data.user.email} />
                    <input type="text" placeholder="Phone number" value={phone} onChange={e=> setPhone(e.target.value)} />
                    <input type="text" placeholder="Address" value={address} onChange={e=> setAddress(e.target.value)}/>
                    <button type="submit"  onClick={(e)=> handleUpdateUserInfo(e)}>Save</button>
                </div>
            </div>
        </form>
    </section>
  )
}
