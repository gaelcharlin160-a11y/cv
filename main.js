// Fonction de génération PDF minimal / professionnel en utilisant html2pdf.js
function generatePDF() {
  const printable = document.getElementById('printable');
  if (!printable) {
    alert("Contenu imprimable introuvable — assurez-vous d'avoir ajouté l'élément #printable.");
    return;
  }

  // Clone pour éviter d'altérer la page visible (on nettoie le clone)
  const clone = printable.cloneNode(true);

  // Supprimer éléments indésirables dans le clone (sécurité)
  const selectorsToRemove = ['audio', '.navbar', '.nav-btn', '.arrow-toggle', '#hidden-page', 'button.download-btn'];
  selectorsToRemove.forEach(sel => {
    clone.querySelectorAll(sel).forEach(n => n.remove());
  });

  // Créer un conteneur temporaire invisible dans le DOM pour le rendu
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.left = '-9999px';
  wrapper.style.top = '0';
  wrapper.id = 'pdf-temp-wrapper';
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // Options html2pdf (jsPDF)
  const opt = {
    margin: 10, // mm
    filename: 'CV_Gael_CHARLIN.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2, // meilleure résolution
      useCORS: true,
      allowTaint: false,
      logging: false
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Lancer html2pdf
  html2pdf().set(opt).from(clone).save()
    .then(() => {
      // Nettoyage
      document.body.removeChild(wrapper);
    })
    .catch(err => {
      console.error('Erreur création PDF', err);
      document.body.removeChild(wrapper);
      alert('Erreur lors de la génération du PDF. Voir la console.');
    });
}

// Attacher l'événement au bouton si présent
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('download-pdf');
  if (btn) btn.addEventListener('click', function(e) {
    e.preventDefault();
    generatePDF();
  });
});
