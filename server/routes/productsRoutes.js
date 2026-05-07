const express = require('express');
const router = express.Router();
const {getProducts, updateProduct ,createProduct , deleteproduct} = require('../controllers/productController.js')

const protect = require("../middleware/authMiddleware");

router.get('/products', getProducts);

router.put('/products/:id', updateProduct);

router.post('/products', protect, createProduct);

router.delete('/products/:id', deleteproduct);

module.exports = router



// const express = require("express");
// const router = express.Router();
// const protect = require("../middleware/authMiddleware");

// router.get("/profile", protect, (req, res) => {
//   res.json({
//     message: "Protected profile data",
//     userId: req.user,
//   });
// });

// module.exports = router;