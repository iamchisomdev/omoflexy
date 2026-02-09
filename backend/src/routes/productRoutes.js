import express from 'express';
import { upload } from '../middleware/upload.js'; // Keep this
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  testingMethod
} from '../controllers/productController.js';

const router = express.Router();

// accept any file fields (single or multiple) and let controller decide
router.post('/products', upload.any(), createProduct);
router.get('/test', testingMethod);
router.get('/products', getAllProducts);
router.get('/products/:id', getProduct);
router.put('/products/:id', upload.any(), updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;