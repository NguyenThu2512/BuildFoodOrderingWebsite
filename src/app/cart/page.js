'use client'
import { CartContext } from "@/components/AppProvider";
import SectionHeader from "@/components/layout/SectionHeader";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
    const {cartProducts, removeFromCart, clearCartProducts, cartProductPrice}=useContext(CartContext)
    console.log("check2:", cartProducts)
    let total=0;
    if(cartProducts.length>0){
        cartProducts.map(item=>{
            total+=cartProductPrice(item);
            return total
        })
    }
    const session= useSession();
    const status= session.status
    const [userName, setUserName]=useState("")
    const [phone, setPhone]=useState("")
    const [address, setAddress]=useState("")
    const fetchUserData=async ()=>{
        const res=await fetch('/api/profile');
        const data=await res?.json();
        console.log("check data", data);
        setAddress(data.address)
        setPhone(data.phone)
    }
    useEffect(()=>{
        setUserName(session.data?.user?.name)
        fetchUserData();
    }, [session, status])
    if(status==='loading'){
        return "loading..."
    }
    else if(status==='unauthenticated'){
        return redirect('/login')
    }
  return (
    <div>
      <SectionHeader mainTitle={"Your Shopping Cart"}/>
        {
            cartProducts.length===0? <div>No product in your shopping cart, please add it to your cart!</div>: 
            <div className="grid grid-cols-2 gap-8 mt-5">
                <div className="">
                    {cartProducts?.length>0 && <button onClick={clearCartProducts} className="w-48">Clear All Cart Products</button>}
                    {
                        cartProducts && cartProducts.length > 0 && cartProducts.map((item, index)=>{
                            return(
                                <div className="" key={index}>
                                    <div className="flex gap-4 py-3 border-b items-center justify-between">
                                        <div>
                                            <Image src={item.image} width={100} height={100} alt={item.name}/>
                                        </div>
                                        <div className="grow">
                                            <div>{item.name}</div>
                                            {
                                                item.size && <div>Size: {item.size.name}</div>
                                            }
                                        </div>
                                        <div>
                                            ${cartProductPrice(item)}
                                        </div>
                                        <div>
                                            <button onClick={()=> removeFromCart(index)}>
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="font-bold float-end my-2">Total: ${total}</div>
                </div>
                <div className="bg-gray-300 p-3">
                    <h2 className="font-bold text-lg">Check out</h2>
                    <form action="">
                        <label htmlFor="">Name:</label>
                        <input type="text"  placeholder="Your name"  value={userName} onChange={(e)=> setUserName(e.target.value)}/>
                        <label htmlFor="">Email:</label>
                        <input type="email" value={session.data?.user.email} />
                        <label htmlFor="">Phone Number:</label>
                        <input type="text" placeholder="Phone number" value={phone} onChange={e=> setPhone(e.target.value)} />
                        <label htmlFor="">Address</label>
                        <input type="text" placeholder="Address" value={address} onChange={e=> setAddress(e.target.value)}/>
                        <button type="submit" >Pay ${total}</button>
                    </form>
                </div>
            </div>
        }
    </div>
  )
}
