// BARANGAY PORTAL - JAVASCRIPT FUNCTIONALITY
// This script demonstrates DOM manipulation for the announcements

// 15 ANNOUNCEMENTS as requested
const announcements = [
    {
        id: 1,
        title: "🍽️ Feeding Program",
        date: "May 20, 2026",
        description: "Free feeding program for children ages 3-10 at Barangay Hall. 9AM - 12PM. Registration required.",
        category: "health",
        isNew: true
    },
    {
        id: 2,
        title: "🌿 Clean and Green Project",
        date: "May 25, 2026",
        description: "Community-wide clean-up drive. Assembly at 7AM at Barangay Plaza. Bring your own gloves.",
        category: "event",
        isNew: true
    },
    {
        id: 3,
        title: "🚫 Anti-Drug Abuse Council Meeting",
        date: "May 22, 2026",
        description: "Monthly ADAC meeting at Barangay Conference Room. 2PM. All barangay officials required to attend.",
        category: "meeting",
        isNew: false
    },
    {
        id: 4,
        title: "📚 Alternative Learning System (ALS)",
        date: "June 1, 2026",
        description: "Enrollment for ALS is now open. For out-of-school youth and adults. Register at Barangay Hall.",
        category: "education",
        isNew: true
    },
    {
        id: 5,
        title: "👴 Senior Citizen and PWD Assistance",
        date: "May 28, 2026",
        description: "Distribution of financial assistance for senior citizens and PWDs. Bring your ID and booklet.",
        category: "social",
        isNew: false
    },
    {
        id: 6,
        title: "🔧 Barangay Kabuhayan Skills Training",
        date: "June 5, 2026",
        description: "Free skills training: Dressmaking, Cooking, and Computer Literacy. Limited slots. Register now!",
        category: "livelihood",
        isNew: true
    },
    {
        id: 7,
        title: "🥗 Nutrition Scholar Services",
        date: "Every Saturday",
        description: "Nutrition assessment and supplemental feeding for malnourished children. 8AM at Health Center.",
        category: "health",
        isNew: false
    },
    {
        id: 8,
        title: "💉 Free Vaccinations for Children",
        date: "May 30, 2026",
        description: "Free routine vaccines (BCG, HepB, Pentavalent). Bring baby's vaccination card. 8AM-3PM.",
        category: "health",
        isNew: true
    },
    {
        id: 9,
        title: "🦟 Dengue Prevention Campaign",
        date: "Ongoing",
        description: "Search and destroy mosquito breeding sites. Fogging operations every Friday in affected areas.",
        category: "health",
        isNew: false
    },
    {
        id: 10,
        title: "💼 Job Fair",
        date: "June 10, 2026",
        description: "Barangay Job Fair with local employers. Bring multiple copies of your resume. 9AM-4PM.",
        category: "livelihood",
        isNew: true
    },
    {
        id: 11,
        title: "🏆 Barangay Sports Fest",
        date: "June 15-20, 2026",
        description: "Inter-purok basketball, volleyball, and sepak takraw. Register your team at Barangay Hall.",
        category: "event",
        isNew: false
    },
    {
        id: 12,
        title: "📝 Census 2026",
        date: "Ongoing",
        description: "Barangay census is ongoing. Please cooperate with our enumerators wearing official IDs.",
        category: "announcement",
        isNew: false
    },
    {
        id: 13,
        title: "🚸 Child Protection Seminar",
        date: "June 8, 2026",
        description: "Seminar on child rights and protection for parents and guardians. BCPC members will lead.",
        category: "education",
        isNew: true
    },
    {
        id: 14,
        title: "🧑‍⚕️ Free Medical Check-up",
        date: "June 12, 2026",
        description: "Independence Day medical mission. Free check-up, medicines, and vitamins. First come, first served.",
        category: "health",
        isNew: true
    },
    {
        id: 15,
        title: "🤝 Barangay Assembly",
        date: "June 25, 2026",
        description: "Semi-annual Barangay Assembly. Discuss budget, projects, and community concerns. 8AM at Barangay Plaza.",
        category: "meeting",
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
        
        // Show only first 6 announcements on homepage
        const latestAnnouncements = announcements.slice(0, 6);
        
        // Loop through announcements array
        latestAnnouncements.forEach(announcement => {
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
    
    // For announcements.html - load accordion with ALL 15 announcements
    loadAccordionAnnouncements();
}

// DOM manipulation function for the accordion page
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
                        <strong>${announcement.title}</strong> - <span class="text-muted">${announcement.date}</span>
                        ${announcement.isNew ? ' <span class="badge bg-danger ms-2">NEW</span>' : ''}
                    </button>
                </h2>
                <div id="collapse${announcement.id}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                     data-bs-parent="#announcementAccordion">
                    <div class="accordion-body">
                        <p>${announcement.description}</p>
                        <hr>
                        <small class="text-muted">
                            <i class="fas fa-tag"></i> Category: ${announcement.category} | 
                            <i class="fas fa-user"></i> Posted by: Barangay Captain's Office
                        </small>
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
    console.log(`Loaded ${announcements.length} announcements total`);
});