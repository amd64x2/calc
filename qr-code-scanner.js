// qr-code-scanner.js

var html5QrCode;

// Modal kontrol
var modal = document.getElementById("priceModal");
var btn = document.getElementById("show-price-modal");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
    startQRCodeScanner(); // QR kod okuyucuyu başlat
}

span.onclick = function() {
    modal.style.display = "none";
    stopQRCodeScanner(); // QR kod okuyucuyu durdur
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        stopQRCodeScanner(); // QR kod okuyucuyu durdur
    }
}

function startQRCodeScanner() {
    html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess,
        onScanError
    ).catch(err => {
        console.error("QR kod okuyucu başlatılamadı: ", err);
    });
}

function stopQRCodeScanner() {
    if (html5QrCode) {
        html5QrCode.stop().catch(err => {
            console.error("QR kod okuyucu durdurulamadı: ", err);
        });
    }
}

function onScanSuccess(decodedText, decodedResult) {
    // QR kod okuma başarılı
    fetch('fetch_product_info.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'barcode=' + encodeURIComponent(decodedText)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('product-name-value').innerText = decodedText;
        document.getElementById('product-price-value').innerText = `${data.price} TL`;

        applyCustomDiscount();
        
        // Modalı kapat ve QR kod okuyucuyu durdur
        modal.style.display = "none";
        stopQRCodeScanner();
    })
    .catch(error => console.error('Ürün bilgileri alınamadı:', error));
}

function onScanError(errorMessage) {
    console.error("QR kod okuma hatası: ", errorMessage);
}

function applyCustomDiscount() {
    const discountInput = document.getElementById('discount-input');
    const discount = parseFloat(discountInput.value) || 0;
    const productPriceText = document.getElementById('product-price-value').innerText;
    const productPrice = parseFloat(productPriceText.replace(' TL', ''));
    const discountedPrice = productPrice - (productPrice * (discount / 100));
    
    document.getElementById('final-price-value').innerText = discountedPrice.toFixed(2) + ' TL';
}

document.getElementById('discount-input').addEventListener('input', applyCustomDiscount);
