'use client'
import MenuItem from "@/components/layout/MenuItem";
import SectionHeader from "@/components/layout/SectionHeader";
import { useContext, useEffect, useState } from "react";

export default function page() {
    const [productList, setProductList]=useState([])
    const [categories, setCategories]=useState([])
    const fetchProductData=async()=>{
        let res= await fetch('/api/product')
        let data= await res.json();
        if(data && data.length>0){
             data=data.map((item)=>{
                 item.image= new Buffer(item.image, 'base64').toString('binary')
                 return item
             })
             setProductList(data)
        }
    }

     const fetchCategoryData=async()=>{
         let response= await fetch('/api/category')
         let data= await response.json();
         if(data && data.length>0){
           setCategories(data);
         }
       }
     useEffect(()=>{
         fetchProductData()
         fetchCategoryData()
     }, [])
  return (
    <div>
        <div>
            {categories && categories.length > 0 && categories.map((cat, index)=>{
                return(
                    <div key={index}>
                        <SectionHeader  mainTitle={cat.name}/>
                        <div className="grid grid-cols-3 gap-4 mt-4 pb-4">
                            {
                                productList && productList.length > 0 && productList.filter((item, index)=>item.category===cat._id).map((product, index)=>{
                                    return(
                                        <MenuItem key={index} {...product} />
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}
