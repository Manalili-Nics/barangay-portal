document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reportForm');
    
    loadReportsTable();
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateReportForm()) {
                const reporterName = document.getElementById('reporterName').value;
                const issueType = document.getElementById('issueType').value;
                const issueLocation = document.getElementById('issueLocation').value;
                const reporterAddress = document.getElementById('reporterAddress').value;
                const reporterContact = document.getElementById('reporterContact').value;
                const issueDescription = document.getElementById('issueDescription').value;
                const dateTime = new Date().toLocaleString('en-PH');
                
                showCustomPopup('Report Submitted', 
                    'Thank you, ' + reporterName + '!<br><br>' +
                    'Your report regarding <strong>' + issueType + '</strong> has been received.<br><br>' +
                    'Location: <strong>' + issueLocation + '</strong><br><br>' +
                    'Report ID: REP-' + Date.now() + '<br><br>' +
                    'Barangay officials will respond within 3-5 days.',
                    'danger');
                
                saveReportToLocal(reporterName, reporterAddress, reporterContact, issueType, issueLocation, issueDescription, dateTime);
                
                form.reset();
                
                document.querySelectorAll('.is-valid, .is-invalid').forEach(function(el) {
                    el.classList.remove('is-valid', 'is-invalid');
                });
            }
        });
    }
});

function showCustomPopup(title, message, type) {
    let existingPopup = document.querySelector('.custom-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    const popup = document.createElement('div');
    popup.className = 'custom-popup ' + type;
    popup.innerHTML = `
        <div class="custom-popup-content">
            <div class="custom-popup-header ${type}">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                <span>${title}</span>
            </div>
            <div class="custom-popup-body">
                ${message}
            </div>
            <div class="custom-popup-footer">
                <button class="custom-popup-btn ${type}" onclick="this.closest('.custom-popup').remove()">OK</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(function() {
        popup.classList.add('show');
    }, 10);
}

function validateReportForm() {
    let isValid = true;
    
    const reporterName = document.getElementById('reporterName');
    const reporterAddress = document.getElementById('reporterAddress');
    const reporterContact = document.getElementById('reporterContact');
    const issueType = document.getElementById('issueType');
    const issueLocation = document.getElementById('issueLocation');
    const issueDescription = document.getElementById('issueDescription');
    
    if (!reporterName.value.trim()) {
        showError(reporterName, 'Please enter your full name');
        isValid = false;
    } else if (reporterName.value.trim().length < 3) {
        showError(reporterName, 'Name must be at least 3 characters');
        isValid = false;
    } else {
        clearError(reporterName);
    }
    
    if (!reporterAddress.value.trim()) {
        showError(reporterAddress, 'Please enter your address or purok');
        isValid = false;
    } else {
        clearError(reporterAddress);
    }
    
    const contactPattern = /^[0-9]{10,11}$/;
    const cleanNumber = reporterContact.value.replace(/[^0-9]/g, '');
    if (!reporterContact.value.trim()) {
        showError(reporterContact, 'Please enter your contact number');
        isValid = false;
    } else if (!contactPattern.test(cleanNumber)) {
        showError(reporterContact, 'Please enter a valid 10-11 digit number');
        isValid = false;
    } else {
        clearError(reporterContact);
    }
    
    if (!issueType.value) {
        showError(issueType, 'Please select an issue type');
        isValid = false;
    } else {
        clearError(issueType);
    }
    
    if (!issueLocation.value.trim()) {
        showError(issueLocation, 'Please provide the specific location');
        isValid = false;
    } else {
        clearError(issueLocation);
    }
    
    if (!issueDescription.value.trim()) {
        showError(issueDescription, 'Please describe the issue');
        isValid = false;
    } else if (issueDescription.value.trim().length < 10) {
        showError(issueDescription, 'Please provide more details (at least 10 characters)');
        isValid = false;
    } else {
        clearError(issueDescription);
    }
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    const feedback = field.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
    }
}

function clearError(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

function saveReportToLocal(name, address, contact, issueType, location, description, dateTime) {
    let reports = JSON.parse(localStorage.getItem('barangayReports') || '[]');
    reports.unshift({ 
        name: name, 
        address: address,
        contact: contact,
        issueType: issueType, 
        location: location,
        description: description,
        dateTime: dateTime,
        id: Date.now()
    });
    localStorage.setItem('barangayReports', JSON.stringify(reports));
    loadReportsTable();
    console.log('Report saved');
}

function loadReportsTable() {
    const tbody = document.getElementById('reportsTableBody');
    if (!tbody) return;
    
    const reports = JSON.parse(localStorage.getItem('barangayReports') || '[]');
    
    if (reports.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No reports yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    reports.forEach(function(report) {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${escapeHtml(report.dateTime)}</td>
            <td><strong>${escapeHtml(report.name)}</strong></td>
            <td>${escapeHtml(report.issueType)}</td>
            <td>${escapeHtml(report.location)}</td>
            <td>${escapeHtml(report.contact)}</td>
        `;
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}