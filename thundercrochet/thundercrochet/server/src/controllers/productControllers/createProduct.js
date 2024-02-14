const { Products } = require("../db");
const cloudinary = require('cloudinary').v2;

const createProducts = async (productData) => {
    try {
      const {
        name,
        sale,
        category,
        image, 
        description,
        price,
        quantity,
      } = productData;
  
      const productCreated = await Products.findOne ({where: {name:name, category:category}})
      if(productCreated) {
        throw new Error ('Un producto ya existe con esas caracteristicas')
      }
      
       
        const cloudinaryUpload = await cloudinary.uploader.upload(`${image}`);
        const img = cloudinaryUpload.secure_url;
        console.log(img)
  
      const newProduct = await Products.create({
        name,
        sale,
        category,
        img,
        description,
        price,
        quantity,
      });
      
      return newProduct;
    } catch (error) {
      console.log(error)
      throw error;
    }
  };

  module.exports = {createProducts};