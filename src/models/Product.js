const { Schema, model, models, default: mongoose } = require("mongoose");

const SizeSchema=new Schema({
    name:String,
    price:Number
})

const ProductSchema= new Schema({
    image: {type: Buffer},
    name: {type: String},
    description: {type: String},
    price: {type: String},
    sizes: {type: [SizeSchema]},
    category: {type: mongoose.Types.ObjectId}
}, {timestamps: true})

export const Product= models?.Product || model('Product', ProductSchema)