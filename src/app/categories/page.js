'use client'
import UserTabs from "@/components/layout/UserTabs";
import { faPenAlt, faPenClip, faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function page() {
    const session= useSession();
    const status= session.status;
    const [categoryName, setCategoryName]= useState()
    const [categories, setCategories]=useState()
    const [editedCategory, setEditedCategory]= useState(null)
    const [idCategory, setIdCategory]= useState("")
    const handleSubmitCategory=async(e)=>{
      e.preventDefault();
      let data={name:categoryName }
      if(editedCategory){
        console.log("check editedCategory:", editedCategory)
        data._id=editedCategory._id
      }
      let response= await fetch('/api/category', {
        method: editedCategory?'PUT': 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      fetchCategoryData()
      if(response.ok){
        if(editedCategory){
          toast.success("Update category successfully!")
        }else{
          toast.success("Create a category successfully!")
        }
        setCategoryName("")
        setEditedCategory(null)
      }
      else{
        if(editedCategory){
          toast.error("Update category failed!")
        }else{
          toast.error("Create a category failed!")

        }
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
      fetchCategoryData()
    }, [])

    const handleClickCategory=(data)=>{
      setEditedCategory(data)
      setCategoryName(data.name)
      setIdCategory(data._id)
    }
    const handleDeleteCategory=async(id)=>{
      const response=await fetch('/api/category?_id='+id, {
        method: 'DELETE',
      })
      console.log("check res:", response)
      if(response.ok){
          toast.success("Delete category successfully")
      }else{
          toast.error("Error deleting category")
      }
        fetchCategoryData()
    }
    const handleCancel=()=>{
      setEditedCategory(null)
      setCategoryName("")
    }

    if(status==='loading'){
        return "loading..."
    }
    else if(status==='unauthenticated'){
        return 'user is not admin'
    }

  return (
    <div >
      <UserTabs isAdmin={true}/>
      <div className="max-w-xl mx-auto my-8">
        <h1 className="font-bold">{editedCategory?"Update category":"Create new category"}</h1>
        <form action="" onSubmit={handleSubmitCategory}>
          <div className="flex gap-4">
            <input type="text" placeholder="Add new category" value={categoryName} onChange={(e)=> setCategoryName(e.target.value)}/>
            <button type="submit" className="w-24" >{editedCategory?"Update":"Create"}</button>
            {
              editedCategory && <button className="w-24" onClick={()=> handleCancel()}>Cancel</button>
            }
          </div>
        </form>
        <h1 className="font-bold mt-8">Edit Category</h1>
        <div className="mt-3">
          {
            categories && categories.length>0 && categories.map((item, index)=>{
              return (
                <div className="bg-gray-200 rounded-lg py-2 px-4 mb-3 flex justify-between" key={index} >
                  <div>{item.name}</div>
                  <div>
                    <span className="me-3 text-lg hover:text-yellow-700 cursor-pointer" onClick={()=> handleClickCategory(item)}>
                      <FontAwesomeIcon icon={faPenSquare}/>
                    </span>
                    <span className="text-xl hover:text-red-700 cursor-pointer " onClick={()=> handleDeleteCategory(item._id)}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                    /> 
                    </span>
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
