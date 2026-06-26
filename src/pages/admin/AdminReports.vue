<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-gt-medium text-ink-black tracking-tight">Laporan & Ekspor</h1>
        <p class="text-[13px] text-slate mt-1">Kelola dan unduh laporan penjualan toko Anda.</p>
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <button @click="exportCSV" class="flex-1 md:flex-none bg-ink-black hover:bg-near-black text-pure-white px-4 py-2.5 rounded-lg text-[14px] font-gt-medium transition-colors flex items-center justify-center gap-2" :disabled="loading || filteredData.length === 0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Unduh CSV
        </button>
        <button @click="exportPDF" class="flex-1 md:flex-none bg-shop-violet hover:bg-[#4328c0] text-white px-4 py-2.5 rounded-lg text-[14px] font-gt-medium transition-colors flex items-center justify-center gap-2" :disabled="loading || filteredData.length === 0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Cetak PDF
        </button>
      </div>
    </div>

    <!-- Filter Box -->
    <div class="bg-pure-white border border-hairline rounded-2xl p-5 mb-6 shadow-sm">
      <h3 class="text-[14px] font-gt-medium text-ink-black mb-4">Filter Tanggal</h3>
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <div class="flex-1">
          <label class="block text-[12px] text-slate mb-1">Dari Tanggal</label>
          <input type="date" v-model="startDate" class="w-full px-4 py-2 rounded-lg border border-hairline focus:border-shop-violet outline-none text-[13px] bg-soft-canvas text-ink-black">
        </div>
        <div class="flex-1">
          <label class="block text-[12px] text-slate mb-1">Sampai Tanggal</label>
          <input type="date" v-model="endDate" class="w-full px-4 py-2 rounded-lg border border-hairline focus:border-shop-violet outline-none text-[13px] bg-soft-canvas text-ink-black">
        </div>
        <div class="w-full md:w-auto">
          <button @click="resetFilter" class="w-full md:w-auto px-6 py-2 border border-hairline text-ink-black hover:bg-soft-canvas rounded-lg text-[13px] transition-colors">Reset</button>
        </div>
      </div>
    </div>

    <!-- Preview Table -->
    <div class="bg-pure-white border border-hairline rounded-xl overflow-x-auto flex-1 shadow-sm">
      <table class="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr class="border-b border-hairline bg-soft-canvas text-[12px] font-gt-medium text-slate uppercase tracking-wider">
            <th class="px-6 py-4 font-medium">Tanggal</th>
            <th class="px-6 py-4 font-medium">No Pesanan</th>
            <th class="px-6 py-4 font-medium">Pelanggan</th>
            <th class="px-6 py-4 font-medium text-right">Total Nominal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading" class="border-b border-hairline">
            <td colspan="4" class="px-6 py-8 text-center text-slate text-[13px]">
              <span class="w-5 h-5 border-2 border-shop-violet/30 border-t-shop-violet rounded-full animate-spin inline-block mb-2"></span>
              <br>Memuat data...
            </td>
          </tr>
          <tr v-else-if="filteredData.length === 0" class="border-b border-hairline">
            <td colspan="4" class="px-6 py-8 text-center text-slate text-[13px]">Tidak ada data penjualan pada rentang tanggal ini.</td>
          </tr>
          <tr v-else v-for="(item, idx) in filteredData" :key="idx" class="border-b border-hairline hover:bg-soft-canvas/50 transition-colors">
            <td class="px-6 py-4 text-[13px] text-ink-black">{{ formatDate(item.tanggal) }}</td>
            <td class="px-6 py-4 text-[13px] font-gt-medium text-ink-black">{{ item.order_id }}</td>
            <td class="px-6 py-4 text-[13px] text-slate">{{ item.pelanggan }}</td>
            <td class="px-6 py-4 text-[13px] font-gt-medium text-ink-black text-right">{{ formatCurrency(item.total) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const rawData = ref([]);
const loading = ref(true);
const startDate = ref('');
const endDate = ref('');

const fetchSales = async () => {
    loading.value = true;
    try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch('/api/reports/sales', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            rawData.value = await res.json();
        }
    } catch (e) {
        console.error('Failed to load sales data', e);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchSales);

const resetFilter = () => {
    startDate.value = '';
    endDate.value = '';
};

const filteredData = computed(() => {
    let result = rawData.value;
    
    if (startDate.value) {
        const start = new Date(startDate.value);
        start.setHours(0, 0, 0, 0);
        result = result.filter(item => new Date(item.tanggal) >= start);
    }
    
    if (endDate.value) {
        const end = new Date(endDate.value);
        end.setHours(23, 59, 59, 999);
        result = result.filter(item => new Date(item.tanggal) <= end);
    }
    
    return result;
});

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const formatCurrency = (amount) => {
    return 'Rp ' + Number(amount).toLocaleString('id-ID');
};

const exportCSV = () => {
    if (filteredData.value.length === 0) return;
    
    const headers = ['Tanggal', 'No Pesanan', 'Pelanggan', 'Total Nominal'];
    const rows = filteredData.value.map(item => [
        `"${formatDate(item.tanggal)}"`,
        `"${item.order_id}"`,
        `"${item.pelanggan}"`,
        item.total
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan_Penjualan_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const exportPDF = () => {
    if (filteredData.value.length === 0) return;
    
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // Top Left Date
    const now = new Date();
    const printDate = now.toLocaleDateString('id-ID', { year: '2-digit', month: '2-digit', day: '2-digit' });
    const printTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`${printDate}, ${printTime}`, 15, 15);
    
    // Top Right Text
    doc.text('RetinaCCTV Pro System', 195, 15, { align: 'right' });
    
    // KOP SURAT
    const startY = 30;
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('CV RETINA PERISAI NUSANTARA', 105, startY, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('PROFESSIONAL SECURITY SYSTEM PROVIDER', 105, startY + 6, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Jl Komplek Unilever Blok C No.2A RT/RW 002/006 Karang Mulya, Karang Tengah, Tangerang, 15157', 105, startY + 12, { align: 'center' });
    doc.text('Website : retinacctv.id | Email : retinacctv@gmail.com | No Hp : 0812-9746-0115', 105, startY + 17, { align: 'center' });
    
    // Line Separator
    doc.setLineWidth(1.5);
    doc.line(15, startY + 22, 195, startY + 22);
    
    // Laporan Judul
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    // Using simple underline by drawing a line
    const titleText = 'LAPORAN PENJUALAN';
    doc.text(titleText, 105, startY + 32, { align: 'center' });
    const textWidth = doc.getTextWidth(titleText);
    doc.setLineWidth(0.5);
    doc.line(105 - (textWidth/2), startY + 33, 105 + (textWidth/2), startY + 33);
    
    // Tanggal Cetak
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const todayStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Dicetak pada: ${todayStr}`, 105, startY + 40, { align: 'center' });
    
    // Table
    const tableHeaders = [['Tanggal', 'No Pesanan', 'Pelanggan', 'Total Nominal']];
    const tableData = filteredData.value.map(item => [
        formatDate(item.tanggal),
        item.order_id,
        item.pelanggan,
        formatCurrency(item.total)
    ]);
    
    // AutoTable Plugin
    doc.autoTable({
        startY: startY + 48,
        head: tableHeaders,
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [74, 111, 255], // #4A6FFF (Blue from reference)
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center'
        },
        bodyStyles: {
            textColor: 50,
            halign: 'left'
        },
        columnStyles: {
            3: { halign: 'right' } // Total Nominal is right aligned
        },
        styles: {
            lineWidth: 0.2, // border width
            lineColor: [0, 0, 0] // black border
        }
    });
    
    // Save PDF
    doc.save(`Laporan_Penjualan_${new Date().getTime()}.pdf`);
};
</script>
