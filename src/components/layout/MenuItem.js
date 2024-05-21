import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../AppProvider"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
function MenuItem(menuItem) {
  const {image, name, description, price, sizes, category}=menuItem
  const {addToCart,cartProducts, setCartProducts}=useContext(CartContext)
  const [showPopup, setShowPopup]=useState(false)
  const [selectedPrice, setSelectedPrice]=useState(sizes?.[0] || null)
  const session= useSession();
  const status= session.status;
  const router = useRouter();
  const handleAddToCart=()=>{
    if(status==='unauthenticated'){
      router.push('/login');
    }else{
      if(sizes && sizes.length==0){
        addToCart(menuItem)
        toast.success("Added to cart!")
      }else{
        setShowPopup(true)
      }
    }
    
  }
  const handleAddCartWithSize=()=>{
    if(status==='unauthenticated'){
      return redirect('/login')
    }else{
      addToCart(menuItem, selectedPrice);
      toast.success("Added to cart!")
      setShowPopup(false);
    }

  }
  

  return (
    <div className="bg-gray-200 rounded-lg p-4 text-center hover:bg-gray-100 transition-all">
        <div className="relative w-full h-52">
            <Image src={image} layout={'fill'} objectFit="contain" alt="cake" className="z-0"/>
        </div>
        <div className="font-semibold text-xl">{name}</div>
        <div className="text-gray-500 line-clamp-2 ">{description} </div>
        <button className="bg-primary mt-4 rounded-full px-4 py-2 text-white" onClick={()=>handleAddToCart()}>Add to cart ${price}</button>
        {
          showPopup && 
          <>
            <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-10">
              <div className="my-8 bg-white p-2 rounded-lg max-w-md">
                <div className="p-2">
                  <Image src={image} alt={name} width={300} height={200} className="mx-auto"/>
                  <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                  <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                  <h3 className="my-2 font-semibold">Pick your size</h3>
                  {
                    sizes && sizes.length>0 && sizes.map((item, index)=>{
                      return(
                        <div key={index} className="">
                            <label htmlFor=""  className="border flex gap-2 p-2 mb-2 rounded-md"> <br />
                              <input type="radio" onClick={()=>setSelectedPrice(item)} name="size" checked={item._id===selectedPrice._id}/> {item.name} ${+price + item.price}
                            </label>
                        </div>
                        
                      )
                    })
                  }
                  <button className="bg-primary mt-4 rounded-full px-4 py-2 text-white" onClick={()=>{handleAddCartWithSize()}}>Add to cart ${+ price + selectedPrice?.price}</button>
                  <button className="mt-4 rounded-full px-4 py-2 " onClick={()=>setShowPopup(false)}>Cancel</button>


                </div>


              </div>

            </div>
          </>
        }
    </div>
  )
}

export default MenuItem
