document.addEventListener('DOMContentLoaded', function() {
    
    function createCheckedSellerModal() {
        const modal = document.createElement('div');
        modal.className = 'checked-seller__modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <h4><img src="icons/icons8-щит-безопасности-64.png" width="20" height="20">Проверенный продавец</h4>
            <p>Отмечаем этим статусом тех, кто:</p>
            <ul>
                <li>Прошел проверку нашей службой модерации</li>
                <li>Продает автомобили на платформе более 3-ех месяцев</li>
                <li>Публикует только актуальные объявления</li>
            </ul>
            <p>Узнайте больше о критериях проверки по <a href="#" class="checked-seller__modal-link">ссылке</a></p>
        `;
        return modal;
    }

    function initCheckedSeller() {
        const checkedSellers = document.querySelectorAll('.checked-seller__div');

        checkedSellers.forEach(checkedSeller => {
            const checkedSellerModal = createCheckedSellerModal();
            checkedSeller.insertAdjacentElement('afterend', checkedSellerModal);

            let closeTimeout = null; 
            let isModalHovered = false;

            checkedSeller.addEventListener('mouseenter', function() {
                if (closeTimeout) {
                    clearTimeout(closeTimeout);
                    closeTimeout = null;
                }
                
                checkedSellerModal.style.display = 'block';
                checkedSellerModal.classList.add('checked-seller__modal-show');
                checkedSellerModal.classList.remove('checked-seller__modal-hide');
            });

            checkedSeller.addEventListener('mouseleave', function(event) {
                const relatedTarget = event.relatedTarget;
                const wentToModal = relatedTarget && checkedSellerModal.contains(relatedTarget);
                
                if (!wentToModal) {
                    startCloseTimer(checkedSellerModal);
                }
            });

            checkedSellerModal.addEventListener('mouseenter', function() {
                isModalHovered = true;
                if (closeTimeout) {
                    clearTimeout(closeTimeout);
                    closeTimeout = null;
                }
            });

            checkedSellerModal.addEventListener('mouseleave', function(event) {
                isModalHovered = false;
                const relatedTarget = event.relatedTarget;
                const wentToSeller = relatedTarget && checkedSeller.contains(relatedTarget);
                
                if (!wentToSeller) {
                    startCloseTimer(checkedSellerModal);
                }
            });

            function startCloseTimer(modal) {
                if (isModalHovered) return;
                
                closeTimeout = setTimeout(() => {
                    if (!isModalHovered) {
                        modal.classList.remove('checked-seller__modal-show');
                        modal.classList.add('checked-seller__modal-hide');
                        
                        setTimeout(() => {
                            modal.style.display = 'none';
                        }, 300);
                    }
                }, 200);
            }
        });
    }

    initCheckedSeller();

    function createStatusProModal() {
        const statusProModal = document.createElement('div');
        statusProModal.className = 'status-pro__modal';
        statusProModal.style.display = 'none';
        statusProModal.innerHTML = 
        `<h4>Что такое статус <span>pro</span> ?</h4>
        <ul>
            <li>Ваши объявления показываются в топе</li>
            <li>А дальше хуй его знает. Пока не придумал...</li>
            <li>Получить статус <span>pro</span> по <a href="">ссылке</a></li>
        </ul>`;

        return statusProModal;
    }
    
    function initStatusPro() {
        const statusPros = document.querySelectorAll('.status-pro');
        
        statusPros.forEach((statusPro) => {
            const statusProModal = createStatusProModal();
            statusPro.insertAdjacentElement('afterend', statusProModal);

            let proCloseTimeout = null;
            let isProModalHovered = false;

            statusPro.addEventListener('mouseenter', function() {
                if (proCloseTimeout) {
                    clearTimeout(proCloseTimeout);
                    proCloseTimeout = null;
                }
                
                statusProModal.style.display = 'block';
                statusProModal.classList.add('status-pro__modal-show');
                statusProModal.classList.remove('status-pro__modal-hide');
            });

            statusPro.addEventListener('mouseleave', function(event) {
                const relatedTarget = event.relatedTarget;
                const wentToModal = relatedTarget && statusProModal.contains(relatedTarget);
                
                if (!wentToModal) {
                    startProCloseTimer(statusProModal);
                }
            });

            statusProModal.addEventListener('mouseenter', function() {
                isProModalHovered = true;
                if (proCloseTimeout) {
                    clearTimeout(proCloseTimeout);
                    proCloseTimeout = null;
                }
            });

            statusProModal.addEventListener('mouseleave', function(event) {
                isProModalHovered = false;
                const relatedTarget = event.relatedTarget;
                const wentToPro = relatedTarget && statusPro.contains(relatedTarget);
                
                if (!wentToPro) {
                    startProCloseTimer(statusProModal);
                }
            });

            function startProCloseTimer(modal) {
                if (isProModalHovered) return;
                
                proCloseTimeout = setTimeout(() => {
                    if (!isProModalHovered) {
                        modal.classList.remove('status-pro__modal-show');
                        modal.classList.add('status-pro__modal-hide');
                        
                        setTimeout(() => {
                            modal.style.display = 'none';
                        }, 300);
                    }
                }, 200);
            }
        });
    }

    initStatusPro();


    function createBriefPriceModal() {
        const briefPriceModal = document.createElement('div');
        briefPriceModal.className = 'main-ad-bried-price__modal';
        briefPriceModal.style.display = 'none';
        briefPriceModal.innerHTML = `
        <h3>Цена в объявлении</h3>
        <div class="brief-price-modal__price">
            <h4>132 000 BYN</h4>
            <p class="main-ad-brief_low-price">Низкая цена</p>
        </div>
        <div class="brief-price-modal__lines">
            <div class="modal-lines__cheap"></div>
            <div class="modal-lines__optimal"></div>
            <div class="modal-lines__expensive"></div>
            <div class="modal-lines__tag">
                <img src="icons/icons8-сортировать-по-убыванию-50.png" width="20" height="20">
            </div>
        </div>
        <div class="brief-price-modal__costs">
            <div class="modal-cost">Ниже оценки</div>
            <div class="modal-cost">от 150 060 BYN</div>
            <div class="modal-cost">до 214 323 BYN</div>
            <div class="modal-cost">Выше оценки</div>
        </div>
        <p>Похожие автомобили покупают в этом диапазоне цен после всех скидок и торгов</p>
        <a href="">Узнать подробнее о ценообразовании</a>
        `;

        return briefPriceModal;
    }

    function costCalculationForPriceModal(modalElement) {
     
        const modalCosts = modalElement.querySelectorAll('.modal-cost');
        const priceElement = modalElement.querySelector('.brief-price-modal__price h4');
   
        let firstPrice = parseInt(modalCosts[1].textContent.split(/\s+/).slice(1,3).join(''));
        let secondPrice = parseInt(modalCosts[2].textContent.split(/\s+/).slice(1,3).join(''));
        let realPrice = parseInt(priceElement.textContent.split(/\s+/).slice(0,2).join(''));
        
        let result = 0;

        if (realPrice > secondPrice) {
            result = 550;
        } else if (realPrice < firstPrice) {
            result = 150;
        } else {

            result = Math.round((secondPrice - firstPrice) / 230);
        }
        
        return result;
    }


    function initBriefPriceModal() {
        const briefPrices = document.querySelectorAll('.main-ad-brief__price');
        
        briefPrices.forEach((briefPrice) => {
            const briefModal = createBriefPriceModal();
         
            briefPrice.insertAdjacentElement('afterend', briefModal);
            
            result = costCalculationForPriceModal(briefModal);
            elem = briefModal.querySelector('.modal-lines__tag');
            elem.style.left = result + 'px';

           
            let closeTimeout = null; 
            let isModalHovered = false;

            briefPrice.addEventListener('mouseenter', function() {
                if (closeTimeout) {
                    clearTimeout(closeTimeout);
                    closeTimeout = null;
                }
                
                briefModal.style.display = 'block';
                briefModal.classList.add('main-ad-bried-price__modal-show');
                briefModal.classList.remove('main-ad-bried-price__modal-hide');
            });

            briefPrice.addEventListener('mouseleave', function(event) {
                const relatedTarget = event.relatedTarget;
                const wentToModal = relatedTarget && briefModal.contains(relatedTarget);
                
                if (!wentToModal) {
                    startCloseTimer(briefModal);
                }
            });

            briefModal.addEventListener('mouseenter', function() {
                isModalHovered = true;
                if (closeTimeout) {
                    clearTimeout(closeTimeout);
                    closeTimeout = null;
                }
            });

            briefModal.addEventListener('mouseleave', function(event) {
                isModalHovered = false;
                const relatedTarget = event.relatedTarget;
                const wentToBrief = relatedTarget && briefPrice.contains(relatedTarget);
                
                if (!wentToBrief) {
                    startCloseTimer(briefModal);
                }
            });

            function startCloseTimer(modal) {
                if (isModalHovered) return;
                
                closeTimeout = setTimeout(() => {
                    if (!isModalHovered) {
                        modal.classList.remove('main-ad-bried-price__modal-show');
                        modal.classList.add('main-ad-bried-price__modal-hide');
                        
                        setTimeout(() => {
                            modal.style.display = 'none';
                        }, 300);
                    }
                }, 200);
            }
        });
    }


    initBriefPriceModal()



    function initModalShowPhone() {
        const modalShowPhone = document.createElement('div');
        modalShowPhone.className = 'modal-overlay';
        modalShowPhone.innerHTML = `
        <div class="modal-wrapper">
            <button class="modal-close-btn">
                <img src="icons/icons8-close-button-32 (1).png" width="30" height="30" alt="Закрыть">
            </button>
            <div class="modal-container">
                <div class="show-phone__modal">
                    <div class="show-phone-modal__title">
                        <h6>Audi-центр Минск</h6>
                        <div class="show-phone-modal__save-search">
                            <img src="icons/icons8-поиск-любви-24-blue.png" width="30" height="30">
                            <button type="button">Подписаться</button>
                            <div class="save-search__modal-mail">
                                <div class="modal-mail__title">
                                    <a href="#">Audi-центр Минск, все марки автомобили</a>
                                    <img src="icons/SEDAN.png">
                                </div>
                                <input placeholder="Электронная почта">
                                <button class="show-phone-modal__recive-on-email">Получать на почту</button>
                                <div class="modal-mail__delete">
                                    <img src="icons/icons8-очистить-корзину-50.png" width="20" height="20">
                                    <button>Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>Автосалон</p>
                    <div class="show-phone-modal__phone-qr">
                        <div class="show-phone-modal__phones">
                            <div class="show-phone-modal__phone">
                                <h5>+375 33 666 66 65</h5>
                                <p>Леха с 6:00 до 18:00</p>
                            </div>
                            <div class="divider"></div>
                            
                            <div class="show-phone-modal__phone">
                                <h5>+375 33 666 66 67</h5>
                                <p>Наташа помощник Алексея фирмы ZOLL, с 18:00 до 23:00</p>
                            </div>
                            <div class="divider"></div>
                        </div>
                        
                        <div class="show-phone-modal__qr">
                            <img src="img/icons8-qr-код-64.png" alt="QR-код для сохранения" width="80" height="80">
                            <p>Наведите на QR-код камеру телефона, чтобы позвонить</p>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="show-phone__modal-adress-div">
                        <button class="show-phone__modal-adress">Ул. Куйбышева, д. 20 , закрытая стоянка BSM</button>
                    </div> 
                </div>
                <div class="show-phone-modal-bottom">
                    <div class="phone-modal-bottom__title">
                        <div class="modal-bottom-title__img">
                            <img src="img/rska_1.png">
                        </div>
                        <div class="modal-bottom-title__description">
                            <div class="modal-bottom-title__marka">
                                <p>Audi RS 6 performance III (C7) Рестайлинг</p>
                            </div>
                            <div class="modal-bottom-title__additional">
                                <p>4.0л/605л.с/Бензин<br>Бизнес-седан 5дв.<br>Черный</p>
                                <p>Автомат<br>Полный</p>
                            </div>
                        </div>
                        <div class="modal-bottom-title__icons">
                            <button class="modal-bottom-title__cancel-btn"><img src="icons/icons8-отменить-2-50.png" width="30" height="30"></button>
                            <button class="modal-bottom-title__add-to-favorites"><img src="icons/icons8-сердце-32.png" width="30" height="30"></button>
                            <div class="modal-cancel-btn-explanation modal-cancel-btn-explanation-show">
                                <p>Сообщить о проблеме с объявлением</p>
                            </div>
                            <div class="modal-add-to-favorites-explanation modal-add-to-favorites-explanation-show">
                                <p>Добавить в избранное</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-bottom-title__memorandum">
                        <input placeholder="Заметка об этом автомобиле (её увидите только Вы)">
                        <button><img src="icons/icons8-close-button-32.png" width="20" height="20"></button>
                    </div>
                </div>
            </div>
        </div>
        `;
        return modalShowPhone;
    }

    function initYandexShowPhone() {
        const yandexShowPhoneTaxi = document.createElement('button');
        yandexShowPhoneTaxi.className = 'show-price__yandex-taxi';
        yandexShowPhoneTaxi.innerHTML = '<img src="icons/yandex-svg-icon.png" width="20" height="20">Доехать с Яндекс.Такси';

        const yandexShowPhone = document.createElement('div');
        yandexShowPhone.className = 'show-phone-modal__modal-yandex';
        yandexShowPhone.innerHTML = `
            <button class="modal-yandex__show-number">Показать телефон</button>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A8823a4fd664187f184472cb65943eac4cd6a6ddbe7e425e849e134a5ce68cece&amp;source=constructor" width="650" height="250" frameborder="0"></iframe>
        `;
        
        return [yandexShowPhone, yandexShowPhoneTaxi];
    }

    function logicModalShowPhone() {
        const showPhones = document.querySelectorAll('.show-phone');

        showPhones.forEach((elem) => {
            elem.addEventListener('click', function(event) {
                const mainAd = this.closest('.main-ad');
                const modalShowPhone = initModalShowPhone();
                document.body.appendChild(modalShowPhone);

                function setupModalHandlers() {
                    const showPhoneModalAddressDiv = modalShowPhone.querySelector('.show-phone__modal-adress-div');
                    const showPhoneQr = modalShowPhone.querySelector('.show-phone-modal__phone-qr');
                    
                    const originalPhoneQr = showPhoneQr.cloneNode(true);
                    
                    // ИЩЕМ ВНУТРИ МОДАЛЬНОГО ОКНА
                    const saveSearchBtn = modalShowPhone.querySelector('.show-phone-modal__save-search button');
                    const saveSearchModal = modalShowPhone.querySelector('.save-search__modal-mail');

                    // Сначала скрываем модалку почты
                    saveSearchModal.style.display = 'none';

                    // Функция для настройки обработчиков почты
                    function setupMailHandlers() {
                        // Клонируем кнопку чтобы сбросить старые обработчики
                        const newSaveSearchBtn = saveSearchBtn.cloneNode(true);
                        saveSearchBtn.parentNode.replaceChild(newSaveSearchBtn, saveSearchBtn);

                        newSaveSearchBtn.addEventListener('click', function(event) {
                            event.stopPropagation();
                            
                            if (saveSearchModal.style.display === 'flex') {
                                saveSearchModal.style.display = 'none';
                                document.removeEventListener('click', hideOnClickOutside);
                            } else {
                                saveSearchModal.style.display = 'flex';
                                document.addEventListener('click', hideOnClickOutside);
                            }
                        });

                        function hideOnClickOutside(event) {
                            if (!saveSearchModal.contains(event.target) && event.target !== newSaveSearchBtn) {
                                saveSearchModal.style.display = 'none';
                                document.removeEventListener('click', hideOnClickOutside);
                            }
                        }
                    }

                    // Инициализируем обработчики почты
                    setupMailHandlers();

                    const addressBtn = modalShowPhone.querySelector('.show-phone__modal-adress');
                    addressBtn.classList.remove('disabled');
                    addressBtn.style.pointerEvents = 'auto';
                    addressBtn.style.opacity = '1';
                    
                    const oldTaxiButtons = showPhoneModalAddressDiv.querySelectorAll('.show-price__yandex-taxi');
                    oldTaxiButtons.forEach(btn => btn.remove());
                    
                    // Находим кнопки и подсказки внутри модального окна
                    const cancelBtn = modalShowPhone.querySelector('.modal-bottom-title__cancel-btn');
                    const addToFavorites = modalShowPhone.querySelector('.modal-bottom-title__add-to-favorites');
                    const cancelExplanation = modalShowPhone.querySelector('.modal-cancel-btn-explanation');
                    const favoritesExplanation = modalShowPhone.querySelector('.modal-add-to-favorites-explanation');
                    
                    function setupTooltips() {
                        let cancelTimer;
                        let favoritesTimer;

                        cancelBtn.addEventListener('mouseover', function() {
                            clearTimeout(favoritesTimer);
                            favoritesExplanation.style.display = 'none';
                            
                            cancelTimer = setTimeout(() => {
                                cancelExplanation.style.display = 'block';
                            }, 500); 
                        });

                        cancelBtn.addEventListener('mouseout', function() {
                            clearTimeout(cancelTimer);
                            cancelExplanation.style.display = 'none'; 
                        });

                        addToFavorites.addEventListener('mouseover', function() {
                            clearTimeout(cancelTimer);
                            cancelExplanation.style.display = 'none';
                            
                            favoritesTimer = setTimeout(() => {
                                favoritesExplanation.style.display = 'block';
                            }, 500); 
                        });

                        addToFavorites.addEventListener('mouseout', function() {
                            clearTimeout(favoritesTimer);
                            favoritesExplanation.style.display = 'none'; 
                        });
                    }

                    setupTooltips();
                                        
                    addressBtn.addEventListener('click', function onAddressClick() {
                        // Сохраняем текущие элементы перед заменой
                        const currentShowPhoneQr = modalShowPhone.querySelector('.show-phone-modal__phone-qr');
                        const currentAddressBtn = modalShowPhone.querySelector('.show-phone__modal-adress');
                        
                        currentAddressBtn.classList.add('disabled');
                        currentAddressBtn.style.pointerEvents = 'none';
                        currentAddressBtn.style.opacity = '0.5';
                        
                        const [yandexShowPhone, yandexShowPhoneTaxi] = initYandexShowPhone();
                        
                        // Заменяем текущий элемент
                        currentShowPhoneQr.replaceWith(yandexShowPhone);
                        
                        const existingTaxiButtons = showPhoneModalAddressDiv.querySelectorAll('.show-price__yandex-taxi');
                        existingTaxiButtons.forEach(btn => btn.remove());
                        
                        showPhoneModalAddressDiv.appendChild(yandexShowPhoneTaxi);
                        
                        const showNumberBtn = yandexShowPhone.querySelector('.modal-yandex__show-number');
                        
                        showNumberBtn.replaceWith(showNumberBtn.cloneNode(true));
                        const freshShowNumberBtn = yandexShowPhone.querySelector('.modal-yandex__show-number');
                        
                        freshShowNumberBtn.addEventListener('click', function() {
                            // Восстанавливаем оригинальный блок
                            yandexShowPhone.replaceWith(originalPhoneQr.cloneNode(true));
                            
                            if (yandexShowPhoneTaxi.parentNode) {
                                yandexShowPhoneTaxi.parentNode.removeChild(yandexShowPhoneTaxi);
                            }
                            
                            // НАХОДИМ ЭЛЕМЕНТЫ ЗАНОВО после замены DOM
                            const newAddressBtn = modalShowPhone.querySelector('.show-phone__modal-adress');
                            newAddressBtn.classList.remove('disabled');
                            newAddressBtn.style.pointerEvents = 'auto';
                            newAddressBtn.style.opacity = '1';
                            
                            // ПЕРЕВЕШИВАЕМ ОБРАБОТЧИКИ ЗАНОВО!
                            setupModalHandlers();
                        });

                        // Обработчик для кнопки такси
                        yandexShowPhoneTaxi.addEventListener('click', function() {
                            // Восстанавливаем оригинальный блок
                            yandexShowPhone.replaceWith(originalPhoneQr.cloneNode(true));
                            
                            if (yandexShowPhoneTaxi.parentNode) {
                                yandexShowPhoneTaxi.parentNode.removeChild(yandexShowPhoneTaxi);
                            }
                            
                            // НАХОДИМ ЭЛЕМЕНТЫ ЗАНОВО после замены DOM
                            const newAddressBtn = modalShowPhone.querySelector('.show-phone__modal-adress');
                            newAddressBtn.classList.remove('disabled');
                            newAddressBtn.style.pointerEvents = 'auto';
                            newAddressBtn.style.opacity = '1';
                            
                            // ПЕРЕВЕШИВАЕМ ОБРАБОТЧИКИ ЗАНОВО!
                            setupModalHandlers();
                        });
                    });
                }
                
                setupModalHandlers();

                function closeModalShowPhone() {
                    if (document.body.contains(modalShowPhone)) {
                        document.body.removeChild(modalShowPhone);
                    }
                }

                const modalCloseBtn = modalShowPhone.querySelector('.modal-close-btn');
                modalCloseBtn.addEventListener('click', closeModalShowPhone);
                
                modalShowPhone.addEventListener('click', function(event) {
                    if (event.target === modalShowPhone) {
                        closeModalShowPhone();
                    }
                });
                
                document.addEventListener('keydown', function handleEsc(event) {
                    if (event.key === 'Escape') {
                        closeModalShowPhone();
                        document.removeEventListener('keydown', handleEsc);
                    }
                });
            });
        });
    }

    logicModalShowPhone()
    
});