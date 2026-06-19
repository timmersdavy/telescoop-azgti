// Basis JavaScript voor interactiviteit

document.addEventListener('DOMContentLoaded', function() {
    // Auto-initialize demo data on first visit
    initializeDemoData();

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

// AUTO-INITIALIZE DEMO DATA
function initializeDemoData() {
    const initialized = localStorage.getItem('telescopeInitialized');
    if (initialized) return; // Alleen eerste keer

    // Sample Observations
    const observations = [
        {date:'2025-12-15',time:'21:30',object:'M42',eyepiece:'25',seeing:'4',notes:'Orion Nevel, prachtig detail van Trapezium zichtbaar'},
        {date:'2025-12-10',time:'20:00',object:'NGC 7009',eyepiece:'10',seeing:'3',notes:'Saturnus Nevel, groene kleur duidelijk zichtbaar'},
        {date:'2025-12-05',time:'22:15',object:'Jupiter',eyepiece:'15',seeing:'5',notes:'Uitstekend, alle 4 manen Io, Europa, Ganymedes, Callisto'},
        {date:'2025-11-28',time:'19:45',object:'M13',eyepiece:'25',seeing:'4',notes:'Hercules bolvormige hoop, individuele sterren'},
        {date:'2025-11-20',time:'21:00',object:'Maan',eyepiece:'10',seeing:'5',notes:'Kraters Tycho en Copernic zeer scherp'}
    ];

    // Sample Media (Videos) - Echte astronomie content
    const media = [
        {type:'video',title:'Refractor Telescoop Gids',id:'vMqDpgwRW80',desc:'Hoe kies je en bedient je een refractor telescoop'},
        {type:'video',title:'Maan Crater Mapping',id:'QbNRwW4H1cI',desc:'Gedetailleerde kraters en maanlandschap'},
        {type:'video',title:'Deep Sky Objects Observeren',id:'tYzMGcUty6s',desc:'Tips voor het waarnemen van nevels en sterrenhopen'}
    ];

    localStorage.setItem('telescopeObservations', JSON.stringify(observations));
    localStorage.setItem('telescopeMedia', JSON.stringify(media));
    localStorage.setItem('telescopeInitialized', 'true');

    console.log('✓ Demo data geladen: 5 waarnemingen + 3 video\'s');
}
