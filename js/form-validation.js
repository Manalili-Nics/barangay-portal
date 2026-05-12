// FORM VALIDATION FOR CERTIFICATE REQUESTS

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('certificateForm');
    const successAlert = document.getElementById('successAlert');
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission
            
            // Validate the form
            if (validateForm()) {
                // Get form data
                const formData = {
                    fullName: document.getElementById('fullName').value,
                    address: document.getElementById('address').value,
                    email: document.getElementById('email').value,
                    certificateType: document.getElementById('certificateType').value,
                    purpose: document.getElementById('purpose').value,
                    dateSubmitted: new Date().toLocaleString('en-PH')
                };
                
                // Show modal with confirmation
                const modalMessage = document.getElementById('modalMessage');
                modalMessage.innerHTML = `
                    <p><strong>Thank you, ${formData.fullName}!</strong></p>
                    <p>Your request for <strong>${formData.certificateType}</strong> has been received.</p>
                    <p>You will receive a confirmation at <strong>${formData.email}</strong>.</p>
                    <p class="text-muted small">Request ID: CERT-${Date.now()}</p>
                    <hr>
                    <p class="text-muted small">Please wait 2-3 business days for processing.</p>
                `;
                
                modal.show();
                
                // Show success alert
                successAlert.classList.remove('d-none');
                
                // Reset form
                form.reset();
                
                // Remove validation styling
                document.querySelectorAll('.is-valid').forEach(el => {
                    el.classList.remove('is-valid');
                });
                
                // Hide alert after 5 seconds
                setTimeout(() => {
                    successAlert.classList.add('d-none');
                }, 5000);
                
                // Save to localStorage (simulated database)
                saveRequestToLocal(formData);
            }
        });
    }
});

// Validation function
function validateForm() {
    let isValid = true;
    
    // Get all required fields
    const fullName = document.getElementById('fullName');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const certificateType = document.getElementById('certificateType');
    const purpose = document.getElementById('purpose');
    
    // Name validation
    if (!fullName.value.trim()) {
        showError(fullName, 'Please enter your full name');
        isValid = false;
    } else if (fullName.value.trim().length < 3) {
        showError(fullName, 'Name must be at least 3 characters');
        isValid = false;
    } else {
        clearError(fullName);
    }
    
    // Address validation
    if (!address.value.trim()) {
        showError(address, 'Please enter your address');
        isValid = false;
    } else {
        clearError(address);
    }
    
    // Email validation (regex pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Please enter your email address');
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        showError(email, 'Please enter a valid email (e.g., name@example.com)');
        isValid = false;
    } else {
        clearError(email);
    }
    
    // Certificate type validation
    if (!certificateType.value) {
        showError(certificateType, 'Please select a certificate type');
        isValid = false;
    } else {
        clearError(certificateType);
    }
    
    // Purpose validation
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

function saveRequestToLocal(data) {
    let requests = JSON.parse(localStorage.getItem('barangayRequests') || '[]');
    requests.push(data);
    localStorage.setItem('barangayRequests', JSON.stringify(requests));
    console.log('Request saved:', data);
    console.log('Total requests:', requests.length);
}