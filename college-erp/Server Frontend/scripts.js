// scripts.js

const apiBaseUrl = 'http://localhost:5000'; // Adjust the port if your server runs on a different one

// Helper function to make API requests
async function makeRequest(url, method, data) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : null
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return { error: 'Failed to make request' };
    }
}

// Add Student
document.getElementById('add-student-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('student-id').value;
    const name = document.getElementById('student-name').value;
    const prn = document.getElementById('student-prn').value;

    const result = await makeRequest(`${apiBaseUrl}/add-student`, 'POST', { studentId, name, prn });

    alert(result.message || result.error);
});

// Search Student
document.getElementById('search-student-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('search-student-id').value;

    const result = await makeRequest(`${apiBaseUrl}/search-student?id=${studentId}`, 'GET');

    const searchResultDiv = document.getElementById('search-result');
    if (result.error) {
        searchResultDiv.textContent = result.error;
    } else {
        searchResultDiv.textContent = JSON.stringify(result, null, 2);
    }
});

// Delete Student
document.getElementById('delete-student-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('delete-student-id').value;

    const result = await makeRequest(`${apiBaseUrl}/search-student?id=${studentId}`, 'DELETE');

    alert(result.message || result.error);
});

// Pay Fees
document.getElementById('pay-fees-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('fee-student-id').value;
    const amount = document.getElementById('fee-amount').value;

    const result = await makeRequest(`${apiBaseUrl}/pay-fees`, 'POST', { studentId, amount });

    alert(result.message || result.error);
});

// Request Document
document.getElementById('request-document-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('doc-student-id').value;
    const documentType = document.getElementById('document-type').value;

    const result = await makeRequest(`${apiBaseUrl}/certificate/requested-documents`, 'POST', { studentId, documentType });

    alert(result.message || result.error);
});

// Submit Exam Form
document.getElementById('exam-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('exam-student-id').value;
    const examName = document.getElementById('exam-name').value;

    const result = await makeRequest(`${apiBaseUrl}/submit-exam-form`, 'POST', { studentId, examName });

    alert(result.message || result.error);
});

// Submit Hall Ticket
document.getElementById('hall-ticket-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('hall-ticket-student-id').value;
    const examName = document.getElementById('hall-ticket-exam-name').value;
    const examDate = document.getElementById('hall-ticket-exam-date').value;
    const venue = document.getElementById('hall-ticket-venue').value;

    const result = await makeRequest(`${apiBaseUrl}/submit-hall-ticket`, 'POST', { studentId, examName, examDate, venue });

    alert(result.message || result.error);
});

// Fetch Hall Ticket
document.getElementById('fetch-hall-ticket-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('fetch-hall-ticket-student-id').value;

    const result = await makeRequest(`${apiBaseUrl}/fetch-hall-ticket?student_id=${studentId}`, 'GET');

    const hallTicketDetailsDiv = document.getElementById('hall-ticket-details');
    if (result.error) {
        hallTicketDetailsDiv.textContent = result.error;
    } else {
        hallTicketDetailsDiv.textContent = JSON.stringify(result, null, 2);
    }
});
