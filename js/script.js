// Basis JavaScript voor interactiviteit

document.addEventListener('DOMContentLoaded', function() {
    // Navigatie active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // Smooth scroll voor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Observatie-logboek - LocalStorage
    loadObservations();
});

function loadObservations() {
    const obs = localStorage.getItem('telescopeObservations');
    if (obs) {
        const observations = JSON.parse(obs);
        console.log('Waarnemingen geladen:', observations.length);
    }
}

function saveObservation(observation) {
    let obs = localStorage.getItem('telescopeObservations');
    let observations = obs ? JSON.parse(obs) : [];

    observations.push({
        date: new Date().toISOString(),
        ...observation
    });

    localStorage.setItem('telescopeObservations', JSON.stringify(observations));
    console.log('Waarneming opgeslagen');
}

function exportObservations() {
    const obs = localStorage.getItem('telescopeObservations');
    if (!obs) {
        alert('Geen waarnemingen om te exporteren');
        return;
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(obs);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "waarnemingen.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
