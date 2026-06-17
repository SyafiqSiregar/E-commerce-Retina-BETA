import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Akses Ditolak: Token tidak ditemukan' });

    jwt.verify(token, process.env.JWT_SECRET || 'retina-secret-key', (err, user) => {
        if (err) return res.status(403).json({ error: 'Akses Ditolak: Token tidak valid atau kedaluwarsa' });
        req.user = user;
        next();
    });
};

export const verifySuperAdmin = (req, res, next) => {
    if (req.user.role !== 'Super Admin') {
        return res.status(403).json({ error: 'Akses Ditolak: Membutuhkan hak akses Super Admin' });
    }
    next();
};
