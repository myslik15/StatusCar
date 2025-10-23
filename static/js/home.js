document.addEventListener('DOMContentLoaded', function() {
  const carSearchFormDiv_1 = document.querySelector('.car-search-form__div-1');
  const carSearchFormDiv_2 = document.querySelector('.car-search-form__div-2');
  const carSearchFormDiv_3 = document.querySelector('.car-search-form__div-3');
  const carSearchFormDiv_4 = document.querySelector('.car-search-form__div-4');
  const carSearchModal = document.querySelector('.car-search-modal');
  const usedCarsInput = document.querySelector('#used-cars'); // Получаем input

  function initCarSearchModal(func) {
    [carSearchFormDiv_1, carSearchFormDiv_2, carSearchFormDiv_3, carSearchFormDiv_4]
      .forEach((elem) => {
        elem.addEventListener('click', func);
      });
  }

  initCarSearchModal(showCarSearchModal);

  function showCarSearchModal() {
    carSearchModal.style.display = 'block';
    
    requestAnimationFrame(() => {
      carSearchModal.classList.add('active');
      carSearchModal.classList.remove('closing');
    });
    
    document.addEventListener('click', checkCarSearchModal);
  }

  function hideCarSearchModal() {
    carSearchModal.classList.add('closing');
    carSearchModal.classList.remove('active');
    
    carSearchModal.addEventListener('animationend', function handler() {
      carSearchModal.style.display = 'none';
      document.removeEventListener('click', checkCarSearchModal);
      carSearchModal.removeEventListener('animationend', handler);
    }, { once: true });
  }

  function checkCarSearchModal(event) {
    const elements = [
      carSearchFormDiv_1,
      carSearchFormDiv_2,
      carSearchFormDiv_3,
      carSearchFormDiv_4,
      carSearchModal
    ]

    const clickedOutside = elements.every(elem => 
      !elem.contains(event.target)
    );

    if (clickedOutside) {
      hideCarSearchModal();
    }
  }

  function processCarSearchButtons() {
    const buttons = document.querySelectorAll('.car-search__div-1 button');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
   
        usedCarsInput.value = this.textContent;

        
        
        buttons.forEach(btn => btn.classList.remove('car-search-button__active'));
        this.classList.add('car-search-button__active');
      });
    });
  }

  processCarSearchButtons();




    const brandInput = document.getElementById('brand-input');
    const modelInput = document.getElementById('model-input');
    const inputDiv2 = document.querySelector('.car-search-form__div-2 input');
    const inputDiv3 = document.querySelector('.car-search-form__div-3 input');

    brandInput.addEventListener('input', function(e) {
    const cleanValue = this.value.replace(/[^A-Za-zА-Яа-яЁё\s-]/g, '');
    this.value = cleanValue;
    inputDiv2.value = cleanValue; 
    });

    modelInput.addEventListener('input', function(e) {
    const cleanValue = this.value.replace(/[^A-Za-zА-Яа-яЁё0-9\s-]/g, '');
    this.value = cleanValue;
    inputDiv3.value = cleanValue; 
    });


    const priceFromInput = document.querySelector('.car-search-div-price input[placeholder="Цена от, BYN"]');
    const priceToInput = document.querySelector('.car-search-div-price input[placeholder="до"]');
    const priceFromSelect = document.querySelector('.car-search-div-price-select');
    const priceToSelect = document.querySelector('.car-search-div-price-select-two');
    const priceItems = document.querySelectorAll('.car-search-div-price-select .price-select__item, .car-search-div-price-select-two .price-select__item');

    const yearFromInput = document.querySelectorAll('.car-search-div-price input[placeholder="2025"]')[0];
    const yearToInput = document.querySelectorAll('.car-search-div-price input[placeholder="2025"]')[1];
    const yearFromSelect = document.querySelector('.car-search-div-price-year');
    const yearToSelect = document.querySelector('.car-search-div-price-year-two');
    const yearItems = document.querySelectorAll('.car-search-div-price-year .price-select__item, .car-search-div-price-year-two .price-select__item');

    const allDropdowns = [priceFromSelect, priceToSelect, yearFromSelect, yearToSelect];

    function closeAllDropdowns() {
        allDropdowns.forEach(select => {
            select.style.display = 'none';
        });
    }

    function parseNumber(value) {
        return parseInt(value.replace(/\./g, '')) || 0;
    }

    function validateValues(fromInput, toInput) {
        const fromValue = parseNumber(fromInput.value);
        const toValue = parseNumber(toInput.value);
        
        if (fromValue > toValue && toValue > 0) {
            [fromInput.value, toInput.value] = [toInput.value, fromInput.value];
        }
    }

    function toggleDropdown(showDropdown) {
        closeAllDropdowns();
        if (showDropdown.style.display !== 'block') {
            showDropdown.style.display = 'block';
        }
    }

    priceFromInput.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(priceFromSelect);
    });

    priceToInput.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(priceToSelect);
    });

    yearFromInput.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(yearFromSelect);
    });

    yearToInput.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(yearToSelect);
    });

    priceItems.forEach(item => {
        item.addEventListener('click', function() {
            const parent = this.closest('.car-search-div-price-select, .car-search-div-price-select-two');
            if (parent === priceFromSelect) {
                priceFromInput.value = this.textContent;
            } else {
                priceToInput.value = this.textContent;
            }
            validateValues(priceFromInput, priceToInput);
            closeAllDropdowns();
        });
    });

    yearItems.forEach(item => {
        item.addEventListener('click', function() {
            const parent = this.closest('.car-search-div-price-year, .car-search-div-price-year-two');
            if (parent === yearFromSelect) {
                yearFromInput.value = this.textContent;
            } else {
                yearToInput.value = this.textContent;
            }
            validateValues(yearFromInput, yearToInput);
            closeAllDropdowns();
        });
    });

    document.addEventListener('click', function(e) {
        const isClickInside = allDropdowns.some(dropdown => dropdown.contains(e.target)) || 
                            [priceFromInput, priceToInput, yearFromInput, yearToInput].some(input => input === e.target);
        
        if (!isClickInside) {
            closeAllDropdowns();
        }
    });

    allDropdowns.forEach(select => {
        select.addEventListener('click', e => e.stopPropagation());
    });

    priceFromInput.addEventListener('change', () => validateValues(priceFromInput, priceToInput));
    priceToInput.addEventListener('change', () => validateValues(priceFromInput, priceToInput));
    yearFromInput.addEventListener('change', () => validateValues(yearFromInput, yearToInput));
    yearToInput.addEventListener('change', () => validateValues(yearFromInput, yearToInput));


    
});