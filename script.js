// JSON verisi
const data = {
    "Brand1": {
        "1.57 SCC": { "price": "100 TL", "discount": "10%" },
        "Product2": { "price": "150 TL", "discount": "5%" },
        "Product3": { "price": "200 TL", "discount": "20%" },
        "Product4": { "price": "200 TL", "discount": "20%" },
        "logo": "logo/brand1-logo.png"
    },
    "Brand2": {
        "Product1": { "price": "300 TL", "discount": "15%" },
        "Product2": { "price": "350 TL", "discount": "10%" },
        "Product3": { "price": "400 TL", "discount": "25%" },
        "logo": "logo/brand2-logo.png"
    },
    "Brand3": {
        "Product1": { "price": "500 TL", "discount": "5%" },
        "Product2": { "price": "550 TL", "discount": "20%" },
        "Product3": { "price": "600 TL", "discount": "30%" },
        "logo": "logo/brand3-logo.png"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // İlk olarak Brand1 tabını aktif hale getirin
        const defaultTab = document.querySelector('.tablinks[onclick="openTab(event, \'Brand3\')"]');
        console.log('Seçilen Tab Linki:', defaultTab); // Hata ayıklama
        if (defaultTab) {
            defaultTab.click();
        } else {
            console.log('Brand1 tab linki bulunamadı');
        }
    }, 0); // 0 milisaniye gecikme BRAND3 butonu seçili gelsin
});








// Şu anki ürün fiyatını tutmak için bir değişken
let currentProductPrice = 0;

function openTab(evt, brandName) {
    var i, tabcontent, tablinks;

    // Tüm tabcontent'leri gizle
    tabcontent = document.getElementsByClassName("tab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Tüm tablink'leri pasif hale getir
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Seçilen tabcontent'i göster ve aktif tab'ı işaretle
    document.getElementById(brandName).style.display = "block";
    evt.currentTarget.className += " active";

    // Marka logosunu güncelle
    updateBrandLogo(brandName);

    // Fiyat panelindeki bilgileri temizle
    clearPricingPanel();
}

function updateBrandLogo(brandName) {
    // Tüm logo resimlerini gizle
    const logos = document.querySelectorAll('#brand-logo');
    logos.forEach(logo => {
        logo.style.display = 'none';
    });

    // Seçilen markanın logosunu göster
    const logoElement = document.querySelector(`#${brandName} #brand-logo`);
    if (logoElement) {
        logoElement.src = data[brandName].logo;
        logoElement.style.display = 'block';
    }
}

function clearPricingPanel() {
    document.getElementById('product-name-value').innerText = '-';
    document.getElementById('product-price-value').innerText = '-';
    document.getElementById('product-discount-value').innerText = '-';
    document.getElementById('final-price-value').innerText = '-';
    currentProductPrice = 0; // Fiyatı sıfırla
}

function getProductPrice(brand, product) {
    // JSON verisinden ürün bilgilerini al
    const productData = data[brand][product];
    currentProductPrice = parseFloat(productData.price.replace(' TL', '')); // TL'yi kaldır ve sayıya çevir
    
    // Fiyat ve iskonto bilgisini güncelle
    updatePricingPanel(product, productData.price, productData.discount);

    // İskonto oranını JSON dosyasından al ve input alanına yerleştir
    const discountValue = parseFloat(productData.discount.replace('%', '')); // '%' işaretini kaldır ve sayıya çevir
    document.getElementById('discount-input').value = discountValue;
 

    // İskonto kutusundaki değeri kontrol et ve uygula
    applyCustomDiscount();
}

function updatePricingPanel(productName, productPrice, productDiscount) {
    document.getElementById('product-name-value').innerText = productName;
    document.getElementById('product-price-value').innerText = productPrice;
    document.getElementById('product-discount-value').innerText = productDiscount;

    //document.getElementById('product-discount-value').innerText = `${customDiscount}%`;
}

function applyCustomDiscount() {
    const customDiscount = parseFloat(document.getElementById('discount-input').value) || 0;
    
    if (isNaN(customDiscount)) customDiscount = 0; // Eğer geçersiz bir değer varsa 0'a set et

    // İskonto oranı yüzdesine göre indirimli fiyatı hesapla
    const discountedPrice = currentProductPrice * (1 - (customDiscount / 100));
    
    // Hesaplanan fiyatı doğru formatta göster
    document.getElementById('final-price-value').innerText = discountedPrice.toFixed(2) + ' TL';
    
    document.getElementById('product-discount-value').innerText =customDiscount;

    document.getElementById('discount-input-value').innerText =(currentProductPrice - discountedPrice).toFixed(2) + ' TL';
   
   

}

// Ürün butonlarına tıklama olayını dinleyen kodu ekleyin
document.querySelectorAll('.product-button').forEach(button => {
    button.addEventListener('click', function() {
        const brand = button.getAttribute('data-brand');
        const product = button.getAttribute('data-product');
        getProductPrice(brand, product);
    });
});

// İskonto kutusunda değişiklik olduğunda güncelleme yap
document.getElementById('discount-input').addEventListener('input', applyCustomDiscount);
