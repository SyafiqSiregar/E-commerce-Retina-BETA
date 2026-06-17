import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DatabaseAdapter } from '../adapters/DatabaseAdapter.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Email dan password wajib diisi' });
        }

        const user = await DatabaseAdapter.getUserByEmail(email);
        
        if (!user) {
            return res.status(401).json({ error: 'Email atau password salah' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Email atau password salah' });
        }

        const payload = {
            id: user.id,
            email: user.email,
            nama: user.nama,
            role: user.role
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'retina-secret-key', { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'retina-refresh-key', { expiresIn: '7d' });

        // Set refresh token di HttpOnly cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Audit Log
        await DatabaseAdapter.addAuditLog({
            id: Date.now().toString(),
            user: user.email,
            aksi: 'LOGIN',
            timestamp: new Date().toISOString()
        });

        res.json({
            message: 'Login berhasil',
            accessToken,
            user: payload
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.json({ message: 'Logout berhasil' });
    } catch (error) {
        res.status(500).json({ error: 'Gagal logout' });
    }
};

export const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ error: 'Tidak ada session' });
    
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'retina-refresh-key', (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Sesi kedaluwarsa, silakan login ulang' });
        
        const payload = {
            id: decoded.id,
            email: decoded.email,
            nama: decoded.nama,
            role: decoded.role
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'retina-secret-key', { expiresIn: '15m' });
        res.json({ accessToken });
    });
};
