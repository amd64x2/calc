const data = {
    "SEIKO": {
        "1.57 SCC": { 
            "price": "4200 TL", 
            "discount": "40%",
            "color": "Beyaz",
            "index": "1.56",
            "focus": "Tek"
        },
        "Product2": { 
            "price": "150 TL", 
            "discount": "40%",
            "color": "Color",
            "index": "1.60",
            "focus": "Tek"
        },
        "Product3": { 
            "price": "200 TL", 
            "discount": "40%",
            "color": "Beyaz",
            "index": "1.67",
            "focus": "Cok"
        },
        "Product4": { 
            "price": "200 TL", 
            "discount": "40%",
            "color": "Beyaz",
            "index": "1.74",
            "focus": "Tek"
        },
        "logo": "logo/brand1-logo.png"
    },
    "HOYA": {
        "1.60 EYNOA": { 
            "price": "100 TL", 
            "discount": "45%",
            "color": "Beyaz",
            "index": "1.56",
            "focus": "Tek"
        },
        "HOYA2": { 
            "price": "150 TL", 
            "discount": "45%",
            "color": "Color",
            "index": "1.60",
            "focus": "Tek"
        },
        "HOYA3": { 
            "price": "200 TL", 
            "discount": "45%",
            "color": "Beyaz",
            "index": "1.67",
            "focus": "Cok"
        },
        "HOYA4": { 
            "price": "200 TL", 
            "discount": "45%",
            "color": "Beyaz",
            "index": "1.74",
            "focus": "Tek"
        },
        "logo": "logo/brand2-logo.png"
    },
    "Brand3": {
        "1.57 SCC": { 
            "price": "100 TL", 
            "discount": "50%",
            "color": "Beyaz",
            "index": "1.56",
            "focus": "Tek"
        },
        "Product2": { 
            "price": "150 TL", 
            "discount": "50%",
            "color": "Color",
            "index": "1.60",
            "focus": "Tek"
        },
        "Product3": { 
            "price": "200 TL", 
            "discount": "50%",
            "color": "Beyaz",
            "index": "1.67",
            "focus": "Cok"
        },
        "Product4": { 
            "price": "200 TL", 
            "discount": "50%",
            "color": "Beyaz",
            "index": "1.74",
            "focus": "Tek"
        },
        "logo": "logo/brand3-logo.png"
    }
};









//----------------
    const discountInput = document.getElementById('discount-input');
    const decreaseButton = document.getElementById('decrease-discount');
    const increaseButton = document.getElementById('increase-discount');

    decreaseButton.addEventListener('click', () => {
        let currentValue = parseInt(discountInput.value) || 0;
        if (currentValue > 0) {
            discountInput.value = Math.max(currentValue - 5, 0);
        }
        applyCustomDiscount(); // İndirim uygulandıktan sonra paneli g
    });

    increaseButton.addEventListener('click', () => {
        let currentValue = parseInt(discountInput.value) || 0;
        if (currentValue < 50) {
            discountInput.value = Math.min(currentValue + 5, 50);
        }
        applyCustomDiscount(); // İndirim uygulandıktan sonra paneli güncelle
    });
//----------------






// Şu anki ürün fiyatını tutmak için bir değişken
let currentProductPrice = 0;
/*
// seçilince, fiyat tablosunu gizlemez --------------------------------------
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
*/


function openTab(evt, brandName) { // FİYAT TABLOSUNU GİZLER
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

    // Tabloyu gizle veya göster
    if (brandName === 'Brand4') {
        document.getElementById('pricing-panel').style.display = 'none'; // Tabloyu gizle
    } else {
        document.getElementById('pricing-panel').style.display = 'block'; // Tabloyu göster
    }
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
    document.getElementById('discount-input-value').innerText = '-';
    document.getElementById('final-price-value').innerText = '-';  
    document.getElementById('discount-input').value = 0; // İskonto alanını sıfırla 
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
   
    //document.getElementById('product-price-value').innerText = productPrice.toFixed(2) + ' TL';

    document.getElementById('final-price-value').innerText = discountedPrice.toFixed(2) + ' TL';
    
    document.getElementById('product-discount-value').innerText ='%' +customDiscount;

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













//---------------
// İskonto miktarını artıran fonksiyon
function increaseDiscount() {
    const userDiscountInput = document.querySelector('#user-discount-input');
    let currentDiscount = parseFloat(userDiscountInput.value) || 35; // Başlangıç değeri 40
    if (currentDiscount < 50) { // Maksimum değer %50
        userDiscountInput.value = Math.min(currentDiscount + 5, 50); // Her seferinde 5 artır
        applyFilters(); // Filtreleri uygulayarak tabloyu güncelle
    }
}

/*
// İskonto miktarını azaltan fonksiyon
function decreaseDiscount() {
    const userDiscountInput = document.querySelector('#user-discount-input');
    let currentDiscount = parseFloat(userDiscountInput.value) || 40; // Başlangıç değeri 40
    if (currentDiscount > 0) { // Minimum değer 0
        userDiscountInput.value = Math.max(currentDiscount - 5, 0); // Her seferinde 5 azalt    
        applyFilters(); // Filtreleri uygulayarak tabloyu güncelle
    }
}
*/
// İskonto miktarını azaltan fonksiyon 40 dan küçükse input "" olsun
function decreaseDiscount() {
    const userDiscountInput = document.querySelector('#user-discount-input');
    let currentDiscount = parseFloat(userDiscountInput.value) || 40; // Başlangıç değeri 40
    
    // İskontoyu 5 azalt
    if (currentDiscount > 0) {
        currentDiscount = Math.max(currentDiscount - 5, 0);
        
        // Eğer değer 40'tan küçükse input alanını boş bırak
        if (currentDiscount < 40) {
            userDiscountInput.value = '';
        } else {
            userDiscountInput.value = currentDiscount; // Aksi takdirde yeni değeri ayarla
        }
        
        applyFilters(); // Filtreleri uygulayarak tabloyu güncelle
    }
}


// - butonuna tıklama olayını ekle
document.querySelector('#user-decrease-discount').addEventListener('click', decreaseDiscount);

// + butonuna tıklama olayını ekle
document.querySelector('#user-increase-discount').addEventListener('click', increaseDiscount);

// Kullanıcı tarafından girilen iskontoyu al ve tabloyu güncelle
function applyFilters() {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const selectedFilters = {};

    // Seçilen checkbox'ları al
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const category = checkbox.closest('div').querySelector('h4').textContent;
            if (!selectedFilters[category]) {
                selectedFilters[category] = [];
            }
            selectedFilters[category].push(checkbox.value);
        }
    });

    // Filtreler seçildiyse tabloyu güncelle, aksi takdirde tabloyu boş bırak
    if (Object.keys(selectedFilters).length > 0) {
        updateTable(selectedFilters);
    } else {
        clearTable();
    }
}

// Tabloyu güncelle
function updateTable(filters) {
    const tableBody = document.querySelector('#product-list tbody');
    tableBody.innerHTML = ''; // Tabloyu temizle

    // Kullanıcı tarafından girilen iskontoyu al
    const userDiscountInput = document.querySelector('#user-discount-input');
    const userDiscount = parseFloat(userDiscountInput.value) || 0;
    const effectiveDiscount = Math.min(userDiscount, 50) / 100; // En fazla %50 iskonto

    for (const brand in data) {
        for (const product in data[brand]) {
            const productData = data[brand][product];

            let matchesFilters = true;

            // Filtreleri kontrol et
            for (const category in filters) {
                if (!filters[category].includes(productData[category.toLowerCase()])) {
                    matchesFilters = false;
                    break;
                }
            }

            // Filtrelere uyan ürünleri tabloya ekle
            if (matchesFilters) {
                const price = parseFloat(productData.price.replace(' TL', '').replace(',', '.')); // Remove " TL" and convert to float
                const jsonDiscount = productData.discount ? parseFloat(productData.discount.replace('%', '')) / 100 : 0; // JSON discount
                const discount = userDiscount ? effectiveDiscount : jsonDiscount; // Use user input discount if available
                
                const discountedPrice = price * (1 - discount); // Calculate discounted price
                
                const row = document.createElement('tr');
                // Renkli arka plan uygulama
                if (discount > jsonDiscount) {
                    row.style.backgroundColor = '#aa3434'; // Kırmızımsı arka plan rengi
                }

                row.innerHTML = `
                    <td>${brand}</td>
                    <td>${product}</td>
                    <td>${productData.price}</td>
                    <td>${productData.discount || 'N/A'}</td> <!-- Existing discount column -->
                    <td>${userDiscount ? `${userDiscount}%` : 'N/A'}</td> <!-- New column for company discount -->
                    <td>${productData.color}</td>
                    <td>${productData.index}</td>
                    <td>${productData.focus}</td>
                    <td>${discountedPrice.toFixed(2)} TL</td> <!-- New column for discounted price -->
                `;
                tableBody.appendChild(row);
            }
        }
    }
}

// Tabloyu temizle
function clearTable() {
    const tableBody = document.querySelector('#product-list tbody');
    tableBody.innerHTML = ''; // Tabloyu boşalt
}

// Checkbox'lara ve iskontoya değişiklik olduğunda filtreleri uygula
document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});

// Sayfa yüklendiğinde filtreleri uygulayıp tabloyu başlat
window.onload = applyFilters;

