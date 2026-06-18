import express from 'express';
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public route to get products (for the main website)
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes (Admin only)
router.post('/', verifyToken, upload.single('gambar'), addProduct);
router.put('/:id', verifyToken, upload.single('gambar'), updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;
