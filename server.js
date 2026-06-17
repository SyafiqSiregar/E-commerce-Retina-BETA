import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import midtransClient from 'midtrans-client';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
import cookieParser from 'cookie-parser';
import authRoutes from './server/routes/authRoutes.js';
import productRoutes from './server/routes/productRoutes.js';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Custom Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Initialize Midtrans Snap Client
const snap = new midtransClient.Snap({
    // Tentukan environment: false untuk sandbox/testing, true untuk production
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// Helper function: Simulasi database produk
const getProductDetails = (productId) => {
    // Dalam realita, ini query ke database MySQL / MongoDB
    const mockDatabase = {
        'CCTV-001': { name: 'Outdoor PTZ Camera', price: 850000 },
        'CCTV-002': { name: 'Indoor Dome Camera', price: 450000 },
        'SYS-001': { name: 'NVR 8 Channel System', price: 2150000 }
    };
    return mockDatabase[productId];
};

/**
 * Route untuk membuat transaksi (Mendapatkan Snap Token)
 * URL: POST /api/checkout
 */
app.post('/api/checkout', async (req, res) => {
    try {
        const { orderDetails, customerInfo } = req.body;

        // 1. Validasi Data
        if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0) {
            return res.status(400).json({ error: 'Keranjang tidak boleh kosong' });
        }

        // 2. Hitung Ulang Harga dari Server (Mencegah Tampering Harga dari Frontend)
        let calculatedGrossAmount = 0;
        const itemDetails = orderDetails.items.map(item => {
            const product = getProductDetails(item.id);

            // Jika ID tidak ada di mock DB kita lewati saja atau fallback
            const itemPrice = product ? product.price : item.price;
            const itemName = product ? product.name : item.name;

            const subtotal = itemPrice * item.quantity;
            calculatedGrossAmount += subtotal;

            return {
                id: item.id,
                price: itemPrice,
                quantity: item.quantity,
                name: itemName
            };
        });

        // 3. Generate Nomor Tagihan Unik
        const timeStamp = new Date().getTime();
        const orderId = `RETINA-${timeStamp}-${Math.floor(Math.random() * 1000)}`;

        // 4. Buat Parameter Transaksi Midtrans
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: calculatedGrossAmount
            },
            item_details: itemDetails,
            customer_details: {
                first_name: customerInfo?.name || 'Pelanggan',
                email: customerInfo?.email || 'pembeli@example.com',
                phone: customerInfo?.phone || '08123456789'
            }
        };

        // 5. Minta "Snap Token" dari Midtrans
        const transaction = await snap.createTransaction(parameter);

        // Kembalikan token ke Frontend agar bisa memunculkan Pop-Up
        res.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            order_id: orderId
        });

    } catch (error) {
        console.error('Pesan Error Checkout:', error.message);
        res.status(500).json({ error: 'Gagal memproses pembayaran', detail: error.message });
    }
});

/**
 * Route untuk menerima notifikasi pembayaran sukses dari Midtrans
 * URL: POST /api/webhook/midtrans
 */
app.post('/api/webhook/midtrans', async (req, res) => {
    try {
        // 1. Terima notifikasi dari server Midtrans (otomatis dikirim di background)
        const notificationJson = req.body;

        // 2. Verifikasi keaslian notifikasi ke Midtrans
        const statusResponse = await snap.transaction.notification(notificationJson);

        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(`Transaksi untuk Order ID ${orderId} berstatus: ${transactionStatus}`);

        // 3. Update status di "Database"
        if (transactionStatus == 'capture') {
            if (fraudStatus == 'challenge') {
                console.log('Status: Challenge (Tinjau Manual)');
            } else if (fraudStatus == 'accept') {
                console.log('Status: Sukses Lunas (Credit Card dsb)');
            }
        } else if (transactionStatus == 'settlement') {
            console.log('Status: Pembayaran Berhasil Diselesaikan (Transfer Bank/QRIS)');
            // *TODO LOKASI*: Lakukan update status "Pesanan Lunas" di Google Sheet atau Database di sini

        } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
            console.log('Status: Pembayaran Gagal / Dibatalkan / Kedaluwarsa');
        } else if (transactionStatus == 'pending') {
            console.log('Status: Menunggu Pembayaran dari Customer');
        }

        res.status(200).json({ status: 'OK' });
    } catch (error) {
        console.error('Webhook Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Backend Server Retina CCTV Payment Gateway berjalan di http://localhost:${port}`);
});
