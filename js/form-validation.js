document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('certificateForm');
    const successAlert = document.getElementById('successAlert');
    
    const modalElement = document.getElementById('confirmationModal');
    let modal = null;
    
    if (modalElement) {
        modal = new bootstrap.Modal(modalElement);
    }
    
    let isSubmitting = false;
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (isSubmitting) {
                return;
            }
            
            if (validateForm()) {
                isSubmitting = true;
                
                const formData = {
                    fullName: document.getElementById('fullName').value,
                    address: document.getElementById('address').value,
                    email: document.getElementById('email').value,
                    certificateType: document.getElementById('certificateType').value,
                    purpose: document.getElementById('purpose').value,
                    dateSubmitted: new Date().toLocaleString('en-PH')
                };
                
                const modalMessage = document.getElementById('modalMessage');
                if (modalMessage) {
                    modalMessage.innerHTML = `
                        <p><strong>Thank you, ${escapeHtml(formData.fullName)}!</strong></p>
                        <p>Your request for <strong>${escapeHtml(formData.certificateType)}</strong> has been received.</p>
                        <p>You will receive a confirmation at <strong>${escapeHtml(formData.email)}</strong>.</p>
                        <p class="text-muted small">Request ID: CERT-${Date.now()}</p>
                        <hr>
                        <p class="text-muted small">Please wait 2-3 business days for processing.</p>
                    `;
                }
                
                if (modal) {
                    modal.show();
                }
                
                if (successAlert) {
                    successAlert.classList.remove('d-none');
                }
                
                form.reset();
                
                document.querySelectorAll('.is-valid').forEach(el => {
                    el.classList.remove('is-valid');
                });
                
                setTimeout(() => {
                    if (successAlert) {
                        successAlert.classList.add('d-none');
                    }
                }, 5000);
                
                saveRequestToLocal(formData);
                
                if (modal) {
                    modalElement.addEventListener('hidden.bs.modal', function() {
                        isSubmitting = false;
                    }, { once: true });
                } else {
                    setTimeout(() => {
                        isSubmitting = false;
                    }, 1000);
                }
            }
        });
    }
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
        showError(email, 'Please enter a valid email (e.g., name@example.com)');
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

function saveRequestToLocal(data) {
    let requests = JSON.parse(localStorage.getItem('barangayRequests') || '[]');
    requests.push(data);
    localStorage.setItem('barangayRequests', JSON.stringify(requests));
    console.log('Request saved:', data);
    console.log('Total requests:', requests.length);
}