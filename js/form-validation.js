document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('certificateForm');
    
    loadRequestsTable();
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm()) {
                const fullName = document.getElementById('fullName').value;
                const certificateType = document.getElementById('certificateType').value;
                const email = document.getElementById('email').value;
                const address = document.getElementById('address').value;
                const purpose = document.getElementById('purpose').value;
                const dateTime = new Date().toLocaleString('en-PH');
                
                showCustomPopup('Request Confirmed', 
                    'Thank you, ' + fullName + '!<br><br>' +
                    'Your request for <strong>' + certificateType + '</strong> has been received.<br><br>' +
                    'Confirmation will be sent to: <strong>' + email + '</strong><br><br>' +
                    'Request ID: CERT-' + Date.now(),
                    'success');
                
                saveRequestToLocal(fullName, address, email, certificateType, purpose, dateTime);
                
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

function validateForm() {
    let isValid = true;
    
    const fullName = document.getElementById('fullName');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const certificateType = document.getElementById('certificateType');
    const purpose = document.getElementById('purpose');
    
    if (!fullName.value.trim()) {
        showError(fullName, 'Please enter your full name');
        isValid = false;
    } else if (fullName.value.trim().length < 3) {
        showError(fullName, 'Name must be at least 3 characters');
        isValid = false;
    } else {
        clearError(fullName);
    }
    
    if (!address.value.trim()) {
        showError(address, 'Please enter your address');
        isValid = false;
    } else {
        clearError(address);
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Please enter your email address');
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        clearError(email);
    }
    
    if (!certificateType.value) {
        showError(certificateType, 'Please select a certificate type');
        isValid = false;
    } else {
        clearError(certificateType);
    }
    
    if (!purpose.value.trim()) {
        showError(purpose, 'Please state the purpose of your request');
        isValid = false;
    } else if (purpose.value.trim().length < 10) {
        showError(purpose, 'Please provide more details (at least 10 characters)');
        isValid = false;
    } else {
        clearError(purpose);
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

function saveRequestToLocal(name, address, email, certType, purpose, dateTime) {
    let requests = JSON.parse(localStorage.getItem('barangayRequests') || '[]');
    requests.unshift({ 
        name: name, 
        address: address,
        email: email, 
        certificateType: certType, 
        purpose: purpose,
        dateTime: dateTime,
        id: Date.now()
    });
    localStorage.setItem('barangayRequests', JSON.stringify(requests));
    loadRequestsTable();
    console.log('Request saved');
}

function loadRequestsTable() {
    const tbody = document.getElementById('requestsTableBody');
    if (!tbody) return;
    
    const requests = JSON.parse(localStorage.getItem('barangayRequests') || '[]');
    
    if (requests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No requests yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    requests.forEach(function(request) {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${escapeHtml(request.dateTime)}</td>
            <td><strong>${escapeHtml(request.name)}</strong></td>
            <td>${escapeHtml(request.certificateType)}</td>
            <td>${escapeHtml(request.email)}</td>
        `;
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}