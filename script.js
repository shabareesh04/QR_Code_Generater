const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.getElementById('qr-body'); 

let size = sizes.value;

generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput(); 
});

sizes.addEventListener('change', (e) => {
    size = e.target.value;
});

downloadBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    const canvas = qrContainer.querySelector('canvas');
    const img = qrContainer.querySelector('img');

    if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        downloadBtn.href = dataURL;
        downloadBtn.download = "qrcode.png";
        
        const downloadTrigger = document.createElement('a');
        downloadTrigger.href = dataURL;
        downloadTrigger.download = "qrcode.png";
        document.body.appendChild(downloadTrigger);
        downloadTrigger.click();
        document.body.removeChild(downloadTrigger);

    } else if (img) {
        downloadBtn.href = img.src;
        downloadBtn.download = "qrcode.png";
        const downloadTrigger = document.createElement('a');
        downloadTrigger.href = img.src;
        downloadTrigger.download = "qrcode.png";
        document.body.appendChild(downloadTrigger);
        downloadTrigger.click();
        document.body.removeChild(downloadTrigger);
    } else {
        alert("Please generate a QR Code first!");
    }
});


function isEmptyInput() {
    if (qrText.value.trim().length > 0) {
        generateQRCode();
    } else {
        alert("Enter the text or URL to generate your QR code");
    }
}

function generateQRCode() {
    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
        text: qrText.value.trim(),
        height: size,
        width: size,
        correctLevel: QRCode.CorrectLevel.H
    });
}