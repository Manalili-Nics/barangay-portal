// BARANGAY PORTAL - JAVASCRIPT FUNCTIONALITY
// This script demonstrates DOM manipulation for the announcements

// Announcement data (simulated from a database)
const announcements = [
    {
        id: 1,
        title: "📢 Free Medical Mission",
        date: "December 15, 2025",
        description: "Free check-up and medicines at Barangay Hall. 8AM - 5PM",
        category: "health",
        isNew: true
    },
    {
        id: 2,
        title: "🏆 Barangay Clean-Up Drive",
        date: "December 20, 2025",
        description: "Join us in making Barangay Mabuhay clean and green! Assembly at 7AM.",
        category: "event",
        isNew: false
    },
    {
        id: 3,
        title: "📋 Census 2025",
        date: "December 10, 2025",
        description: "Barangay census is ongoing. Please cooperate with our enumerators.",
        category: "announcement",
        isNew: true
    },
    {
        id: 4,
        title: "💉 Anti-Dengue Campaign",
        date: "December 25, 2025",
        description: "Fogging operations scheduled this weekend. Keep your surroundings clean.",
        category: "health",
        isNew: false
    }
];

// FUNCTION FOR VIDEO PRESENTATION:
// This function demonstrates DOM manipulation - UPDATING PAGE WITHOUT REFRESH
function loadAnnouncements() {
    console.log("Loading announcements dynamically...");
    
    // Get the container element from the DOM
    const container = document.getElementById('announcementContainer');
    
    // Check if container exists (homepage)
    if (container) {
        // Clear existing content
        container.innerHTML = '';
        
        // Loop through announcements array
        announcements.forEach(announcement => {
            // Create a new card element using DOM manipulation
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4';
            
            // Set inner HTML of the card
            card.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <h5 class="card-title">${announcement.title}</h5>
                            ${announcement.isNew ? '<span class="badge bg-danger">NEW</span>' : ''}
                        </div>
                        <p class="text-muted small"><i class="far fa-calendar-alt"></i> ${announcement.date}</p>
                        <p class="card-text">${announcement.description}</p>
                        <button class="btn btn-outline-success btn-sm" onclick="showAnnouncementDetails(${announcement.id})">
                            Read More <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;
            
            // Append the card to the container
            container.appendChild(card);
        });
    }
    
    // For announcements.html - load accordion
    loadAccordionAnnouncements();
}

// Another DOM manipulation function for the accordion page
function loadAccordionAnnouncements() {
    const accordionContainer = document.getElementById('announcementAccordion');
    
    if (accordionContainer) {
        accordionContainer.innerHTML = '';
        
        announcements.forEach((announcement, index) => {
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';
            accordionItem.innerHTML = `
                <h2 class="accordion-header">
                    <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#collapse${announcement.id}">
                        <strong>${announcement.title}</strong> - ${announcement.date}
                    </button>
                </h2>
                <div id="collapse${announcement.id}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                     data-bs-parent="#announcementAccordion">
                    <div class="accordion-body">
                        ${announcement.description}
                        <hr>
                        <small class="text-muted">Posted by: Barangay Captain's Office</small>
                    </div>
                </div>
            `;
            accordionContainer.appendChild(accordionItem);
        });
    }
}

// Function to show details (for demo)
function showAnnouncementDetails(id) {
    const announcement = announcements.find(a => a.id === id);
    if (announcement) {
        alert(`📢 ${announcement.title}\n\n📅 Date: ${announcement.date}\n\n📝 ${announcement.description}\n\n🏷️ Category: ${announcement.category}`);
    }
}

// Live clock update - another DOM manipulation example
function updateLiveDateTime() {
    const clockElement = document.getElementById('liveClock');
    if (clockElement) {
        const now = new Date();
        const dateTimeString = now.toLocaleString('en-PH', {
            timeZone: 'Asia/Manila',
            dateStyle: 'full',
            timeStyle: 'medium'
        });
        clockElement.textContent = `🇵🇭 ${dateTimeString}`;
    }
}

// Search/Filter functionality (DOM manipulation)
function filterAnnouncements(category) {
    const cards = document.querySelectorAll('#announcementContainer .col-md-6');
    
    cards.forEach(card => {
        const cardText = card.innerText.toLowerCase();
        if (category === 'all' || cardText.includes(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Load announcements when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadAnnouncements();
    
    // Start live clock if element exists
    if (document.getElementById('liveClock')) {
        setInterval(updateLiveDateTime, 1000);
    }
    
    console.log("Barangay Portal is ready! 🇵🇭");
});