const storageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', onInputHandle);
form.addEventListener('submit', onBtnSubmit);

// вивід даних з local storage в форму під час оновлення сторінки
restoreData();


// збереження в local storage даних з інпуту
function onInputHandle() {
    const userMail = form.elements.email.value;
    const userMessage = form.elements.message.value;
    const data = {
        mail: userMail,
        message: userMessage,
    }
    saveToLS(storageKey, data);
}

// функція для виводу даних з local storage в форму 
function restoreData() {
    const data = loadFromLS(storageKey) || {};
    form.elements.email.value = data.mail || '';
    form.elements.message.value = data.message || '';
}

// функція для збереження даних в local storage
function saveToLS(key = 'empty', value = ' ') {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}

// функція для отримання даних з local storage
function loadFromLS (key = 'empty') {
    const data = localStorage.getItem(key);
    try {
        const result = JSON.parse(data);
        return result;
    } catch {
        return data;
    }
}


// Сабміт форми
function onBtnSubmit(e) {
     e.preventDefault();
    // Перевірка, що всі поля заповнені
    const userMail = form.elements.email.value;
    const userMessage = form.elements.message.value;
    if (userMail === '' || userMessage === '') {
        alert ('Будь ласка, заповніть всі поля форми')
        return;
    } else {
        // очищуємо сховище і поля форми; виводим у консоль об'єкт з полями email, message та їхніми поточними значеннями.
        const data = loadFromLS(storageKey) || {};
        console.log(data);
        form.reset();
        localStorage.removeItem(storageKey);

    }
}