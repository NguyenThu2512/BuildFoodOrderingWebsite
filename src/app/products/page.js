'use client'
import UserTabs from "@/components/layout/UserTabs";
import CommonUtils from "@/utils/CommonUtils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Buffer } from 'buffer';

export default function ProductPage() {
    const session= useSession();
    const status= session.status;
    const [productName, setProductName]=useState("")
    const [description, setDescription]=useState("")
    const [productPrice, setProductPrice]=useState("")
    const [productImage, setProductImage]=useState("")
    const [imageDisplay, setImageDisplay]=useState("")
    const [productList, setProductList]=useState({})
    const [sizes, setSizes]=useState([])
    const [categories, setCategories]=useState([])
    const [selectedCategory, setSelectedCategory]=useState(categories && categories.length>0 ? categories[0]._id : "")
    const [editedData, setEditedData]=useState(null)

    const handleUploadImage=async(event)=>{
        let data=event.target.files;
        let file=data[0];
        if(file){
            let objURL= URL.createObjectURL(file);
            setImageDisplay(objURL)
            let base64= await CommonUtils.getBase64(file)
            console.log(base64)
            if(base64){
                setProductImage(base64)
            }
        }
    }
    //  let imageBase64 = new Buffer(item.avatar, 'base64').toString('binary')

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
    //    console.log("check product:", data)
    //    return data
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
    useEffect(()=>{
        console.log("category:", categories)
        console.log("selected category", selectedCategory)
    }, [categories, selectedCategory])



    const handleCreateProductInfo=async(e)=>{
        e.preventDefault();
        let productCreatePromise= new Promise(async(resolve, reject)=>{
            const data={productImage, productName, description, productPrice,selectedCategory, sizes }
            if(editedData){
                data._id=editedData._id
            }
            const response= await fetch('/api/product', {
                method: editedData?'PUT':'POST',
                body: JSON.stringify(data),
                headers: {contentType: 'application/json'}
            })
            if(response.ok){
                resolve()
            }else{
                reject()
            }
        });
        
        await toast.promise(productCreatePromise, {
            loading:editedData?"Updating product...":"Creating new product...",
            success: editedData?"Updating product successfully":"Product created successfully",
            error: editedData?"Error updating data":"Product creation failed"
        })
        fetchProductData()
        setSelectedCategory(categories && categories.length>0 ? categories[0]._id : "")
        setProductImage("")
        setImageDisplay("")
        setProductName("")
        setProductPrice("")
        setSizes([])
        setDescription("")
        setEditedData(null)
        
    }
    const handleAddNewSize=()=>{
        setSizes((prevSize)=>{
            return [...prevSize, {name: "", price: 0}]
        })
    }

    const handleChangeSize=(event, index, props)=>{
        const newValue=event.target.value;
        
        setSizes((prevSize)=>{
            const newSizes=[...prevSize];
            newSizes[index][props]=newValue;
            return newSizes;
        })
    }
    const removeSize=(index)=>{
        setSizes((prevSize)=>prevSize.filter((item, i)=>i!==index))
    }

    const handleEditProduct=(data)=>{
        setImageDisplay(data.image)
        setProductName(data.name)
        setDescription(data.description)
        setSelectedCategory(data.category)
        setProductPrice(data.price)
        setSizes(data.sizes)
        setProductImage(data.image)
        setEditedData(data)
        
    }
    const handleDeleteProduct=async(id)=>{
        const response=await fetch('/api/product?_id='+id, {
            method: 'DELETE',
        })
        console.log("check res:", response)
        if(response.ok){
            toast.success("Delete product successfully")
        }else{
            toast.error("Error deleting product")
        }
        fetchProductData()
    }

    const handleCancelUpdate=()=>{
        setEditedData(null)
        setSelectedCategory(categories && categories.length>0 ? categories[0]._id : "")
        setProductImage("")
        setImageDisplay("")
        setProductName("")
        setProductPrice("")
        setSizes([])
        setDescription("")
    }

    if(status==='loading'){
        return "loading..."
    }
    else if(status==='unauthenticated'){
        return 'user is not admin'
    }
  return (
    <div>
      <UserTabs isAdmin={true}/>
        <div>
            <form className="max-w-xl mx-auto  my-4 mb-8" >
                <div className="flex gap-4">
                    <div className="mt-5">
                        <div>Image</div>
                        <div className="border h-20 w-20" > 
                            <div className="h-20 w-20 bg-no-repeat bg-center bg-contain" style={{ background: `url(${imageDisplay})`}}></div>
                        </div>
                        <div className="bg-gray-300 text-center rounded-lg mt-2 p-1" >
                            <label htmlFor="productImage" >
                                Upload
                            </label>
                            <input type="file" id="productImage" className="hidden" onChange={(e)=> handleUploadImage(e)} />
                        </div>
                    </div>
                    <div className="grow">
                        <label htmlFor="">Item name</label>
                        <input type="text"  value={productName} onChange={(e)=> setProductName(e.target.value)} />
                        <label htmlFor="">Description</label>
                        <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)} />
                        <label htmlFor="">Price</label>
                        <input type="text" value={productPrice} onChange={(e)=> setProductPrice(e.target.value)}/>
                        <label htmlFor="">Category:</label>
                        <select value={selectedCategory} onChange={(e)=> setSelectedCategory(e.target.value)}>
                            {
                                categories && categories.length && categories.map((item, index)=>{
                                    return(
                                        <option value={item._id} key={index}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        <div className="bg-gray-300 mt-4 rounded-lg p-2">
                            <div>Sizes</div>
                            {
                                sizes && sizes.length>0 && sizes.map((item, index)=>{
                                    return (
                                        <div className="flex gap-2" key={index} >
                                            <div>
                                                <label htmlFor="">Size name</label>
                                                <input type="text" value={item.name} onChange={(e)=> handleChangeSize(e, index, 'name')} />
                                            </div>
                                            <div>
                                                <label htmlFor="">Extra price</label>
                                                <input type="text" value={item.price} onChange={(e)=> handleChangeSize(e, index, 'price')}  />
                                            </div>
                                            <div className="bg-white py-2 px-4 rounded-lg h-10 mt-9 font-bold" onClick={()=> removeSize(index)}> x </div>
                                        </div>
                                    )
                                })
                            }

                            <button type="button" className="bg-white rounded-lg p-2 font-bold" onClick={()=> handleAddNewSize()}>Add new size</button>
                            
                        </div>

                        <button type="submit" onClick={(e)=> handleCreateProductInfo(e)} >{editedData?"Save change":"Create"}</button>
                        {
                            editedData && <button onClick={()=> handleCancelUpdate()}>Cancel</button>
                        }
                    </div>
                    
                </div>
            </form>
            <div className="max-w-xl mx-auto">
                <h2 className="text-xl font-bold mt-4">Product List</h2>
                <hr />
                
                    {
                    productList && productList.length >0 && productList.map((item, index)=>{
                        return(
                            <div className="flex justify-around gap-3 p-3 border-b-2" key={index}>
                                <div className="w-28 h-28">
                                    <img src={item.image} alt={item.name} className="w-full h-full"/>
                                </div>
                                <div>
                                    {item.name}
                                </div>
                                <div>
                                    {item.price}
                                </div>
                                <div>{item.description}</div>
                                <div className="flex justify-items-end gap-2">
                                    <button className="w-20 h-10 mt-0 hover:bg-yellow-500" onClick={()=>handleEditProduct(item)}>Edit</button>
                                    <button className="w-20 h-10 mt-0 hover:bg-red-600" onClick={()=> handleDeleteProduct(item._id)}>Delete</button>
                                </div>
                            </div>
                           
                            
                        )
                    })
                }


                
                
                
            </div>
        </div>
    </div>
  )
}
