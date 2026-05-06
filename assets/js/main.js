// --- كود السلايدر ---
const sliderImg = document.getElementById("slider");
const images = ["assets/img/event1.jpg", "assets/img/event2.jpg", "assets/img/event3.jpg"];
let index = 0;

function nextSlide() {
    if (sliderImg) {
        index = (index + 1) % images.length;
        sliderImg.src = images[index];
    }
}

function prevSlide() {
    if (sliderImg) {
        index = (index - 1 + images.length) % images.length;
        sliderImg.src = images[index];
    }
}

if (sliderImg) {
    setInterval(nextSlide, 3000);
}

// --- كود التحقق من نموذج الاتصال ---
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();
        let alertBox = document.getElementById("alertBox");

        if (name === "" || email === "" || message === "") {
            alertBox.innerHTML = `<div class="alert alert-danger">جميع الحقول مطلوبة</div>`;
            return;
        }

        if (!email.includes("@")) {
            alertBox.innerHTML = `<div class="alert alert-warning">البريد غير صحيح</div>`;
            return;
        }

        alertBox.innerHTML = `<div class="alert alert-success">تم إرسال الرسالة بنجاح</div>`;
        this.reset();
    });
}
// --- 1. الوضع الليلي (Dark Mode) مع LocalStorage ---
const darkModeBtn = document.getElementById('darkModeToggle');
const body = document.body;

// التحقق مما إذا كان المستخدم قد اختار الوضع الليلي سابقاً
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    if (darkModeBtn) darkModeBtn.textContent = '☀️ الوضع النهاري';
}

if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // حفظ الخيار في LocalStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeBtn.textContent = '☀️ الوضع النهاري';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeBtn.textContent = '🌙 الوضع الليلي';
        }
    });
}

// --- 2. حفظ تفضيلات التصنيف (LocalStorage) ---
const categorySelect = document.getElementById('categoryFilter');
if (categorySelect) {
    // استرجاع التفضيل المحفوظ عند فتح الصفحة
    const savedCategory = localStorage.getItem('preferredCategory');
    if (savedCategory) {
        categorySelect.value = savedCategory;
    }

    // حفظ التفضيل الجديد عند تغييره
    categorySelect.addEventListener('change', function() {
        localStorage.setItem('preferredCategory', this.value);
    });
}
// تشغيل ميزة البحث في صفحة الفعاليات

document.addEventListener("DOMContentLoaded", function () {
   
    const searchInput = document.querySelector('input[type="text"]');
    const selects = document.querySelectorAll('select');
    const categoryFilter = selects[0]; 
    const locationFilter = selects[1]; 
    const dateFilter = document.querySelector('input[type="date"]');
    const eventCards = document.querySelectorAll('.card');

    // دالة الفلترة الرئيسية
    function filterEvents() {
        // جلب القيم الحالية من الحقول
        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const categoryText = categoryFilter ? categoryFilter.value : "";
        const locationText = locationFilter ? locationFilter.value : "";
        const dateText = dateFilter ? dateFilter.value : "";

        
        const isAllCategory = categoryText.includes("الكل") || categoryText.includes("All");
        const isAllLocation = locationText.includes("الكل") || locationText.includes("All");

        eventCards.forEach(card => {
           
            const titleElement = card.querySelector('.card-title');
            const badgeElement = card.querySelector('.badge');
            const textMutedElement = card.querySelector('.text-muted'); // يحوي التاريخ والموقع

            const title = titleElement ? titleElement.textContent.toLowerCase() : "";
            const category = badgeElement ? badgeElement.textContent.trim() : "";
            const dateLocationText = textMutedElement ? textMutedElement.textContent : "";

            // شروط المطابقة
            const matchSearch = title.includes(searchText);
            const matchCategory = isAllCategory || category === categoryText;
            const matchLocation = isAllLocation || dateLocationText.includes(locationText);
            
            
            const matchDate = !dateText || dateLocationText.includes(dateText);

            if (matchSearch && matchCategory && matchLocation && matchDate) {
                card.parentElement.style.display = 'block';
            } else {
                card.parentElement.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterEvents);
    if (categoryFilter) categoryFilter.addEventListener('change', filterEvents);
    if (locationFilter) locationFilter.addEventListener('change', filterEvents);
    if (dateFilter) dateFilter.addEventListener('change', filterEvents);
});