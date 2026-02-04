// API Configuration
const API_URL = 'https://marowael-deployment.hf.space';
const EXTRACT_ENDPOINT = '/extract-to-excel';

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const changeBtn = document.getElementById('changeBtn');
const extractBtn = document.getElementById('extractBtn');
const statusSection = document.getElementById('statusSection');
const resultSection = document.getElementById('resultSection');
const errorSection = document.getElementById('errorSection');
const downloadBtn = document.getElementById('downloadBtn');
const newExtractBtn = document.getElementById('newExtractBtn');
const retryBtn = document.getElementById('retryBtn');
const statusText = document.getElementById('statusText');
const statusDetail = document.getElementById('statusDetail');
const errorMessage = document.getElementById('errorMessage');

// State
let selectedFile = null;

// Initialize Event Listeners
function init() {
    // Upload area click
    uploadArea.addEventListener('click', () => fileInput.click());
    
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Button clicks
    changeBtn.addEventListener('click', resetToUpload);
    extractBtn.addEventListener('click', extractTable);
    newExtractBtn.addEventListener('click', resetToUpload);
    retryBtn.addEventListener('click', resetToUpload);
}

// File Selection Handlers
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        processFile(file);
    } else {
        showError('Please select a valid image file (JPG, PNG, JPEG)');
    }
}

function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('drag-over');
}

function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('drag-over');
}

function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('drag-over');
    
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        processFile(file);
    } else {
        showError('Please drop a valid image file (JPG, PNG, JPEG)');
    }
}

// File Processing
function processFile(file) {
    selectedFile = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        showSection('preview');
    };
    reader.readAsDataURL(file);
}

// Extract Table Function
async function extractTable() {
    if (!selectedFile) {
        showError('No file selected');
        return;
    }
    
    // Show loading state
    showSection('status');
    extractBtn.disabled = true;
    
    try {
        // Create form data
        const formData = new FormData();
        formData.append('image', selectedFile);
        
        // Update status
        updateStatus('Processing your image...', 'Analyzing table structure with VGG16');
        
        // Make API request
        const response = await fetch(`${API_URL}${EXTRACT_ENDPOINT}`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        // Get the blob
        const blob = await response.blob();
        
        // Create download URL
        const url = window.URL.createObjectURL(blob);
        downloadBtn.href = url;
        
        // Show success
        showSection('result');
        
    } catch (error) {
        console.error('Extraction error:', error);
        showError(error.message || 'Failed to extract table. Please try again.');
    } finally {
        extractBtn.disabled = false;
    }
}

// UI State Management
function showSection(section) {
    // Hide all sections
    uploadArea.style.display = 'none';
    previewSection.style.display = 'none';
    statusSection.style.display = 'none';
    resultSection.style.display = 'none';
    errorSection.style.display = 'none';
    
    // Show requested section
    switch(section) {
        case 'upload':
            uploadArea.style.display = 'block';
            break;
        case 'preview':
            previewSection.style.display = 'block';
            break;
        case 'status':
            statusSection.style.display = 'block';
            break;
        case 'result':
            resultSection.style.display = 'block';
            break;
        case 'error':
            errorSection.style.display = 'block';
            break;
    }
}

function updateStatus(text, detail) {
    statusText.textContent = text;
    statusDetail.textContent = detail;
}

function showError(message) {
    errorMessage.textContent = message;
    showSection('error');
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        if (errorSection.style.display !== 'none') {
            resetToUpload();
        }
    }, 5000);
}

function resetToUpload() {
    selectedFile = null;
    fileInput.value = '';
    previewImage.src = '';
    showSection('upload');
    
    // Revoke any existing download URL
    if (downloadBtn.href && downloadBtn.href.startsWith('blob:')) {
        window.URL.revokeObjectURL(downloadBtn.href);
    }
    downloadBtn.href = '#';
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
