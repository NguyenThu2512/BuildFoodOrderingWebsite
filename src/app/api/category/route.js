import { Category } from "@/models/Category"
import mongoose from "mongoose"

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL)
    let {name}=await req.json()
     const categories= await Category.create({name}) 
    return Response.json(categories)
}

export async function GET(){
    mongoose.connect(process.env.MONGO_URL)
    const allCategories=await Category.find()
    return Response.json(allCategories)
}

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL)
    const {_id, name}= await req.json()
    await Category.updateOne({_id}, {name})
    return Response.json(true)
}
export async function DELETE(req){
    mongoose.connect(process.env.MONGO_URL)
    const url= new URL(req.url);
    const _id=url.searchParams.get('_id');
    await Category.deleteOne({_id});
    return Response.json(true)
}