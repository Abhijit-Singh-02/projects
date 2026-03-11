import mongoose from "mongoose";
import cartModel from "../models/cartModel.mjs";

const addToCart = async (req, res)=>{
    try {
        const { userId } = req.params;
        if(!userId){
            return res.status(400).send({status: false, message: "enter userId"});
        }
        const user = await userModel.findById(userId)
        if(user==null){
            return res.status(404).send({status: false, message: "user does not exist"});
        }

        const { cartId, productId } = req.body;
        if(!cartId){
            return res.status(400).send({status: false, message: "enter cartId"});
        }
        if(!productId){
            return res.status(400).send({status: false, message: "enter productId"});
        }
        let product = await productModel.findOne({_id: productId, isDeleted: false});
        if(product==null){
            return res.status(404).send({status: false, message: "Product not found"})

        }
        let cart = await cartModel.findById(cartId);
        let data = {}
        if(cart==null){
            data.userId= userId;
            data.items = [{productId: productId, quantity: 1}]
            data.totalPrice = product.price;
            data.totalItems = 1;
            cart = await cartModel.create(data);

            if(cart==null){
                return res.status(500).send({status: false, message:"failed"});
            }

            return res.status(201).send({status: true, message:"Success", data: cart})
        }
        
        cart = await cartModel.findByIdAndUpdate(cartId, {$inc:{totalPrice: 1, totalItems: 1}})

    } catch (error) {
        return res.status(500).send({status: false, err: error.message});
    }
}

export {addToCart}