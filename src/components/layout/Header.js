'use client'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "../AppProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartArrowDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons"

function Header() {
  const session = useSession()
  const status=session.status
  console.log("session:", session)
  let userName=session.data?.user?.name || session.data?.user?.email || "";
  if(session.data?.user?.name ){
    userName=session.data?.user?.name.split(' ')[0];
  }
  const {cartProducts}=useContext(CartContext)

  
  return (
    <div>
      <header className="flex items-center justify-between">
        <Link href="/" className="text-primary font-semibold text-2xl">BEEFOOD</Link>
        <nav className="flex items-center gap-5 text-gray-500 font-semibold ">
          <Link href="/" className="">Home</Link>
          <Link href="/menu" className="">Menu</Link>
          <Link href="/#about" className="">About us</Link>
          <Link href="/#contact" className="">Contact</Link>
        </nav>
        <div className="flex gap-3 items-center">
          {
            status==="authenticated"? 
            <div className="flex gap-2 items-center">
              <Link href={'/profile'} className="font-bold whitespace-nowrap hover:text-primary">Hello, {userName}</Link>
              <Link href="/cart" className="font-semibold text-gray-700 flex">
                <FontAwesomeIcon icon={faCartArrowDown} className="text-2xl "/>
                <span className="bg-red-600 text-white rounded-full p-1 text-xs relative bottom-3 right-2">{`${JSON.parse(localStorage?.getItem('cart')).length}`}</span>
              </Link>
              <button className="bg-primary ms-3 text-white px-4 py-2 rounded-full" onClick={()=> signOut()}>Log Out</button>
            </div>
            :
            <>
              <Link href="/login" className="text-gray-500 font-semibold">Login</Link>
              <Link href="/register" className="bg-primary ms-3 text-white px-4 py-2 rounded-full">Register</Link>
            </>
          }
          
          

          
        </div>
      </header>
    </div>
  )
}

export default Header
