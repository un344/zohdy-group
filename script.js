// تخزين البيانات لكل قسم
const dataStore = {
  workers: null,
  clients: null,
  inventors: null
};

// مسارات ملفات Excel لكل قسم
const excelFiles = {
  workers: 'workers.xlsx',
  clients: 'clients.xlsx',
  inventors: 'inventors.xlsx'
};

// تبويب التبديل
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    
    // فتح ملف Excel المناسب
    window.open(excelFiles[tabId], '_blank');
    
    // تحديث التبويبات
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// إظهار إشعار
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
    ${message}
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // إضافة نص توضيحي لكل قسم
  document.querySelectorAll('.tab-content').forEach(tab => {
    const section = tab.id;
    const uploadArea = tab.querySelector('.upload-area');
    uploadArea.querySelector('p').textContent = `اضغط على التبويب لفتح ملف ${excelFiles[section]}`;
  });
  
  // إخفاء أزرار رفع الملفات لأننا سنستخدم الملفات مباشرة
  document.querySelectorAll('.excel-input').forEach(input => {
    input.style.display = 'none';
  });

  const iconBoxes = document.querySelectorAll('.icon-box');
  
  iconBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
      // إضافة تأثير النقر
      box.style.transform = 'scale(0.95)';
      setTimeout(() => {
        box.style.transform = '';
      }, 200);
    });
  });
});

function openExcel(fileName) {
  // منع السلوك الافتراضي للرابط
  event.preventDefault();
  
  // فتح ملف Excel مباشرة في البرنامج
  const link = document.createElement('a');
  link.href = fileName;
  link.setAttribute('download', '');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function openExcelMs(localPath) {
  event.preventDefault();
  // بروتوكول مايكروسوفت Excel
  const msLink = `ms-excel:ofe|u|file:///${localPath.replace(/\\/g, '/')}`;
  // محاولة فتح الملف عبر البروتوكول
  window.location.href = msLink;
  // fallback: بعد ثانيتين، لو لم يفتح، حمل الملف عادي
  setTimeout(() => {
    const link = document.createElement('a');
    link.href = localPath;
    link.setAttribute('download', '');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 2000);
}

// إضافة تأثيرات حركية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const iconBoxes = document.querySelectorAll('.icon-box');
  
  iconBoxes.forEach(box => {
    box.addEventListener('mousedown', (e) => {
      box.style.transform = 'scale(0.95)';
    });
    box.addEventListener('mouseup', (e) => {
      box.style.transform = '';
    });
    box.addEventListener('mouseleave', (e) => {
      box.style.transform = '';
    });
  });
}); 