const { Router } = require("express");
const router = Router();

//Middlewares
const upload = require('../middlewares/multer/upload');
const uploadImage = require('../middlewares/cloudinary/uploadImage');
const verifyToken = require("../middlewares/Tokens/verifyTokens")

//Handlers
const postProduct = require('../controllers/Product/postProduct');
const getAllProducts = require("../controllers/Product/getAllProduct");
const getProductByName = require("../controllers/Product/getProductByName");
const getProductById = require("../controllers/Product/getProductById");
const putProduct = require("../controllers/Product/putProduct");
const deleteProduct = require("../controllers/Product/deleteProduct");
const getAllProductsDeleted = require("../controllers/Product/getAllProductsDeleted");
const restoreProduct = require("../controllers/Product/restoreProduct")
const getUsersAndProducts = require("../controllers/Product/getUsers&Products");

//POST
router.post("/", upload, verifyToken, async (req, res) => {
  try {
    const { name, sale, category, description, price, quantity } = req.body;
    let img = req.file && req.file.buffer;
    const userId = req.userId;

    const result = await uploadImage(img);
    img = result.secure_url;

    const newProduct = await postProduct({ name, sale, category, img, description, price, quantity, userId });

    return res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ error: error.message });
  };
});


//GET
router.get("/", getAllProducts, (req, res) => {
  
  return res.status(200).json(res.paginatedResults);
});

router.get("/deleted", getAllProductsDeleted, (req, res) => {
  
  return res.status(200).json(res.paginatedResults);
});

router.get("/name", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Name parameter is missing in the request." });
  }

  try {
    const products = await getProductByName(name);

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

router.get("/users&products", async (req, res) => {
  try {
    const usersAndProducts = await getUsersAndProducts();

    return res.status(200).json(usersAndProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await getProductById(id);

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

router.get("/deleted", getAllProductsDeleted, (req, res) => {

  return res.status(200).json(res.paginatedResults);
});


//PUT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updateProduct = await putProduct(id, updateData);

    return res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

router.put("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await deleteProduct(id);

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

router.put("/restore/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await restoreProduct(id);

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

module.exports = router;