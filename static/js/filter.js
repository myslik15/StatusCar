// static/js/filter.js
document.addEventListener('DOMContentLoaded', function() {
    // Обработка кнопок состояния
    const conditionButtons = document.querySelectorAll('.form-div__condition button');
    const conditionInput = document.getElementById('condition-input');
    
    conditionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            conditionButtons.forEach(btn => btn.classList.remove('form-div-condition__all-active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('form-div-condition__all-active');
            // Устанавливаем значение в скрытое поле
            conditionInput.value = this.dataset.condition;
        });
    });
    
    // Авто-сабмит формы при изменении некоторых полей
    const autoSubmitFields = document.querySelectorAll('select');
    autoSubmitFields.forEach(field => {
        field.addEventListener('change', function() {
            document.getElementById('filter-form').submit();
        });
    });
    
    // Обработка кнопки добавления марки
    const addBrandBtn = document.querySelector('.add-brand');
    if (addBrandBtn) {
        addBrandBtn.addEventListener('click', function() {
            // Здесь можно добавить логику для множественного выбора марок
            alert('Функция множественного выбора марок в разработке');
        });
    }
});

function clearFilters() {
    // Очищаем все поля формы
    const form = document.getElementById('filter-form');
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (input.type !== 'submit' && input.type !== 'button') {
            input.value = '';
        }
    });
    
    // Сбрасываем кнопки состояния
    const conditionButtons = document.querySelectorAll('.form-div__condition button');
    conditionButtons.forEach(btn => btn.classList.remove('form-div-condition__all-active'));
    document.querySelector('.form-div-condition__all').classList.add('form-div-condition__all-active');
    document.getElementById('condition-input').value = 'all';
    
    // Сабмитим форму
    form.submit();
}

// Функция для применения фильтров без перезагрузки страницы (AJAX)
function applyFilters() {
    const form = document.getElementById('filter-form');
    const formData = new FormData(form);
    
    fetch(window.location.href, {
        method: 'GET',
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(html => {
        // Обновляем только часть страницы с объявлениями
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newAds = doc.querySelector('.main-ads');
        if (newAds) {
            document.querySelector('.main-ads').innerHTML = newAds.innerHTML;
        }
        
        // Обновляем счетчик
        const newCount = doc.querySelector('.save-search__left p');
        if (newCount) {
            document.querySelector('.save-search__left p').textContent = newCount.textContent;
        }
    })
    .catch(error => console.error('Error:', error));
}

function setBrand(brand) {
    document.querySelector('input[name="brand"]').value = brand;
    document.getElementById('filter-form').submit();
}