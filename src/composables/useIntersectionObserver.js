// Deklarasi variabel global untuk menyimpan instance IntersectionObserver
// agar bisa digunakan ulang dan tidak bocor memorinya.
let observer = null;

// [START] export function initIntersectionObserver
export function initIntersectionObserver() {
  // Cegah error jika dijalankan di environment non-browser (misal SSR)
  // [START] if check
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    return;
  }
  // [END] if check

  // Hanya buat observer baru jika belum ada
  // [START] if (!observer)
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      // [START] entries.forEach
      entries.forEach(entry => {
        // [START] if (entry.isIntersecting)
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
        // [END] if (entry.isIntersecting)
      });
      // [END] entries.forEach
    }, {
      threshold: 0,
      rootMargin: '0px 0px -20px 0px'
    });
  }
  // [END] if (!observer)

  // Fungsi helper untuk memindai elemen baru di DOM
  // [START] const scanAndObserve
  const scanAndObserve = () => {
    const elements = document.querySelectorAll('.animate-on-scroll:not(.is-visible):not(.is-observed)');
    // [START] elements.forEach
    elements.forEach(el => {
      el.classList.add('is-observed');
      observer.observe(el);
    });
    // [END] elements.forEach
  };
  // [END] const scanAndObserve

  // Jalankan pemindaian pertama kali
  scanAndObserve();

  // Gunakan MutationObserver untuk memantau perubahan DOM (elemen yang dirender asinkron)
  // [START] const mutationObserver
  const mutationObserver = new MutationObserver(() => {
    scanAndObserve();
  });
  // [END] const mutationObserver
  
  mutationObserver.observe(document.body, { childList: true, subtree: true });

}
// [END] export function initIntersectionObserver
