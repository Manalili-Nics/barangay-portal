// FORM VALIDATION FOR REPORT ISSUES

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reportForm');
    const successAlert = document.getElementById('reportSuccessAlert');
    const modal = new bootstrap.Modal(document.getElementById('reportModal'));
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateReportForm()) {
                const formData = {
                    reporterName: document.getElementById('reporterName').value,
                    reporterAddress: document.getElementById('reporterAddress').value,
                    reporterContact: document.getElementById('reporterContact').value,
                    issueType: document.getElementById('issueType').value,
                    issueLocation: document.getElementById('issueLocation').value,
                    issueDescription: document.getElementById('issueDescription').value,
                    dateSubmitted: new Date().toLocaleString('en-PH')
                };
                
                const modalMessage = document.getElementById('reportModalMessage');
                modalMessage.innerHTML = `
                    <p><strong>Thank you, ${formData.reporterName}!</strong></p>
                    <p>Your report regarding <strong>${formData.issueType}</strong> has been submitted.</p>
                    <p>Location: ${formData.issueLocation}</p>
                    <p class="text-muted small">Report ID: REP-${Date.now()}</p>
                    <hr>
                    <p class="text-muted small">Barangay officials will address this within 3-5 business days.</p>
                `;
                
                modal.show();
                successAlert.classList.remove('d-none');
                form.reset();
                
                document.querySelectorAll('.is-valid').forEach(el => {
                    el.classList.remove('is-valid');
                });
                
                setTimeout(() => {
                    successAlert.classList.add('d-none');
                }, 5000);
                
                saveReportToLocal(formData);
            }
        });
    }
});

function validateReportForm() {
    let isValid = true;
    
    const reporterName = document.getElementById('reporterName');
    const reporterAddress = document.getElementById('reporterAddress');
    const reporterContact = document.getElementById('reporterContact');
    const issueType = document.getElementById('issueType');
    const issueLocation = document.getElementById('issueLocation');
    const issueDescription = document.getElementById('issueDescription');
    
    // Name validation
    if (!reporterName.value.trim()) {
        showReportError(reporterName, 'Please enter your full name');
        isValid = false;
    } else if (reporterName.value.trim().length < 3) {
        showReportError(reporterName, 'Name must be at least 3 characters');
        isValid = false;
    } else {
        clearReportError(reporterName);
    }
    
    // Address validation
    if (!reporterAddress.value.trim()) {
        showReportError(reporterAddress, 'Please enter your address or purok');
        isValid = false;
    } else {
        clearReportError(reporterAddress);
    }
    
    // Contact number validation
    const contactPattern = /^[0-9]{10,11}$/;
    if (!reporterContact.value.trim()) {
        showReportError(reporterContact, 'Please enter your contact number');
        isValid = false;
    } else if (!contactPattern.test(reporterContact.value.replace(/[^0-9]/g, ''))) {
        showReportError(reporterContact, 'Please enter a valid 10-11 digit number');
        isValid = false;
    } else {
        clearReportError(reporterContact);
    }
    
    // Issue type validation
    if (!issueType.value) {
        showReportError(issueType, 'Please select an issue type');
        isValid = false;
    } else {
        clearReportError(issueType);
    }
    
    // Location validation
    if (!issueLocation.value.trim()) {
        showReportError(issueLocation, 'Please provide the specific location');
        isValid = false;
    } else {
        clearReportError(issueLocation);
    }
    
    // Description validation
    if (!issueDescription.value.trim()) {
        showReportError(issueDescription, 'Please describe the issue');
        isValid = false;
    } else if (issueDescription.value.trim().length < 10) {
        showReportError(issueDescription, 'Please provide more details (at least 10 characters)');
        isValid = false;
    } else {
        clearReportError(issueDescription);
    }
    
    return isValid;
}

function showReportError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    const feedback = field.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
    }
}

function clearReportError(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

function saveReportToLocal(data) {
    let reports = JSON.parse(localStorage.getItem('barangayReports') || '[]');
    reports.push(data);
    localStorage.setItem('barangayReports', JSON.stringify(reports));
    console.log('Report saved:', data);
}