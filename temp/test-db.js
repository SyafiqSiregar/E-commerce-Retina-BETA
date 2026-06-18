import dotenv from 'dotenv';
dotenv.config();

import { initGoogleSheets, getDoc } from '../server/adapters/googleSheetsAdapter.js';
import { DatabaseAdapter } from '../server/adapters/DatabaseAdapter.js';

async function run() {
    try {
        console.log("Initializing DB...");
        await initGoogleSheets();
        
        console.log("Adding product...");
        const newProduct = {
            id: `PRD-${Date.now()}`,
            kode_barang: `KB-${Date.now()}`,
            nama_barang: "Test",
            kategori: "Kamera",
            deskripsi: "Test",
            harga_beli: 0,
            harga_jual: 1000,
            stok: 10,
            satuan: "pcs",
            foto_url: "",
            created_at: new Date().toISOString()
        };
        
        const addedProduct = await DatabaseAdapter.addProduct(newProduct);
        console.log("SUCCESS:", addedProduct);
    } catch (e) {
        console.error("ERROR CAUGHT:");
        console.error(e);
    }
}

run();
