import { Product } from "@/models/Product";
import mongoose from "mongoose";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    let data= await req.json();
    console.log({products: data})
    const products= await Product.create({name: data.productName, description: data.description, price: data.productPrice, image: data.productImage, category: data.selectedCategory, sizes: data.sizes})
    return Response.json(products)
}

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    const productList= await Product.find();
    return Response.json(productList)
}

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    const {_id,...data}=await req.json();
    const dataUpdate=await Product.findByIdAndUpdate(_id, {
        name: data.productName, 
        description: data.description, 
        price: data.productPrice, 
        image: data.productImage, 
        category: data.selectedCategory, 
        sizes: data.sizes})
    return Response.json(dataUpdate)
}
export async function DELETE(req){
    mongoose.connect(process.env.MONGO_URL);
    const url=new URL(req.url);
    const _id=url.searchParams.get('_id');
    console.log("check id:", _id);
    await Product.deleteOne({_id});
    return Response.json(true)
}