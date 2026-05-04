const Product = require('../models/productModel');

//business Logic

const getProducts = async(req, res) =>{
try{
    const allProducts = await Product.find();
    res.status(200).json(allProducts);

}catch(err){
    console.log(err);
    res.status(500).json({
        success:false,
        message:"Internal Server Error",
        error: err.message
    })
}
}

const createProduct = async (req,res) =>{
    try{
        const {name, price , description, category} = req.body;
        
        // Validation
        if(!name || !price || !description || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const newProduct = new Product({name, price , description, category});
        await newProduct.save();
        
        res.status(201).json({
            success: true,
            product: newProduct
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error: err.message
        })
    }
}

const updateProduct = async(req,res) =>{
    try{
        console.log("PUT ki Request")
        const {id} = req.params;
        const {name, price , description, category} = req.body;

        const updateProduct = await Product.findByIdAndUpdate(id,{name, price, description, category}, {new:true});

        if(!updateProduct){
            return res.status(404).json({
                success: false,
                message:"cannot find product"
            })
        }

        res.status(200).json({
            success: true,
            product: updateProduct
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error: err.message
        })
    }
}

const deleteproduct = async (req,res)=>{
    try{
        const {id}= req.params;
        const deleteproduct = await Product.findByIdAndDelete(id);

        if(!deleteproduct){
            return res.status(404).json({
                success: false,
                message:"Product Not Found, cannot Delete"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted successfully",
            product: deleteproduct
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error: err.message
        })
    }
}

module.exports = {getProducts, createProduct, updateProduct ,deleteproduct}