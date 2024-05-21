'use client'
import { useEffect, useState } from "react"
import MenuItem from "./MenuItem"
import SectionHeader from "./SectionHeader"
import { Buffer } from 'buffer';


function HomeMenu() {
  const [bestSeller, setBestSeller] =useState([])
  useEffect(()=>{
    fetch('api/product').then((response)=>{response.json().then(products=>{
      
      let topProduct=products.slice(-6)
      topProduct=topProduct.map((item)=>{
        item.image= new Buffer(item.image, 'base64').toString('binary')
        return item
      })
      setBestSeller(topProduct)
    })
  })
  }, [])
  return (
    <div>
       <SectionHeader subTitle={'check out'} mainTitle={'Best Seller'}/>
       <div className="grid grid-cols-3 gap-9 mt-5">
          {
            bestSeller && bestSeller.length>0 && bestSeller.map((item, index)=>{
              return (
                <MenuItem {...item} key={index}/>
              )
            })
          }
        </div>
    </div>
  )
}

export default HomeMenu
