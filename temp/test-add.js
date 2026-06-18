import fs from 'fs';
import path from 'path';

async function testAddProduct() {
  try {
    const formData = new FormData();
    formData.append('nama_barang', 'Test Product');
    formData.append('kategori', 'Test Category');
    formData.append('harga_jual', '10000');
    formData.append('stok', '10');
    formData.append('deskripsi', 'Test description');
    
    // We can skip image for now since it's optional, but let's test without image first.
    // If without image works, the issue is in image upload.
    
    // We need an admin token. Let's just login first.
    const loginRes = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@retina.id', password: 'admin123' })
    });
    
    const loginData = await loginRes.json();
    if (!loginRes.ok) {
        console.log("LOGIN FAILED:", loginData);
        return;
    }
    
    const token = loginData.accessToken;
    
    const addRes = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    const text = await addRes.text();
    console.log("HTTP STATUS:", addRes.status);
    console.log("RESPONSE:", text);
    
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}

testAddProduct();
