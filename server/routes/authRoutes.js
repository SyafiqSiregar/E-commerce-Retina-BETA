import express from 'express';
import { login, logout, refreshToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refreshToken);

export default router;
