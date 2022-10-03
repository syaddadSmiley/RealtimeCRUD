import express from "express";
import {
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} from "../controllers/ProductController.js";

const router = express.Router();

router.get('/products', getProduct);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
// router.delete('products/:id', deleteProducts);

export default router;