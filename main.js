// main.js - PDF generation and other interactions

document.addEventListener('DOMContentLoaded', function () {
  const downloadBtn = document.getElementById('download-pdf');
  if (downloadBtn) downloadBtn.addEventListener('click', generatePDF);
});

async function generatePDF() {
  const printable = document.getElementById('printable');
  if (!printable) return console.error('Printable element not found');

  try {
    // Clone printable area so we can clean it up without touching the live page
    const clone = printable.cloneNode(true);

    // Ensure the clone has an explicit width to avoid layout shifts during html2pdf rendering
    const computed = window.getComputedStyle(printable);
    if (computed && computed.width) {
      clone.style.boxSizing = 'border-box';
      clone.style.width = computed.width; // maintain on-screen pixel width
    }

    // Remove elements that should not appear in the PDF
    const removeSelectors = [
      '.controls',
      'button',
      '.fixed',
      '.no-print',
      '#scrollTopBtn',
      '#bg-music',
      '#download-pdf',
      '#cookie-consent',
      'audio',
      'video',
      'canvas'
    ];

    removeSelectors.forEach(sel => {
      const nodes = clone.querySelectorAll(sel);
      nodes.forEach(n => n.remove());
    });

    // Create a temporary container for the clone
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.appendChild(clone);
    document.body.appendChild(container);

    // Use html2pdf (assumed to be available) to generate the PDF
    // Keep flow and error handling similar to the original implementation
    const opt = {
      margin:       [10, 10, 10, 10], // mm
      filename:     'Gael-Charlin-CV.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // html2pdf returns a promise-like chain
    await html2pdf().set(opt).from(clone).save();

    // Cleanup
    container.remove();
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('An error occurred while generating the PDF. See console for details.');
  }
}
