const axios = require("axios");
const productos = require("../BaseDeDatos/productos")

async function getProductById(req, res) {
const URL = productos;
  try {
    const {id} = req.params;
    const {productos} = await axios.get(`${URL}${id}`);

    const producto = {
      id: productos.id,
      nombre: productos.status,
      img: productos.img,
      cantidad: productos.cantidad,
      precio: productos.precio,
    };

    producto.nombre
      ? res.status(200).json(producto)
      : res.status(404).json({message: "Product not found"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = getProductById;
