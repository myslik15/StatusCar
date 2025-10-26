document.addEventListener('DOMContentLoaded', function() {
    const mainFifthPriceInput__modal = document.querySelector('.main-fifth-price-input__modal');
    mainFifthPriceInput__modal.style.display = 'none';
    let selectedCarBrand = '';
    let informationAboutUserCar = {};
    const mainFifth__selectionByStatus = document.querySelector('.main-fifth__selection-by-status');
    mainFifth__selectionByStatus.style.display = 'none';

    

    function sendFormDataToServer(formData) {
        console.log('Отправляем данные на сервер:');
        
        // Добавляем данные анкеты в FormData
        if (informationAboutUserCar.status_characteristics) {
            formData.append('status_characteristics', JSON.stringify(informationAboutUserCar.status_characteristics));
        }
        
        // Добавляем данные о повреждениях
        if (informationAboutUserCar.damages) {
            formData.append('damages', JSON.stringify(informationAboutUserCar.damages));
        }

        // Логируем все данные
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: ${value.name} (${value.size} bytes)`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }
        
        // Здесь будет реальная отправка на джанго эндпоинт
        // fetch('/your-api-endpoint', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     // Редирект после успешной отправки
        //     window.location.href = 'success.html';
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('Произошла ошибка при отправке формы');
        // });

        // Временная заглушка для демонстрации
        console.log('Форма успешно отправлена!');
        
        // Редирект на другую страницу (замените на нужный URL)
        setTimeout(() => {
            window.location.href = 'main.html'; // или другой  HTML ф
        }, 300);
    }
    const mainElement = document.querySelector('.main');
    const mainSecondElement = document.querySelector('.main-second');
    const secondInputsBrand = document.querySelector('.second-inputs__brand');
    const mainFifth__mileage = document.querySelector('.main-fifth__mileage');
    const photoAfter = document.querySelector('.main-fifth__photo');
    const carParts__modal = document.querySelector('.car-parts__modal');
    const mainFifth__contacts = document.querySelector('.main-fifth__contacts');
    document.querySelector('.number-clock-right__from input').value = `с 9:00`;
    document.querySelector('.number-clock-right__to input').value = `до 21:00`;
    mainFifth__contacts.style.display = 'none';
    const mainFifth__placeOfInspection = document.querySelector('.main-fifth__place-of-inspection');
    mainFifth__placeOfInspection.style.display = 'none';
    const mainFifth__price = document.querySelector('.main-fifth__price');
    mainFifth__price.style.display = 'none';
    const mainFifth__promotion = document.querySelector('.main-fifth__promotion');
    mainFifth__promotion.style.display = 'none';

    const mainFifthCar__img = document.querySelector('.main-fifth-car__img');
    const wrapper = document.querySelector('.car-inspection-wrapper');
    const carPartsModal__text = document.querySelector('.car-parts-modal__text h2');

    // Функция для обновления визуального состояния деталей автомобиля
    function updateCarPartsVisual() {
        const carParts = document.querySelectorAll('.fifth-car-img__block');
        
        carParts.forEach(part => {
            const partName = part.dataset.part.replaceAll('-', ' ');
            
            // Очищаем предыдущие стили
            part.classList.remove('has-damage');
            part.querySelector('p').textContent = '+';
            
            // Если для этой детали есть данные о повреждениях - меняем стиль
            if (informationAboutUserCar.damages && informationAboutUserCar.damages[partName]) {
                part.classList.add('has-damage');
                part.querySelector('p').textContent = '✓';
            }
        });
    }

    // Функция для очистки формы модального окна повреждений
    function clearDamageModal() {
        const checkboxes = carParts__modal.querySelectorAll('input[type="checkbox"]');
        const commentInput = carParts__modal.querySelector('.car-parts-modal__comment input');
        
        // Снимаем все чекбоксы
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Очищаем комментарий
        commentInput.value = '';
    }

    // Функция для заполнения формы данными (если они уже есть для этой детали)
    function fillDamageModal(partName) {
        if (informationAboutUserCar.damages && informationAboutUserCar.damages[partName]) {
            const damageData = informationAboutUserCar.damages[partName];
            const checkboxes = carParts__modal.querySelectorAll('input[type="checkbox"]');
            const commentInput = carParts__modal.querySelector('.car-parts-modal__comment input');
            
            // Заполняем чекбоксы
            checkboxes[0].checked = damageData.painted || false;
            checkboxes[1].checked = damageData.scratch || false;
            checkboxes[2].checked = damageData.dent || false;
            checkboxes[3].checked = damageData.corrosion || false;
            
            // Заполняем комментарий
            commentInput.value = damageData.comment || '';
        } else {
            clearDamageModal();
        }
    }

    wrapper.addEventListener('click', function(event) {
        const elem = event.target.closest('.fifth-car-img__block');
        const isModalClick = event.target.closest('.car-parts__modal');

        if (elem) {
            const text = elem.dataset.part.replaceAll('-', ' ');
            carPartsModal__text.textContent = text;

            const position = elem.getBoundingClientRect();

            carParts__modal.classList.remove('car-parts__modal-active');
            carParts__modal.style.display = 'flex';
            carParts__modal.style.top = `${position.top + window.scrollY}px`;
            carParts__modal.style.left = `${position.left + window.scrollX + 25}px`;

            // Заполняем форму существующими данными (или очищаем если их нет)
            fillDamageModal(text);

            setTimeout(() => {
                carParts__modal.classList.add('car-parts__modal-active');
            }, 10);
        } else if (!isModalClick) {
            carParts__modal.classList.remove('car-parts__modal-active');
            carParts__modal.style.display = 'none';
        }
    });

    // Обработка сохранения данных о повреждениях
    document.addEventListener('click', function(event) {
        // Обработка кнопки "Сохранить"
        if (event.target.closest('.car-parts-modal__save')) {
            const partName = carPartsModal__text.textContent;
            const checkboxes = carParts__modal.querySelectorAll('input[type="checkbox"]');
            const comment = carParts__modal.querySelector('.car-parts-modal__comment input').value;
            
            const damageData = {
                part: partName,
                painted: checkboxes[0].checked,
                scratch: checkboxes[1].checked,
                dent: checkboxes[2].checked,
                corrosion: checkboxes[3].checked,
                comment: comment
            };
            
            // Сохраняем в informationAboutUserCar
            if (!informationAboutUserCar.damages) {
                informationAboutUserCar.damages = {};
            }
            informationAboutUserCar.damages[partName] = damageData;
            
            console.log('Сохранены данные о повреждениях:', damageData);
            
            // Обновляем визуальное состояние
            updateCarPartsVisual();
            
            // Закрываем модальное окно
            carParts__modal.classList.remove('car-parts__modal-active');
            carParts__modal.style.display = 'none';
        }
        
        // Обработка кнопки "Удалить"
        if (event.target.closest('.car-parts-modal__close')) {
            const partName = carPartsModal__text.textContent;
            
            // Удаляем данные о повреждениях для этой детали
            if (informationAboutUserCar.damages && informationAboutUserCar.damages[partName]) {
                delete informationAboutUserCar.damages[partName];
                console.log('Удалены данные о повреждениях для:', partName);
            }
            
            // Обновляем визуальное состояние
            updateCarPartsVisual();
            
            // Очищаем форму
            clearDamageModal();
            
            // Закрываем модальное окно
            carParts__modal.classList.remove('car-parts__modal-active');
            carParts__modal.style.display = 'none';
        }
    });

    // Инициализация при загрузке
    updateCarPartsVisual();

    carParts__modal.style.display = 'none';
    photoAfter.style.display = 'none';
    mainFifth__mileage.style.display = 'none';
    const mainFifthPhotoTextBlock__explanation = document.querySelector('.main-fifth-photo-text__block__explanation');
    mainFifthPhotoTextBlock__explanation.style.display = 'none';


    const mainFifth__car = document.querySelector('.main-fifth__car');
    mainFifth__car.style.display = 'none';
    
    
    function initModalOverlay() {
        const modalOverlayBtn = document.querySelector('.car-brand-all-brand');
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalOverlayCloseBtn = document.querySelector('.modal-close-overlay__btn');
        
       
        const mainCarBrands = document.querySelectorAll('.main-container__car-brands .car-brand');
        const modalCarBrands = document.querySelectorAll('.car-brands-grid p');

       
        function handleCarBrandSelection(event) {
            selectedCarBrand = event.currentTarget.textContent.trim();
            informationAboutCar('brand', selectedCarBrand);
            hideModalOverlay();
            switchToSecondModal();
        }

       
        mainCarBrands.forEach((elem) => {
            elem.addEventListener('click', handleCarBrandSelection);
        });

   
        modalCarBrands.forEach((elem) => {
            elem.addEventListener('click', handleCarBrandSelection);
        });

      
        modalOverlayBtn.addEventListener('click', function(){
            showModalOverlay();
        });

        if (modalOverlayCloseBtn) {
            modalOverlayCloseBtn.addEventListener('click', hideModalOverlay);
        }

        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                hideModalOverlay();
            }
        });

       
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                hideModalOverlay();
            }
        });

        function hideModalOverlay() {
            modalOverlay.style.display = 'none';
        }

        function showModalOverlay() {
            modalOverlay.style.display = 'flex';
        }
    }

    function informationAboutCar(key, value) {
        if (key && value) {
            informationAboutUserCar[key] = value;
            console.log(informationAboutUserCar)
        }

        const fifthMassiv = ['transmission', 'color', 'drive', 'configuration', 'available']

        let flagMileage = fifthMassiv.every((elem)=>{
            return Object.keys(informationAboutUserCar).includes(elem);
        })
        if (flagMileage) {
            fifthModal(true)
        }
        const massiv = ['brand', 'model', 'year', 'body', 'generation', 'engine'];
        let flag = massiv.every((elem) => {
            return Object.keys(informationAboutUserCar).includes(elem);
        });

        const isFifthOpen = document.querySelector('.main-fifth').style.display === 'block';
        console.log(isFifthOpen)
        if (flag && isFifthOpen === false) {
            fifthModal();
        }
        return {...informationAboutUserCar}
    }
    
    function switchToSecondModal() {
       
        const secondModelBriefP = document.querySelectorAll('.container-second-models__brief p');

        const secondModelAllP = document.querySelectorAll('.container-second-models__all p');

        mainElement.style.opacity = '0';
        mainElement.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            mainElement.style.display = 'none';
            
            secondModelAllP.forEach((elem) => {
                elem.addEventListener('click', function(event) {
                    const elemValue = event.currentTarget.textContent.trim();
                    informationAboutCar('model', elemValue);
                    switchToThirdModal(); 
                })
            })
            secondModelBriefP.forEach((elem) => {
                elem.addEventListener('click', function(event) {
                    const elemValue = event.currentTarget.textContent.trim();
                    informationAboutCar('model', elemValue);
                    switchToThirdModal(); 
                })
            }) 
            if (secondInputsBrand) {
                secondInputsBrand.value = informationAboutUserCar['brand'] || '';
            }
            
         
            mainSecondElement.style.display = 'flex';
            
            setTimeout(() => {
                mainSecondElement.style.opacity = '1';
                mainSecondElement.style.transform = 'scale(1)';
                
            
                initAllModelsButton();
            }, 10);
            
        }, 400);


    }


    function initAllModelsButton() {
        const showAllBtn = document.querySelector('.show-all');
        const hideAllBtn = document.querySelector('.hide-all');
        const allModels = document.querySelector('.container-second-models__all');
        
        if (showAllBtn && hideAllBtn && allModels) {
       
            showAllBtn.onclick = function() {
                allModels.style.display = 'grid';
                hideAllBtn.style.display = 'block';
                showAllBtn.style.display = 'none'; 
                
              
    
            };
            
        
            hideAllBtn.onclick = function() {
                allModels.style.display = 'none'; // СКРЫВАЕМ all
                showAllBtn.style.display = 'block'; // ПОКАЗЫВАЕМ кнопку "Все модели"
                hideAllBtn.style.display = 'none'; // СКРЫВАЕМ кнопку "Свернуть"
                
           
            };
        }
    }


    initModalOverlay();

    function switchToThirdModal() {
        mainSecondElement.classList.add('hiding');
        
        setTimeout(() => {
            mainSecondElement.style.display = 'none';
            mainSecondElement.classList.remove('hiding');
            
            const mainThirdDiv = document.querySelector('.main-third');
            mainThirdDiv.style.display = 'flex';
            
            setTimeout(() => {
                mainThirdDiv.classList.add('showing');
            }, 10);
            
            // Заполняем inputs
            const informationForInput = informationAboutCar();
            const marka = informationForInput['brand'];
            const model = informationForInput['model'];
            const mainThirdInputs = document.querySelector('.main-third__inputs');
            const mainFirstInput = mainThirdInputs.children[0];
            const mainSecondInput = mainThirdInputs.children[1];
            mainFirstInput.value = marka;
            mainSecondInput.value = model;

            // Инициализируем кнопки
            initYearButtons();

        }, 100);
    }

    function fourthModal() {
        const mainThirdDiv = document.querySelector('.main-third');
        const fourthModalDiv = document.querySelector('.main-fourth');
        const mainFourthFirstInput = document.querySelector('.main-fourth__inputs').children[0];
        const mainFourthSecondInput = document.querySelector('.main-fourth__inputs').children[1];
        const mainFourthYearOfReleaseShowModal__btn = document.querySelector('.main-fourth-year-of-release-show-modal__btn');
        const yearOfReleaseModal__brief = document.querySelector('.year-of-release-modal__brief');
        const yearOfReleaseModalBrief__btn = document.querySelector('.year-of-release-modal-brief__btn');
        const yearOfReleaseModal__all = document.querySelector('.year-of-release-modal__all');
        const yearOfReleaseModalAll__btn = document.querySelector('.year-of-release-modal-all__btn');
        const mainFourthCarBody__btn = document.querySelector('.body-selector');
        const mainFourthCarBodyModal = document.querySelector('.main-fourth-car-body__modal');
        const mainFourthCarBodyModal__check = document.querySelector('.main-fourth-car-body-modal__check');
        const mainFourthCarBodyP__btn = document.querySelector('.body-selector p');
        const mainFourthGeneration__btn = document.querySelector('.generation-selector');
        const mainFourthCarGeneration__modal = document.querySelector('.main-fourth-car-generation__modal');
        const mainFourthCarGenerationModal__check = document.querySelector('.main-fourth-car-generation-modal__check');
        const generationSelector = document.querySelector('.generation-selector p')
        const mainFourthTypeOfEngine__modal = document.querySelector('.main-fourth-type-of-engine__modal');
        const typeOfEngineSelector = document.querySelector('.type-of-engine-selector');
        const typeOfEngineSelectorP = document.querySelector('.type-of-engine-selector p');



        mainFourthTypeOfEngine__modal.addEventListener('click', function(event){
            let elem = event.target.closest('.main-fourth-type-of-engine__block');
            if (elem) {
                const engine = elem.lastElementChild.textContent;
                informationAboutCar('engine', engine);
                typeOfEngineSelectorP.textContent = engine;
                document.querySelectorAll('.main-fourth-type-of-engine__block').forEach((element)=> {
                    element.classList.remove('main-fourth-type-of-engine__block-active');
                })
                elem.classList.add('main-fourth-type-of-engine__block-active');
                mainFourthTypeOfEngine__modal.style.display = 'none';

            }
        })
        mainFourthTypeOfEngine__modal.style.display = 'none';
        typeOfEngineSelector.addEventListener('click', function(){
            if (mainFourthTypeOfEngine__modal.style.display === 'none') {
                mainFourthTypeOfEngine__modal.style.display = 'flex';
            }
            else {
                mainFourthTypeOfEngine__modal.style.display = 'none';
            }
        })


        mainFourthCarGenerationModal__check.style.display = 'none';
        mainFourthCarGeneration__modal.style.display = 'none';
        mainFourthGeneration__btn.addEventListener('click', function(event){

            if (mainFourthCarGeneration__modal.style.display === 'none') {
                mainFourthCarGeneration__modal.style.display = 'grid';
            }

            else {
                mainFourthCarGeneration__modal.style.display = 'none';
            }
        });

        mainFourthCarGeneration__modal.addEventListener('click', function(event){

            const block = event.target.closest('.main-fourth-car-genertaion-modal__block');
            
            if (block) { 

                const generation = block.dataset.generation;
                informationAboutCar('generation', generation);
                block.appendChild(mainFourthCarGenerationModal__check)
                mainFourthCarGenerationModal__check.style.display = 'block';


               
                generationSelector.textContent = generation;
                mainFourthCarGeneration__modal.style.display = 'none';

            }
        });

        let mainFourthCarBodyModalCheckFlag = 0;
        mainFourthCarBodyModal.style.display = 'none';
        mainFourthCarBodyModal__check.style.display = 'none';
        mainFourthCarBodyModal.addEventListener('click', function(event){
            const clickedBlock = event.target.closest('.main-fourth-car-body-modal__block');
            
            if (clickedBlock) {
            
                mainFourthCarBodyModalCheckFlag = clickedBlock
                const blockRect = clickedBlock.getBoundingClientRect();
                
        
                const blockTop = blockRect.top + window.scrollY;
                const blockLeft = blockRect.left + window.scrollX;
                
                
                mainFourthCarBodyModal__check.style.display = 'block';
                
    
                mainFourthCarBodyModal__check.style.position = 'absolute';
                mainFourthCarBodyModal__check.style.top = (blockTop + 10) + 'px';  
                mainFourthCarBodyModal__check.style.left = (blockLeft + blockRect.width - 90) + 'px'; 
                
                const body = clickedBlock.dataset.body;
                mainFourthCarBodyP__btn.textContent = body;
                informationAboutCar('body', body)
                document.body.appendChild(mainFourthCarBodyModal__check);
                mainFourthCarBodyModal.style.display = 'none';
                mainFourthCarBodyModal__check.style.display = 'none';
            }
        });

        mainFourthCarBody__btn.addEventListener('click', function(event){

            if (mainFourthCarBodyModalCheckFlag) {
                mainFourthCarBodyModal__check.style.display = 'block';
            }
            if (mainFourthCarBodyModal.style.display === 'none') {
                mainFourthCarBodyModal.style.display = 'grid';
            }
            else {
                mainFourthCarBodyModal.style.display = 'none';
                mainFourthCarBodyModal__check.style.display = 'none';
            }
        })


        yearOfReleaseModal__brief.style.display = 'none';
        yearOfReleaseModal__all.style.display = 'none';
        yearOfReleaseModalBrief__btn.addEventListener('click', function(event){
            if (yearOfReleaseModal__all.style.display === 'none') {
                yearOfReleaseModal__brief.style.display = 'none';
                yearOfReleaseModal__all.style.display = 'grid';
            } else {
                yearOfReleaseModal__all.style.display = 'none';
                yearOfReleaseModal__brief.style.display = 'grid';
            }
        
        })

        yearOfReleaseModalAll__btn.addEventListener('click', function(event){
            if (yearOfReleaseModal__all.style.display === 'grid') {
                yearOfReleaseModal__all.style.display = 'none';
                yearOfReleaseModal__brief.style.display = 'grid';
            }
        })

        // Открытие модального окна brief
       mainFourthYearOfReleaseShowModal__btn.addEventListener('click', function(event){
            if (yearOfReleaseModal__brief.style.display === 'grid') {
                yearOfReleaseModal__brief.style.display = 'none';
            } else {
                yearOfReleaseModal__brief.style.display = 'grid';
            }
            if (yearOfReleaseModal__all.style.display === 'grid') {
                yearOfReleaseModal__all.style.display = 'none';
                yearOfReleaseModal__brief.style.display = 'none';

            }
        });

        yearOfReleaseModal__all.addEventListener('click', function(event){
            if (event.target.closest('.release-div')) {
                const year = event.target.textContent;
                yearOfReleaseModal__all.style.display = 'none';
                yearOfReleaseModal__brief.style.display = 'none';
                const yearText = document.querySelector('.main-fourth-year-of-release .text-content p');
                yearText.textContent = year;
                const fourthDescription = document.querySelector('.main-fourth__description p');
                fourthDescription.textContent = year;
                informationAboutCar('year', year)
            }
        })


         yearOfReleaseModal__brief.addEventListener('click', function(event){
            if (event.target.closest('.release-div')) {
                const year = event.target.textContent;
                yearOfReleaseModal__all.style.display = 'none';
                yearOfReleaseModal__brief.style.display = 'none';
                const yearText = document.querySelector('.main-fourth-year-of-release .text-content p');
                yearText.textContent = year;
                const fourthDescription = document.querySelector('.main-fourth__description p');
                fourthDescription.textContent = year;
                informationAboutCar('year', year)
            }
        })


        
        
        // Добавляем класс для анимации закрытия третьего окна
        mainThirdDiv.classList.add('main-third-close');

    
        
        setTimeout(function(){
            // Скрываем третье окно
            mainThirdDiv.style.display = 'none';
            
            // Показываем четвертое окно
            fourthModalDiv.style.display = 'flex';
            
            // Заполняем данные
            const informationForInput = informationAboutCar();
            const marka = informationForInput['brand'];
            const model = informationForInput['model'];
            const year = informationForInput['year'];
            mainFourthFirstInput.value = marka;
            mainFourthSecondInput.value = model;
            
            // Обновляем заголовок
            const fourthTitle = document.querySelector('.main-fourth__title h4');
            if (fourthTitle) {
                fourthTitle.textContent = `${marka} ${model}`;
            }
            
            // Обновляем год выпуска
            const fourthDescription = document.querySelector('.main-fourth__description p');
            if (fourthDescription && year) {
                fourthDescription.textContent = year;
            }
            
            // Обновляем год в характеристиках
            const yearText = document.querySelector('.main-fourth-year-of-release .text-content p');
            if (yearText && year) {
                yearText.textContent = year;
            }
            
            // Анимация появления четвертого окна
            setTimeout(() => {
                fourthModalDiv.classList.add('visible');
            }, 10);
            
        }, 400);
    }

    // Также нужно обновить обработчик клика по году
    function initYearButtons() {
        const mainThirdNewBtn = document.querySelector('.main-third-new__button button');
        const mainThirdOldBtn = document.querySelector('.main-third-old__button button');
        const mainThirdOldYears = document.querySelector('.main-third-old__years');
        const mainThirdNewYears = document.querySelector('.main-third-new__years');
        
        // Обработчик клика по году (как новому, так и старому)
        function handleYearClick(event) {
            const yearElement = event.target.closest('.main-third-new__year, .main-third-old__year');
            if (yearElement) {
                const year = yearElement.querySelector('p').textContent.trim();
                informationAboutCar('year', year);
                fourthModal();
            }
        }

        // Добавляем обработчики для обоих контейнеров с годами
        mainThirdNewYears.addEventListener('click', handleYearClick);
        mainThirdOldYears.addEventListener('click', handleYearClick);

        // Остальной код обработки кнопок "Старше"/"Свернуть" остается без изменений
        mainThirdNewBtn.addEventListener('click', function() {
            mainThirdOldYears.style.display = 'grid';
            this.style.display = 'none';
            mainThirdOldBtn.style.display = 'block';
        });

        mainThirdOldBtn.addEventListener('click', function() {
            mainThirdOldYears.style.display = 'none';
            mainThirdNewBtn.style.display = 'block';
            this.style.display = 'none';
        });
    }

    const mainFifthDisplay = document.querySelector('.main-fifth');
    mainFifthDisplay.style.display = 'none';

    function initFifthModalHandlers() {

        const photoInput = document.getElementById('car-photo');
        photoInput.addEventListener('change', function(event) {
            if (this.files.length > 0) {
                // Создаем массив файлов
                const filesArray = Array.from(this.files);
                
                // Добавляем массив файлов в informationAboutUserCar
                informationAboutCar('photos', filesArray);
                
                console.log(`Выбрано ${filesArray.length} фото:`);
                filesArray.forEach((file, index) => {
                    console.log(`${index + 1}. ${file.name} (${file.size} bytes)`);
                });
            }
        });
        const mainFifthSelectionByStatus__button = document.querySelector('.main-fifth-selection-by-status__button button');
        const mainFifthSelectionByStatus__modal = document.querySelector('.main-fifth-selection-by-status__modal');
        const mainFifthSelectionByStatusModal__left = document.querySelector('.main-fifth-selection-by-status-modal__left');
        const mainFifthSelectionByStatusModal__right = document.querySelector('.main-fifth-selection-by-status-modal__right');
        const mainFifthSelectionByStatusModal__closeBtn = document.querySelector('.main-fifth-selection-by-status-modal__close-btn');
        const mainFifthSelectionByStatusModalLeft__button = document.querySelector('.main-fifth-selection-by-status-modal-left__button');


        const mainFifthSelectionByStatusModalLeft__buttonButton = document.querySelector('.main-fifth-selection-by-status-modal-left__button-button');


        function collectStatusFormData() {
            const form = document.getElementById('statusForm');
            const formData = new FormData(form);
            const statusData = {};

            // Собираем все данные из формы
            for (let [key, value] of formData.entries()) {
                // Для чекбоксов собираем массивы значений
                if (key === 'car_usage' || key === 'priorities' || key === 'share_experience') {
                    if (!statusData[key]) {
                        statusData[key] = [];
                    }
                    statusData[key].push(value);
                } else {
                    statusData[key] = value;
                }
            }

            // Собираем данные из input элементов, которые не в FormData
            const additionalInputs = form.querySelectorAll('input[type="text"], input[type="number"], select');
            additionalInputs.forEach(input => {
                if (input.name && !formData.has(input.name)) {
                    statusData[input.name] = input.value;
                }
            });

            // Собираем данные из radio кнопок (которые не выбраны)
            const radioGroups = {};
            form.querySelectorAll('input[type="radio"]').forEach(radio => {
                const name = radio.name;
                if (!radioGroups[name]) {
                    radioGroups[name] = formData.has(name) ? formData.get(name) : '';
                }
            });

            // Добавляем radio данные
            Object.assign(statusData, radioGroups);

            return statusData;
        }
        mainFifthSelectionByStatusModalLeft__buttonButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Собираем все данные из анкеты
            const statusData = collectStatusFormData();
            
            // Записываем в informationAboutUserCar
            informationAboutCar('status_characteristics', statusData);
            
            console.log('Данные анкеты сохранены:', statusData);
            console.log('Все данные автомобиля:', informationAboutUserCar);
            
            // Закрываем модальное окно с анимацией
            mainFifthSelectionByStatusModal__left.classList.remove('main-fifth-selection-by-status-modal-left-show');
            mainFifthSelectionByStatusModal__right.classList.remove('main-fifth-selection-by-status-modal-right-show');
            
            mainFifthSelectionByStatusModal__left.classList.add('main-fifth-selection-by-status-modal-left-hide');
            mainFifthSelectionByStatusModal__right.classList.add('main-fifth-selection-by-status-modal-right-hide');
            
            setTimeout(() => {
                mainFifthSelectionByStatus__modal.classList.remove('main-fifth-selection-by-status__modal-active');
            }, 300);
        });

     
        mainFifthSelectionByStatus__button.addEventListener('click', () => {
            mainFifthSelectionByStatus__modal.classList.add('main-fifth-selection-by-status__modal-active');

            // Удаляем классы закрытия, если они были
            mainFifthSelectionByStatusModal__left.classList.remove('main-fifth-selection-by-status-modal-left-hide');
            mainFifthSelectionByStatusModal__right.classList.remove('main-fifth-selection-by-status-modal-right-hide');

            // Добавляем классы появления
            mainFifthSelectionByStatusModal__left.classList.add('main-fifth-selection-by-status-modal-left-show');
            mainFifthSelectionByStatusModal__right.classList.add('main-fifth-selection-by-status-modal-right-show');
        });

        mainFifthSelectionByStatusModal__closeBtn.addEventListener('click', () => {
            // Удаляем классы появления
            mainFifthSelectionByStatusModal__left.classList.remove('main-fifth-selection-by-status-modal-left-show');
            mainFifthSelectionByStatusModal__right.classList.remove('main-fifth-selection-by-status-modal-right-show');

            // Добавляем классы закрытия
            mainFifthSelectionByStatusModal__left.classList.add('main-fifth-selection-by-status-modal-left-hide');
            mainFifthSelectionByStatusModal__right.classList.add('main-fifth-selection-by-status-modal-right-hide');

        // Убираем модалку после завершения анимации
        setTimeout(() => {
                mainFifthSelectionByStatus__modal.classList.remove('main-fifth-selection-by-status__modal-active');
            }, 300); // тайминг должен совпадать с duration
        });


        // Делегирование событий для всех элементов пятой модалки
        document.addEventListener('click', function(event) {
            // Обработка кнопки привода
            if (event.target.closest('.main-fifth__drive')) {
                const modal = document.querySelector('.main-fifth-drive__modal');
                modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
            }

            // Обработка кнопки закрытия анкеты статуса
            if (event.target.closest('.main-fifth-selection-by-status__button button')) {
                event.preventDefault(); // Предотвращаем перезагрузку страницы
                
                const mainFifthSelectionByStatus__modal = document.querySelector('.main-fifth-selection-by-status__modal');
                const mainFifthSelectionByStatusModal__left = document.querySelector('.main-fifth-selection-by-status-modal__left');
                const mainFifthSelectionByStatusModal__right = document.querySelector('.main-fifth-selection-by-status-modal__right');
                
                mainFifthSelectionByStatus__modal.classList.add('main-fifth-selection-by-status__modal-active');

                // Удаляем классы закрытия, если они были
                mainFifthSelectionByStatusModal__left.classList.remove('main-fifth-selection-by-status-modal-left-hide');
                mainFifthSelectionByStatusModal__right.classList.remove('main-fifth-selection-by-status-modal-right-hide');

                // Добавляем классы появления
                mainFifthSelectionByStatusModal__left.classList.add('main-fifth-selection-by-status-modal-left-show');
                mainFifthSelectionByStatusModal__right.classList.add('main-fifth-selection-by-status-modal-right-show');
            }

            // Обработка кнопки закрытия анкеты статуса (ДОБАВЬТЕ ЭТОТ БЛОК)
            if (event.target.closest('.main-fifth-selection-by-status-modal__close-btn')) {
                event.preventDefault();
                
                // Собираем данные из анкеты статуса
                const statusData = collectStatusFormData();
                informationAboutCar('status_characteristics', statusData);
                
                console.log('Данные анкеты сохранены:', statusData);
                
                // Закрываем модальное окно с анимацией
                const mainFifthSelectionByStatusModal__left = document.querySelector('.main-fifth-selection-by-status-modal__left');
                const mainFifthSelectionByStatusModal__right = document.querySelector('.main-fifth-selection-by-status-modal__right');
                const mainFifthSelectionByStatus__modal = document.querySelector('.main-fifth-selection-by-status__modal');
                
                mainFifthSelectionByStatusModal__left.classList.remove('main-fifth-selection-by-status-modal-left-show');
                mainFifthSelectionByStatusModal__right.classList.remove('main-fifth-selection-by-status-modal-right-show');
                
                mainFifthSelectionByStatusModal__left.classList.add('main-fifth-selection-by-status-modal-left-hide');
                mainFifthSelectionByStatusModal__right.classList.add('main-fifth-selection-by-status-modal-right-hide');
                
                setTimeout(() => {
                    mainFifthSelectionByStatus__modal.classList.remove('main-fifth-selection-by-status__modal-active');
                }, 300);
            }

            // Обработка кнопки "Опубликовать за" (ДОБАВЬТЕ ЭТОТ БЛОК)
            if (event.target.closest('.main-fifth-promotion__button button')) {
                event.preventDefault();
                
                const mainForm = document.forms.mainForm;
                
                if (!mainForm.checkValidity()) {
                    mainForm.reportValidity();
                    return;
                }
                
                const formData = new FormData(mainForm);
                
                Object.keys(informationAboutUserCar).forEach(key => {
                    if (informationAboutUserCar[key] !== undefined && 
                        informationAboutUserCar[key] !== null && 
                        key !== 'photos') {
                        formData.append(key, informationAboutUserCar[key]);
                    }
                });
                
                sendFormDataToServer(formData);
            }
            
            // Обработка кнопки конфигурации
            if (event.target.closest('.main-fifth-config__text')) {
                const modal = document.querySelector('.main-fifth-config__modal');
                modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
            }
            
            // Обработка кнопки трансмиссии
            if (event.target.closest('.main-fifth__transmission')) {
                const modal = document.querySelector('.main-fifth-transmission__modal');
                modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
            }
            
            // Обработка кнопки цвета
            if (event.target.closest('.main-fifth-color__text')) {
                const modal = document.querySelector('.main-fifth-color__modal');
                const isHidden = modal.style.display === 'none';
                modal.style.display = isHidden ? 'flex' : 'none';
                
                if (isHidden) {
                    const list = document.querySelector('.main-fifth-color-modal__list');
                    list.addEventListener('mouseover', showBlockColor);
                    list.addEventListener('mouseout', hideBlockColor);
                } else {
                    const list = document.querySelector('.main-fifth-color-modal__list');
                    list.removeEventListener('mouseover', showBlockColor);
                    list.removeEventListener('mouseout', hideBlockColor);
                }
            }
            
            // Обработка кнопки доступности
            if (event.target.closest('.main-fifth-available__text')) {
                const modal = document.querySelector('.main-fifth-available__modal');
                modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
            }
            
            // Обработка модалки конфигурации
            const configBlock = event.target.closest('.main-fifth-config-modal__block');
            if (configBlock) {
                const text = configBlock.lastElementChild.textContent;
                document.querySelectorAll('.config-check').forEach(check => check.classList.remove('config-check-active'));
                configBlock.querySelector('.config-check').classList.add('config-check-active');
                document.querySelector('.main-fifth-config__text p').textContent = text;
                informationAboutCar('configuration', text);
                
                const modal = document.querySelector('.main-fifth-config__modal');
                modal.classList.add('closing');
                setTimeout(() => {
                    modal.style.display = 'none';
                    modal.classList.remove('closing');
                }, 300);
            }
            
            // Обработка модалки трансмиссии
            const transmissionBlock = event.target.closest('.main-fifth-transmission-modal__block');
            if (transmissionBlock) {
                document.querySelectorAll('.main-fifth-transmission-modal__block').forEach(el => el.classList.remove('main-fifth-transmission-modal__block-active'));
                transmissionBlock.classList.add('main-fifth-transmission-modal__block-active');
                const textElement = transmissionBlock.querySelector('p:last-child');
                if (textElement) {
                    document.querySelector('.main-fifth-transmission__text p').textContent = textElement.textContent;
                    informationAboutCar('transmission', textElement.textContent);
                }
            }


            
            // Обработка модалки привода
            const driveBlock = event.target.closest('.main-fifth-drive-modal__block');
            if (driveBlock) {
                document.querySelectorAll('.main-fifth-drive-modal__block').forEach(el => el.classList.remove('main-fifth-drive-modal__block-active'));
                driveBlock.classList.add('main-fifth-drive-modal__block-active');
                const textElement = driveBlock.querySelector('p:last-child');
                if (textElement) {
                    document.querySelector('.main-fifth-drive__text p').textContent = textElement.textContent;
                    informationAboutCar('drive', textElement.textContent);
                }
            }
            
            // Обработка модалки доступности
            const availableBlock = event.target.closest('.main-fifth-available-modal__block');
            if (availableBlock) {
                const massivElem = document.querySelectorAll('.main-fifth-available-modal__block');
                massivElem.forEach((el) => {
                    el.classList.remove('main-fifth-available-modal__block-active');
                });
                
                const data = availableBlock.lastElementChild.textContent;
                informationAboutCar('available', data);
                document.querySelector('.main-fifth-available__text p').textContent = data;
                availableBlock.classList.add('main-fifth-available-modal__block-active');
                document.querySelector('.main-fifth-available__modal').style.display = 'none';
            }
            
            // Обработка кнопки "Назад"
            if (event.target.closest('.main-fifth-text__back-btn')) {
                const mainFifth__mileage = document.querySelector('.main-fifth__mileage');
                mainFifth__mileage.style.display = 'none';
                const mainFifth__photo = document.querySelector('.main-fifth__photo');
                mainFifth__photo.style.display = 'none';
                const mainFifth__car = document.querySelector('.main-fifth__car');
                mainFifth__car.style.display = 'none';
                const fourthModal = document.querySelector('.main-fourth');
                fourthModal.style.display = 'block';
                const mainFifth = document.querySelector('.main-fifth');
                mainFifth.style.display = 'none';
                const mainFifth__contacts = document.querySelector('.main-fifth__contacts');
                mainFifth__contacts.style.display = 'none';
                const mainFifth__placeOfInspection = document.querySelector('.main-fifth__place-of-inspection');
                mainFifth__placeOfInspection.style.display = 'none';
                const mainFifth__price = document.querySelector('.main-fifth__price');
                mainFifth__price.style.display = 'none';
                const mainFifth__promotion = document.querySelector('.main-fifth__promotion');
                mainFifth__promotion.style.display = 'none';
            }
        });

        // Функции для работы с цветами (вынесены отдельно, так как используют mouseover/mouseout)
        function showBlockColor(event) {
            const elem = event.target.closest('.main-fifth-color-modal__block');
            if (elem) {
                const colorName = elem.dataset.colorrus;
                const position = elem.getBoundingClientRect();
                const description = document.querySelector('.main-fifth-color-modal__description');
                
                description.querySelector('p').textContent = colorName;
                description.style.left = `${position.left + window.scrollX - 20}px`;
                description.style.top = `${position.top + window.scrollY - 40}px`;
                description.classList.add('visible');
            }
        }

        function hideBlockColor() {
            const description = document.querySelector('.main-fifth-color-modal__description');
            description.classList.remove('visible');
        }

        // Обработка кликов по блокам цвета
        document.addEventListener('click', function(event) {
            const colorBlock = event.target.closest('.main-fifth-color-modal__block');
            if (colorBlock) {
                const data = colorBlock.dataset.colorrus;
                document.querySelector('.main-fifth-color__text p').textContent = data[0].toUpperCase() + data.slice(1).toLowerCase();
                document.querySelector('.main-fifth-color__modal').style.display = 'none';
                informationAboutCar('color', data);
            }
        });
        const mainFifthContacts__communicationMethod__buttons = document.querySelector('.main-fifth-contacts__communication-method__buttons');
            mainFifthContacts__communicationMethod__buttons.addEventListener('click', function(event){
                const button = event.target.closest('.main-fifth-contacts__communication-method-buttons__button button');
                if (button) {
                    const buttons = mainFifthContacts__communicationMethod__buttons.querySelectorAll('.main-fifth-contacts__communication-method-buttons__button button');
                    buttons.forEach(el=>{
                        el.classList.remove('main-fifth-contacts__communication-method-buttons__button-active');
                    })
                    button.classList.add('main-fifth-contacts__communication-method-buttons__button-active');
                    const text = button.textContent;
                    informationAboutCar('contact', text);

                }
            })

        const wrapper = document.querySelector('.main-fifth-price-input__elements');
            const currencySpan = wrapper.querySelector('.main-fifth-price-input__currency');
            const arrow = wrapper.querySelector('.main-fifth-price-input__arrow');
            const modal = wrapper.querySelector('.main-fifth-price-input__modal');

            // Установка значения по умолчанию
            const defaultCurrency = wrapper.dataset.default || 'BYN';
            currencySpan.textContent = defaultCurrency;

            // Открытие/закрытие модалки
            wrapper.addEventListener('click', function () {
                const isHidden = modal.style.display === 'none' || !modal.style.display;
                modal.style.display = isHidden ? 'flex' : 'none';
                arrow.classList.toggle('open', isHidden);
            });

            // Выбор валюты
            modal.querySelectorAll('.currency-option').forEach(option => {
                option.addEventListener('click', function (event) {
                event.stopPropagation(); // предотвращает повторное открытие модалки
                currencySpan.textContent = this.textContent;
                modal.style.display = 'none';
                arrow.classList.remove('open');
                informationAboutCar('currency', currencySpan?.textContent || 'BYN');
                });
            });

              const numberClockRight__from = document.querySelector('.number-clock-right__from input');
            const numberClockRightFrom__modal = document.querySelector('.number-clock-right-from__modal');
            const numberClockRightTo__modal = document.querySelector('.number-clock-right-to__modal');
            const numberClockRight__to = document.querySelector('.number-clock-right__to input');
            
            numberClockRightTo__modal.style.display = 'none';
            numberClockRightFrom__modal.style.display = 'none';
            
            // Обработчики для модалок времени БЕЗ ОВЕРЛЕЯ
            numberClockRight__to.addEventListener('click', function(){
                const isHidden = numberClockRightTo__modal.style.display === 'none';
                if (isHidden) {
                    numberClockRightTo__modal.style.display = 'block';
                    requestAnimationFrame(() => {
                        numberClockRightTo__modal.classList.add('number-clock-right-from__modal-active');
                    });

                    // Функция закрытия по клику вне модалки
                    function closeToModalOnClickOutside(event) {
                        if (!event.target.closest('.number-clock-right-to__modal') && 
                            !event.target.closest('.number-clock-right__to input')) {
                            numberClockRightTo__modal.style.display = 'none';
                            numberClockRightTo__modal.classList.remove('number-clock-right-from__modal-active');
                            document.removeEventListener('click', closeToModalOnClickOutside);
                        }
                    }

                    // Добавляем обработчик на следующий цикл событий
                    setTimeout(() => {
                        document.addEventListener('click', closeToModalOnClickOutside);
                    }, 0);
                } else {
                    numberClockRightTo__modal.style.display = 'none';
                    numberClockRightTo__modal.classList.remove('number-clock-right-from__modal-active');
                }
            });

            numberClockRight__from.addEventListener('click', function () {
                const isHidden = numberClockRightFrom__modal.style.display === 'none';
                if (isHidden) {
                    numberClockRightFrom__modal.style.display = 'block';
                    requestAnimationFrame(() => {
                        numberClockRightFrom__modal.classList.add('number-clock-right-from__modal-active');
                    });

                    // Функция закрытия по клику вне модалки
                    function closeFromModalOnClickOutside(event) {
                        if (!event.target.closest('.number-clock-right-from__modal') && 
                            !event.target.closest('.number-clock-right__from input')) {
                            numberClockRightFrom__modal.style.display = 'none';
                            numberClockRightFrom__modal.classList.remove('number-clock-right-from__modal-active');
                            document.removeEventListener('click', closeFromModalOnClickOutside);
                        }
                    }

                    // Добавляем обработчик на следующий цикл событий
                    setTimeout(() => {
                        document.addEventListener('click', closeFromModalOnClickOutside);
                    }, 0);
                } else {
                    numberClockRightFrom__modal.style.display = 'none';
                    numberClockRightFrom__modal.classList.remove('number-clock-right-from__modal-active');
                }
            });

            // Обработчик для ВЫБОРА времени (ДЕЛЕГИРОВАНИЕ)
            document.addEventListener('click', function(event) {
                console.log('Общий клик:', event.target);
                
                const fromBlock = event.target.closest('.number-clock-right-from__block');
                const toBlock = event.target.closest('.number-clock-right-to__block');
                
                
                if (fromBlock) {
                   
                    const selectedTime = fromBlock.querySelector('p').textContent.trim();
                    informationAboutCar('from time', selectedTime)
                    
                    // Заполняем input и закрываем модалку
                    document.querySelector('.number-clock-right__from input').value = selectedTime;
                    numberClockRightFrom__modal.style.display = 'none';
                    numberClockRightFrom__modal.classList.remove('number-clock-right-from__modal-active');
                }
                
                if (toBlock) {
            
                    const selectedTime = toBlock.querySelector('p').textContent.trim();
                    informationAboutCar('to time', selectedTime)
                    
                    // Заполняем input и закрываем модалку
                    document.querySelector('.number-clock-right__to input').value = selectedTime;
                    numberClockRightTo__modal.style.display = 'none';
                    numberClockRightTo__modal.classList.remove('number-clock-right-from__modal-active');
                }
            });

    }

    initFifthModalHandlers(); 


    // Обновленная функция fifthModal - теперь только для показа/скрытия
    function fifthModal(param) {
        

        function calculateIndividualPrice() {
            let heightBlock = 1150;
            const mainFifth__promotion = document.querySelector('.main-fifth__promotion');
            mainFifth__promotion.style.height = `${heightBlock}px`;

            const mainFifthPromotion__total = document.querySelector('.main-fifth-promotion__total');
            mainFifthPromotion__total.querySelectorAll('.main-fifth-promotion-total__block-for-a-fee').forEach(el => el.remove());

            const mainFifthPromotionOptionsBlock__modal = document.querySelector('.main-fifth-promotion-options-block__modal');
            mainFifthPromotionOptionsBlock__modal.classList.add('main-fifth-promotion-options__block-active');

            const obj = {
                "8": 10,
                "37": 35,
                "56": 53
            };

            const optionsBlock__priceP = document.querySelector('.options-block__price-individually p');
            optionsBlock__priceP.textContent = `От 0 BYN`;

            const button = document.querySelector('.main-fifth-promotion__button button');
            button.textContent = `Опубликовать бесплатно`;

            const blocks = document.querySelectorAll('.main-fifth-promotion-options-block-modal__block');
            const checkedPrices = [];

            blocks.forEach(block => {
                const checkbox = block.querySelector('input[type="checkbox"]');
                const priceElement = block.querySelector('.options-block-modal-block__right p');
                const labelText = block.querySelector('.options-block-modal-block__left label')?.textContent || '';
                const priceText = priceElement?.textContent || '';
                const priceNumber = priceText.split(' ')[0];

                const blockId = block.dataset.id || labelText; // можно использовать label как ID, если нет data-id

                const existingBlock = mainFifthPromotion__total.querySelector(
                `.main-fifth-promotion-total__block-for-a-fee[data-id="${blockId}"]`
                );

                if (checkbox && checkbox.checked && priceElement) {
                checkedPrices.push(priceNumber);

                if (!existingBlock) {
                    const promotionTotalElem = document.createElement('div');
                    promotionTotalElem.classList.add('main-fifth-promotion-total__block-for-a-fee');
                    promotionTotalElem.dataset.id = blockId;

                    promotionTotalElem.innerHTML = `
                    <p class="main-fifth-promotion-total__label">${labelText}</p>
                    <span class="main-fifth-promotion-total__filler"></span>
                    <p class="main-fifth-promotion-total__value">${priceText}</p>
                    `;

                    mainFifthPromotion__total.append(promotionTotalElem);
                    heightBlock += 50;
                    mainFifth__promotion.style.height = `${heightBlock}px`;
                }
                } else {
                if (existingBlock) {
                    existingBlock.remove();
                    heightBlock -= 50;
                    mainFifth__promotion.style.height = `${heightBlock}px`;
                }
                }
            });

            const totalSum = checkedPrices.reduce((sum, price) => sum + parseInt(price), 0);
            const totalWidth = checkedPrices.reduce((sum, price) => sum + (obj[price] || 0), 0);

            optionsBlock__priceP.textContent = `От ${totalSum} BYN`;
            button.textContent = totalSum !== 0 ? `Опубликовать за ${totalSum} BYN` : `Опубликовать бесплатно`;

            const progressBars = document.querySelectorAll('.promotion-statistic-block__line-progress');
            progressBars.forEach(bar => {
                bar.classList.remove(
                'promotion-statistic-block__line-progress-турбо',
                'promotion-statistic-block__line-progress-экспресс',
                'promotion-statistic-block__line-progress-individually',
                'promotion-statistic-block__line-progress-without'
                );
            });

            const progressClass = totalWidth > 0
                ? 'promotion-statistic-block__line-progress-individually'
                : 'promotion-statistic-block__line-progress-without';

            progressBars.forEach(bar => {
                bar.classList.add(progressClass);
                bar.style.width = `${totalWidth}%`;
            });

            return totalSum;
            }

        if (param === true) {
                const mainFifth__selectionByStatus = document.querySelector('.main-fifth__selection-by-status');
                mainFifth__selectionByStatus.style.display = 'flex';



            function initPromotionWithoutOptions(type) {
                const elems = document.querySelectorAll('.promotion-statistic-block__line-progress');
                

       
                elems.forEach((el) => {
                    el.classList.remove(
                        'promotion-statistic-block__line-progress-турбо',
                        'promotion-statistic-block__line-progress-экспресс',
                        'promotion-statistic-block__line-progress-individually',
                        'promotion-statistic-block__line-progress-without',
                        
                    );
                });
                
                if (type !== 'По отдельности') {
                    elems.forEach((el) => {
                        el.classList.add(`promotion-statistic-block__line-progress-${type.toLowerCase()}`);
                    });
                }
                else {
                    console.log('zombie')
                }
            }

            // ПОТОМ объяви переменные
            const mainFifthPromotion__options = document.querySelector('.main-fifth-promotion__options');
            const mainFifthPromotion__withoutOptions = document.querySelector('.main-fifth-promotion__without-options');
            const mainFifthPromotionOptionsBlock__modal = document.querySelector('.main-fifth-promotion-options-block__modal');
            mainFifthPromotionOptionsBlock__modal.style.display = 'none';
            const mainFifth__promotionStyle = document.querySelector('.main-fifth__promotion');
            const mainFifthPromotion__top = document.querySelector('.main-fifth-promotion__top');
            mainFifth__promotionStyle.style.height = '950px';
            mainFifthPromotion__top.style.height = '580px';
            // ЗАТЕМ добавь обработчики
            mainFifthPromotion__options.addEventListener('click', function(event) {
                const elem = event.target.closest('.main-fifth-promotion-options__block');
                mainFifthPromotionOptionsBlock__modal.style.display = 'none';
                mainFifth__promotionStyle.style.height = '950px';
                mainFifthPromotion__top.style.height = '580px';
                informationAboutCar('option', elem.querySelector('.options-block__title h5').textContent);
                if (elem.dataset.option === 'По отдельности') {
                    // Сначала подсчитываем текущую сумму
                    calculateIndividualPrice();
                    
                    mainFifth__promotionStyle.style.height = '1150px';
                    mainFifthPromotion__top.style.height = '800px';
                    
                    // Показываем модалку после изменения высоты
                    requestAnimationFrame(() => {
                        mainFifthPromotionOptionsBlock__modal.style.display = 'flex';
                        mainFifthPromotionOptionsBlock__modal.classList.remove('main-fifth-promotion-options-block__modal-show');
                        
                        requestAnimationFrame(() => {
                            mainFifthPromotionOptionsBlock__modal.classList.add('main-fifth-promotion-options-block__modal-show');
                        });
                    });
                }

                // Игнорируем клики по чекбоксам
                if (event.target.type === 'checkbox' && elem) {
                    return;
                }
                
                if (elem && !event.target.matches('input[type="checkbox"]')) {
                    // Убираем активный класс у всех блоков опций
                    const mainFifthPromotion__total = document.querySelector('.main-fifth-promotion__total');
                    mainFifthPromotion__total.querySelectorAll('.main-fifth-promotion-total__block-for-a-fee').forEach(el=>{
                        el.remove();
                    });
         

                    document.querySelectorAll('.main-fifth-promotion-options__block').forEach(block => {
                        block.classList.remove('main-fifth-promotion-options__block-active');
                        // Снимаем галочки со всех чекбоксов
                        const checkbox = block.querySelector('input[type="checkbox"]');
                        if (checkbox) {
                            checkbox.checked = false;
                        }
                    });
                    
                  
                    const promotionTotalElem = document.createElement('div');
                    promotionTotalElem.classList.add('main-fifth-promotion-total__block-for-a-fee');

             
                    const blockText = elem.querySelector('.block-p')?.textContent || '';
                    const match = blockText.match(/\d+/);
                    const extractedNumber = match ? parseInt(match[0], 10) : 0;

                    promotionTotalElem.innerHTML = `
                    <p class="main-fifth-promotion-total__label">
                    ${elem.dataset.option.charAt(0).toUpperCase() + elem.dataset.option.slice(1).toLowerCase()}-продажа на ${extractedNumber} ${
                        extractedNumber % 100 >= 11 && extractedNumber % 100 <= 14
                        ? 'дней'
                        : extractedNumber % 10 === 1
                        ? 'день'
                        : extractedNumber % 10 >= 2 && extractedNumber % 10 <= 4
                        ? 'дня'
                        : 'дней'
                    }
                    </p>
                    <span class="main-fifth-promotion-total__filler"></span>
                    <p class="main-fifth-promotion-total__value">${elem.querySelector('.options-block__price p').textContent}</p>
                    `;
                    const mainFifth__promotion = document.querySelector('.main-fifth__promotion');
                    mainFifth__promotion.style.height = `1000px`;
                    mainFifthPromotion__total.append(promotionTotalElem);
                    

                    const mainFifthPromotionOptionsBlock__modal = document.querySelector('.main-fifth-promotion-options-block__modal');
                    mainFifthPromotionOptionsBlock__modal.classList.remove('main-fifth-promotion-options__block-active');

                    // Убираем активный класс у "Без опций"
                    const withoutOptionsBlock = document.querySelector('.main-fifth-promotion__without-options');
                    withoutOptionsBlock.classList.remove('main-fifth-promotion-options__block-active');
                    
                    // Добавляем активный класс к выбранному блоку
                    elem.classList.add('main-fifth-promotion-options__block-active');
                    
                    // Ставим галочку в выбранном блоке
                    const checkbox = elem.querySelector('input[type="checkbox"]');
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                    
                    const type = elem.dataset.option;
                    console.log('Выбрана опция:', type);
                    initPromotionWithoutOptions(type);
                    
                    // Обновляем кнопку
                    const button = document.querySelector('.main-fifth-promotion__button button');
                    if (type === 'Турбо') {
                        button.textContent = 'Опубликовать за 64 BYN';
                    } else if (type === 'Экспресс') {
                        button.textContent = 'Опубликовать за 47 BYN';
                    } else if (type === 'По отдельности') {
                        calculateIndividualPrice();
                    }
                }
            });

            // Обработчик для "Без опций"
            mainFifthPromotion__withoutOptions.addEventListener('click', function(event) {
                event.target.classList.add('main-fifth-promotion-options__block-active');
                const mainFifthPromotion__total = document.querySelector('.main-fifth-promotion__total');
                mainFifthPromotion__total.querySelectorAll('.main-fifth-promotion-total__block-for-a-fee').forEach(el=>{
                    el.remove();
                });
                informationAboutCar('option', 'Бесплатно');
                mainFifth__promotion.style.height = `950px`;
                // Игнорируем клики по чекбоксам
                const mainFifthPromotionOptionsBlock__modal = document.querySelector('.main-fifth-promotion-options-block__modal');
                mainFifthPromotionOptionsBlock__modal.style.display = 'none';
                mainFifth__promotionStyle.style.height = '950px';
                mainFifthPromotion__top.style.height = '580px';
                if (event.target.type === 'checkbox') {
                    return;
                }
                
                // Убираем активный класс у всех блоков
                document.querySelectorAll('.main-fifth-promotion-options__block').forEach(block => {
                    block.classList.remove('main-fifth-promotion-options__block-active');

                    // Снимаем галочки со всех чекбоксов
                    const checkbox = block.querySelector('input[type="checkbox"]');
                    if (checkbox) {
                        checkbox.checked = false;
                    }
                });
                
                // Снимаем галочку с "Без опций" если кликнули не по чекбоксу
                if (!event.target.matches('input[type="checkbox"]')) {
                    const withoutOptionsCheckbox = this.querySelector('input[type="checkbox"]');
                    if (withoutOptionsCheckbox) {
                        withoutOptionsCheckbox.checked = true;
                    }
                }
                
                // Сбрасываем прогресс-бары
                const elems = document.querySelectorAll('.promotion-statistic-block__line-progress');
                elems.forEach((el) => {
                    el.classList.remove(
                        'promotion-statistic-block__line-progress-турбо',
                        'promotion-statistic-block__line-progress-экспресс',
                        'promotion-statistic-block__line-progress-individually',
                        'promotion-statistic-block__line-progress-without',
                    );
                    el.classList.add('promotion-statistic-block__line-progress-without');
                });
                
                // Обновляем кнопку
                const button = document.querySelector('.main-fifth-promotion__button button');
                button.textContent = 'Опубликовать бесплатно';
            });

            // Обработчик для чекбоксов (чтобы они тоже работали)
            document.addEventListener('change', function(event) {
                if (event.target.type === 'checkbox') {
                    const checkbox = event.target;
                    const block = checkbox.closest('.main-fifth-promotion-options__block, .main-fifth-promotion__without-options');
                    
                    if (event.target.type === 'checkbox' && 
                        event.target.closest('.main-fifth-promotion-options-block-modal__block')) {
                        
                        // Пересчитываем сумму
                        calculateIndividualPrice();
                    }
                    if (block) {
                        // Если это блок опций
                        if (block.classList.contains('main-fifth-promotion-options__block')) {
                            if (checkbox.checked) {
                                // Снимаем галочки с других блоков
                                document.querySelectorAll('.main-fifth-promotion-options__block').forEach(otherBlock => {
                                    if (otherBlock !== block) {
                                        otherBlock.classList.remove('active');
                                        otherBlock.querySelector('input[type="checkbox"]').checked = false;
                                    }
                                });
                                
                                // Снимаем галочку с "Без опций"
                                const withoutOptionsCheckbox = document.querySelector('.main-fifth-promotion__without-options input[type="checkbox"]');
                                if (withoutOptionsCheckbox) {
                                    withoutOptionsCheckbox.checked = false;
                                }
                                
                                // Активируем текущий блок
                                block.classList.add('active');
                                const type = block.dataset.option;
                                initPromotionWithoutOptions(type);
                                
                                // Обновляем кнопку
                                const button = document.querySelector('.main-fifth-promotion__button button');
                                if (type === 'Турбо') {
                                    button.textContent = 'Опубликовать за 64 BYN';
                                } else if (type === 'Экспресс') {
                                    button.textContent = 'Опубликовать за 47 BYN';
                                } else if (type === 'По отдельности') {
                                    button.textContent = 'Опубликовать за 18 BYN';
                                }
                            }
                        }
                        // Если это "Без опций"
                        else if (block.classList.contains('main-fifth-promotion__without-options')) {
                            if (checkbox.checked) {
                                // Снимаем галочки и активные классы с других блоков
                                document.querySelectorAll('.main-fifth-promotion-options__block').forEach(otherBlock => {
                                    otherBlock.classList.remove('active');
                                    otherBlock.querySelector('input[type="checkbox"]').checked = false;
                                });
                                
                                // Сбрасываем прогресс-бары
                                const elems = document.querySelectorAll('.promotion-statistic-block__line-progress');
                                elems.forEach((el) => {
                                    el.classList.remove(
                                        'promotion-statistic-block__line-progress-турбо',
                                        'promotion-statistic-block__line-progress-экспресс',
                                        'promotion-statistic-block__line-progress-по-отдельности'
                                    );
                                    el.style.width = '20px';
                                    el.style.backgroundColor = 'gray';
                                });
                                
                                // Обновляем кнопку
                                const button = document.querySelector('.main-fifth-promotion__button button');
                                button.textContent = 'Опубликовать бесплатно';
                            }
                        }
                    }
                }
            });
            // Логика для показа дополнительных блоков когда все данные заполнены
            const mainFifth__placeOfInspection = document.querySelector('.main-fifth__place-of-inspection');
            mainFifth__placeOfInspection.style.display = 'none';
            const mainFifth__price = document.querySelector('.main-fifth__price');
            mainFifth__price.style.display = 'none';
            const mainFifth__promotion = document.querySelector('.main-fifth__promotion');

            const carParts__modal = document.querySelector('.car-parts__modal');
            carParts__modal.style.display = 'none';
            const mainFifthPhotoTextBlock__explanation = document.querySelector('.main-fifth-photo-text__block__explanation');
            mainFifthPhotoTextBlock__explanation.style.display = 'none';
            const mainFifthPhotoText__block = document.querySelector('.main-fifth-photo-text__block');
            const mainFifth__contacts = document.querySelector('.main-fifth__contacts');
            mainFifth__contacts.style.display = 'flex';

          

            const mainFifth__car = document.querySelector('.main-fifth__car');
            mainFifth__car.style.display = 'flex';

            function showPhotoExpl(event) {
                const mainFifthPhotoTextBlock__explanation = document.querySelector('.main-fifth-photo-text__block__explanation');
                mainFifthPhotoTextBlock__explanation.style.display = 'block';
                const position = event.target.getBoundingClientRect();
                mainFifthPhotoTextBlock__explanation.style.left = `${position.left + window.scrollX - 200}px`;
                mainFifthPhotoTextBlock__explanation.style.top = `${position.top + window.scrollY + 30}px`;
            }

            function closePhotoExpl(event) {
                const elem = event.target.closest('.main-fifth-photo-text__block');
                if (elem) {
                    const mainFifthPhotoTextBlock__explanation = document.querySelector('.main-fifth-photo-text__block__explanation');
                    mainFifthPhotoTextBlock__explanation.style.display = 'none';
                }
            }

            mainFifthPhotoText__block.addEventListener('mouseover', showPhotoExpl);
            mainFifthPhotoText__block.addEventListener('mouseout', closePhotoExpl);

            requestAnimationFrame(() => {
                mainFifth__contacts.classList.add('main-fifth__contacts-animation');
            });

            requestAnimationFrame(() => {
                mainFifth__car.classList.add('main-fifth__car-animation');
            });

            mainFifth__placeOfInspection.style.display = 'flex';
            requestAnimationFrame(() => {
                mainFifth__placeOfInspection.classList.add('main-fifth__place-of-inspection-show');
            });

            mainFifth__price.style.display = 'flex';
            requestAnimationFrame(() => {
                mainFifth__price.classList.add('main-fifth__price-show');
            });

            const mainFifth__mileage = document.querySelector('.main-fifth__mileage');
            mainFifth__mileage.style.display = 'flex';
            requestAnimationFrame(() => {
                mainFifth__mileage.classList.add('main-fifth__mileage-show');
            });

            const photoAfter = document.querySelector('.main-fifth__photo');
            photoAfter.style.display = 'flex';
            requestAnimationFrame(() => {
                photoAfter.classList.add('photo-after-animation');
            });

            mainFifth__promotion.style.display = 'flex';
            requestAnimationFrame(() => {
                mainFifth__promotion.classList.add('main-fifth__promotion-show');
            });

            return;
        }

        // Первоначальный показ пятой модалки
        const fourthModal = document.querySelector('.main-fourth');
        const mainFifth = document.querySelector('.main-fifth');
        
        // Инициализация состояний (только стили, без обработчиков)
        const mainFifthDrive__modal = document.querySelector('.main-fifth-drive__modal');
        const mainFifthConfig__modal = document.querySelector('.main-fifth-config__modal');
        const mainFifthTransmission__modal = document.querySelector('.main-fifth-transmission__modal');
        const mainFifthColor__modal = document.querySelector('.main-fifth-color__modal');
        const mainFifthAvailable__modal = document.querySelector('.main-fifth-available__modal');
        const mainFifthColorModal__description = document.querySelector('.main-fifth-color-modal__description');
        const promotionFinalTitle__aboutH5 = document.querySelector('.promotion-final-title__about h5');
        const promotionFinalTitle__aboutP = document.querySelector('.promotion-final-title__about p');

        

        
        // Установка начальных состояний
        fourthModal.style.display = 'none';
        mainFifth.style.display = 'block';
        mainFifthDrive__modal.style.display = 'none';
        mainFifthConfig__modal.style.display = 'none';
        mainFifthTransmission__modal.style.display = 'none';
        mainFifthColor__modal.style.display = 'none';
        mainFifthAvailable__modal.style.display = 'none';
        mainFifthColorModal__description.style.display = 'block';

        // Инициализация цветов (только визуальная часть)
        const mainFifthColorModal__block = document.querySelectorAll('.main-fifth-color-modal__block');
        const massivColor = Array.from(mainFifthColorModal__block, elem => elem.dataset.color);
        mainFifthColorModal__block.forEach((elem, index) => {
            elem.style.background = massivColor[index];
        });

        // Обновление заголовков
        const { brand, model, year, body, generation } = informationAboutUserCar;
        const fifthTitleLeft__text = document.querySelector('.main-fifth-title__left h1');
        const fifthTitleLeft__additionalFirst = document.querySelector('.fifth-title-left__additional .first-text');
        
        fifthTitleLeft__additionalFirst.textContent = `${year} ${body} (${generation})`;
        fifthTitleLeft__text.textContent = `${brand} ${model}`;

        console.log(brand, model, generation)
        promotionFinalTitle__aboutH5.textContent = `${brand} ${model} (${generation})`;
        promotionFinalTitle__aboutP.textContent = `${year}`;

        // Анимация
        setTimeout(() => {
            fourthModal.classList.add('main-fourth-active');
        }, 3000);
    }

  
 
    document.addEventListener('click', function(event) {
        // Обработка кнопки "Опубликовать за"
        if (event.target.closest('.main-fifth-promotion__button button')) {
            event.preventDefault(); // Предотвращаем стандартную отправку
            
            const mainForm = document.forms.mainForm;
            
            // Проверяем валидность формы
            if (!mainForm.checkValidity()) {
                // Показываем сообщение о необходимости заполнить обязательные поля
                mainForm.reportValidity();
                return;
            }
            
            const formData = new FormData(mainForm);
            
            // Добавляем все данные о машине
            Object.keys(informationAboutUserCar).forEach(key => {
                if (informationAboutUserCar[key] !== undefined && 
                    informationAboutUserCar[key] !== null && 
                    key !== 'photos') { // фото уже в форме
                    formData.append(key, informationAboutUserCar[key]);
                }
            });
            
            sendFormDataToServer(formData);
        }
    });

                
});