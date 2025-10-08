// main.js
// Ajoutez ici des interactions dynamiques pour le site CV

document.addEventListener('DOMContentLoaded', function() {
    // Exemple : effet sur le titre au survol
    const title = document.querySelector('h1');
    if(title) {
        title.addEventListener('mouseenter', () => {
            title.style.color = '#ff00cc';
            title.style.textShadow = '0 0 16px #ff00cc, 0 0 8px #00eaff';
        });
        title.addEventListener('mouseleave', () => {
            title.style.color = '#00eaff';
            title.style.textShadow = '0 0 8px #00eaff, 0 0 4px #ff00cc';
        });
    }
    // Ajoutez d'autres interactions ici
    const music = document.getElementById('bg-music');
    if (music) {
        // Tentative de lecture automatique
        music.volume = 0.5;
        const playMusic = () => {
            music.play().catch(() => {});
        };
        playMusic();
        document.body.addEventListener('click', playMusic, { once: true });
    }
    const h1 = document.querySelector('h1.futuristic');
    if (h1) {
        h1.style.cursor = 'pointer';
        h1.addEventListener('click', function() {
            document.getElementById('hidden-page').style.display = 'block';
        });
    }
    const closeBtn = document.querySelector('#hidden-page button');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.getElementById('hidden-page').style.display = 'none';
        });
    }
    const exportBtn = document.getElementById('export-pdf');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // Crée un conteneur temporaire pour le contenu principal
            const tempDiv = document.createElement('div');
            tempDiv.style.background = '#fff';
            tempDiv.style.color = '#222';
            tempDiv.style.fontFamily = "'Roboto', Arial, sans-serif";
            tempDiv.style.padding = '0';
            tempDiv.style.margin = '0';
            // Ajoute toutes les sections principales dans l'ordre
            const mainSections = [
                document.querySelector('header'),
                document.getElementById('personal-info'),
                document.getElementById('competences'),
                document.getElementById('parcours'),
                document.getElementById('interets'),
                document.querySelector('footer')
            ];
            mainSections.forEach(el => {
                if (el) tempDiv.appendChild(el.cloneNode(true));
            });
            html2pdf().set({
                margin: 0.2,
                filename: 'cv-gael-charlin.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            }).from(tempDiv).save();
        });
    }
    const downloadTxtBtn = document.getElementById('download-txt');
    if (downloadTxtBtn) {
        downloadTxtBtn.addEventListener('click', function() {
            const cvText = `Gaël CHARLIN
Rigoureux Passionné

Adresse : 6, rue de la Potale, 21150 Les Granges sous Grignon
Téléphone : 06 23 99 49 75
Email : gaelcharlin160@gmail.com
Date de naissance : 13/08/2008
Permis : En cours
Informatique : WORD, EXCEL
ASSR ½, formation SST

Compétences professionnelles

Production culinaire
    Réaliser des préparations culinaires
    Cuisiner
    Dresser
    Réaliser des recettes

Communication professionnelle
    Avoir une attitude et posture professionnelles
    Communiquer en interne
    Assister le chef dans son travail
    Commercialisation

Parcours

Mai 2025 : Obtention de mon CAP cuisine avec la mention Bien

Octobre 2023 - aout 2025 : Apprentissage en cuisine au restaurant Augresdemesenvie Dijon avec l’école des métiers de Longvic ▼

2022/2023 : Découverte du métier de cuisinier pendant mon année de 3ème prépa métier ▼

Stage découverte : ▼
    1 semaine en mise en rayon Bi1 Venarey les Laume
    1 semaine en boulangerie Bi1 Venarey les Laume
    1 semaine en boucherie Bi1 Venarey les Laume

Centres d’intérêt

Production culinaire
Communication professionnelle
Bénévole secours populaire
`;
            const blob = new Blob([cvText], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'cv-gael-charlin.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('contact-success').style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                document.getElementById('contact-success').style.display = 'none';
            }, 4000);
        });
    }
});

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        // Animation de transition
        document.querySelectorAll('section').forEach(sec => {
            sec.style.transition = 'opacity 0.5s, transform 0.5s';
            sec.style.opacity = '0.5';
            sec.style.transform = 'scale(0.98)';
        });
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
            section.style.opacity = '1';
            section.style.transform = 'scale(1.04)';
            setTimeout(() => {
                section.style.transform = 'scale(1)';
            }, 400);
        }, 200);
    }
}

function toggleApprentissage() {
    const details = document.getElementById('apprentissage-details');
    const arrow = document.querySelector('.arrow-toggle span');
    if (details.style.display === 'none') {
        details.style.display = 'block';
        details.style.opacity = 0;
        details.style.transition = 'opacity 0.5s';
        setTimeout(() => { details.style.opacity = 1; }, 10);
        arrow.textContent = '▲';
    } else {
        details.style.opacity = 0;
        setTimeout(() => { details.style.display = 'none'; }, 500);
        arrow.textContent = '▼';
    }
}

function toggleStage() {
    const details = document.getElementById('stage-details');
    const arrow = document.querySelectorAll('.arrow-toggle span')[1];
    if (details.style.display === 'none') {
        details.style.display = 'block';
        details.style.opacity = 0;
        details.style.transition = 'opacity 0.5s';
        setTimeout(() => { details.style.opacity = 1; }, 10);
        arrow.textContent = '▲';
    } else {
        details.style.opacity = 0;
        setTimeout(() => { details.style.display = 'none'; }, 500);
        arrow.textContent = '▼';
    }
}

function toggleDecouverte() {
    const details = document.getElementById('decouverte-details');
    const arrow = document.querySelectorAll('.arrow-toggle span')[2];
    if (details.style.display === 'none') {
        details.style.display = 'block';
        details.style.opacity = 0;
        details.style.transition = 'opacity 0.5s';
        setTimeout(() => { details.style.opacity = 1; }, 10);
        arrow.textContent = '▲';
    } else {
        details.style.opacity = 0;
        setTimeout(() => { details.style.display = 'none'; }, 500);
        arrow.textContent = '▼';
    }
}

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
        btn.style.boxShadow = '0 0 16px #00eaff, 0 0 8px #ff00cc';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = '';
    });
});

// Bouton pour remonter tout en haut
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Bouton pour les infos perso
document.querySelector('.nav-btn[onclick*="personal-info"]').addEventListener('click', function() {
    const section = document.getElementById('personal-info');
    section.classList.add('rotate');
    setTimeout(() => {
        section.classList.remove('rotate');
    }, 700);
});
