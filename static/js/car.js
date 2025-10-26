document.addEventListener('DOMContentLoaded', () => {
    // Переменные для главного фото
    let photoIndex = 0;
    let middleIndex = 0;
    let leftScrollIndex = 0;

    // Элементы главного фото
    const mainPhotoImg = document.querySelector('.advertisement-about-right__main-photo img');
    const additionalPhotos = document.querySelectorAll('.advertisement-about-right-additionally-photo__block img');
    const leftArrow = document.querySelector('.advertisement-about-right-main-photo__left-arrow');
    const rightArrow = document.querySelector('.advertisement-about-right-main-photo__right-arrow');
    const mainPhotoContainer = document.querySelector('.advertisement-about-right__main-photo');
    const advertisementAboutRight__additionallyPhoto = document.querySelector('.advertisement-about-right__additionally-photo');

    // Элементы телефона
    const advertisementContacts__phone = document.querySelector('.advertisement-contacts__phone');
    const showPhoneNumber__overlay = document.querySelector('.show-phone-number__overlay');
    const overlayCloseBtn = document.querySelector('.show-phone-number__overlay-btn');
    const showPhoneNumber = document.querySelector('.show-phone-number');
    const showPhoneNumber__top = document.querySelector('.show-phone-number__top');
    const showPhoneNumber__bottom = document.querySelector('.show-phone-number__bottom');
    const showPhoneNumberTop__btn = document.querySelector('.show-phone-number-top__btn');
    const showPhoneNumberTop__firstBlock = document.querySelector('.show-phone-number-top__first-block');
    const showPhoneNumberTop__secondBock = document.querySelector('.show-phone-number-top__second-block');
    const showPhoneNumberTopSecondBlock__back = document.querySelector('.show-phone-number-top-second-block__back');

    // Элементы модального окна фото
    const advertisementAbout__right = document.querySelector('.advertisement-about__right');
    const carPhoto__modal = document.querySelector('.car-photo__modal');
    const carPhotoModal__closeBtn = document.querySelector('.car-photo-modal__close-btn');
    const leftPhotos = document.querySelectorAll('.car-photo-modal-left__photo');
    const leftPhotosContainer = document.querySelector('.car-photo-modal-left__photos');
    const topBtn = document.querySelector('.car-photo-modal-left-top-button__button');
    const bottomBtn = document.querySelector('.car-photo-modal-left-bottom-button__button');
    const middleContainer = document.querySelector('.car-photo-modal__middle');
    const middleImages = middleContainer.querySelectorAll('img');

    

    const advertisementContacts__callback = document.querySelector('.advertisement-contacts__callback');
    const callbackOverlay = document.querySelector('.callback__overlay');

    advertisementContacts__callback.addEventListener('click', function(event){
        callbackOverlay.classList.add('callback__overlay-active');
                
        const elem = document.querySelector('.callback__overlay');
        const callback__closeBtn = document.querySelector('.callback__close-btn');
        function closeOverlay () {
            callbackOverlay.classList.remove('callback__overlay-active');
        }

        elem.addEventListener('click', closeOverlay);
        callback__closeBtn.addEventListener('click', closeOverlay);
    })

    const cars = document.querySelectorAll('.car');
    cars.forEach((el) => {
        const imgSlider = el.querySelector('.car-img__slider');
        let originalImg = null;
        let currentSlideIndex = 0;
        
        el.addEventListener('mouseover', function(event) {
            const elem = event.target.closest('.car img:not(.car-img__slider img)');
            if (elem && !originalImg) {
                const sliderImages = imgSlider.querySelectorAll('img');
                const buttons = imgSlider.querySelectorAll('.car-img-slider-button');
                
   
                currentSlideIndex = 0;
                updateSlider(sliderImages, buttons);
                
          
                buttons.forEach((button, index) => {
                    button.addEventListener('mouseover', () => {
                        currentSlideIndex = index;
                        updateSlider(sliderImages, buttons);
                    });
                });
                
                originalImg = elem;
                imgSlider.classList.add('car-img__slider-active');
                elem.replaceWith(imgSlider);
            }
        });
        
        el.addEventListener('mouseleave', function(event) {
            if (originalImg && imgSlider.parentNode === el) {
                imgSlider.classList.remove('car-img__slider-active');
                imgSlider.replaceWith(originalImg);
                originalImg = null;
                
          
                const buttons = imgSlider.querySelectorAll('.car-img-slider-button');
                buttons.forEach(button => {
                    button.replaceWith(button.cloneNode(true));
                });
            }
        });
        
        function updateSlider(images, buttons) {
 
            images.forEach(img => {
                img.style.display = 'none';
            });
            
    
            images[currentSlideIndex].style.display = 'block';
            

            buttons.forEach((button, index) => {
                if (index === currentSlideIndex) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        }
    });
  

    leftPhotosContainer.addEventListener('mouseover', function(event){
        const elem = event.target.closest('.car-photo-modal-left__photo');
        if (elem) {
            const elems = leftPhotosContainer.querySelectorAll('.car-photo-modal-left__photo');
            elems.forEach((el)=>{
                el.classList.remove('car-photo-modal-left__photo-active')
            })
            elem.classList.add('car-photo-modal-left__photo-active');
        }
    })

    // Источники фото
    const photoSources = Array.from(additionalPhotos).map(img => img.getAttribute('src'));

    // ===== ФУНКЦИИ ДЛЯ ГЛАВНОГО ФОТО =====
    function updateMainPhoto(index) {
        mainPhotoImg.src = photoSources[index];
    }

    function showButtonsOnMainPhoto() {
        leftArrow?.classList.add('advertisement-about-right-main-photo__left-arrow-active');
        rightArrow?.classList.add('advertisement-about-right-main-photo__right-arrow-active');
    }

    function closeButtonsOnMainPhoto() {
        leftArrow?.classList.remove('advertisement-about-right-main-photo__left-arrow-active');
        rightArrow?.classList.remove('advertisement-about-right-main-photo__right-arrow-active');
    }

    // ===== ФУНКЦИИ ДЛЯ МОДАЛЬНОГО ОКНА ФОТО =====
    function scrollMiddleTo(index) {
        const imageHeight = middleImages[0].getBoundingClientRect().height;
        middleContainer.scrollTo({
            top: index * imageHeight,
            behavior: 'smooth'
        });
    }

    function scrollLeftPhotos(direction) {
        // Проверяем, есть ли больше 7 фото
        if (leftPhotos.length <= 7) return;

        const photoHeight = leftPhotos[0].getBoundingClientRect().height;
        const containerHeight = leftPhotosContainer.parentElement.getBoundingClientRect().height;
        const maxScroll = leftPhotosContainer.scrollHeight - containerHeight;
        
        if (direction === 'down') {
            leftScrollIndex = Math.min(leftScrollIndex + 1, leftPhotos.length - 7);
        } else {
            leftScrollIndex = Math.max(leftScrollIndex - 1, 0);
        }

        leftPhotosContainer.scrollTo({
            top: leftScrollIndex * photoHeight,
            behavior: 'smooth'
        });

        // Показываем/скрываем кнопки в зависимости от позиции
        updateLeftButtonsVisibility();
    }

    function updateLeftButtonsVisibility() {
        // Скрываем кнопки, если фото 7 или меньше
        if (leftPhotos.length <= 7) {
            topBtn.style.display = 'none';
            bottomBtn.style.display = 'none';
            return;
        }

        // Показываем кнопки
        topBtn.style.display = 'flex';
        bottomBtn.style.display = 'flex';

        // Обновляем состояние кнопок
        if (leftScrollIndex === 0) {
            topBtn.style.opacity = '0.5';
            topBtn.style.cursor = 'not-allowed';
        } else {
            topBtn.style.opacity = '1';
            topBtn.style.cursor = 'pointer';
        }

        if (leftScrollIndex >= leftPhotos.length - 7) {
            bottomBtn.style.opacity = '0.5';
            bottomBtn.style.cursor = 'not-allowed';
        } else {
            bottomBtn.style.opacity = '1';
            bottomBtn.style.cursor = 'pointer';
        }
    }

    // ===== ФУНКЦИИ ДЛЯ ОКНА ТЕЛЕФОНА =====
    function openOverlay() {
        showPhoneNumber__overlay.classList.add('show-phone-number__overlay-active');
        showPhoneNumber.classList.add('visible');

        showPhoneNumber__top.classList.remove('animate-out');
        showPhoneNumber__bottom.classList.remove('animate-out');
        showPhoneNumber__top.classList.add('animate-in');

        setTimeout(() => {
            showPhoneNumber__bottom.classList.add('animate-in');
        }, 300);
    }

    function closeOverlay() {
        showPhoneNumber__top.classList.remove('animate-in');
        showPhoneNumber__bottom.classList.remove('animate-in');
        showPhoneNumber__top.classList.add('animate-out');
        showPhoneNumber__bottom.classList.add('animate-out');
        showPhoneNumber.classList.remove('visible');

        setTimeout(() => {
            showPhoneNumber__overlay.classList.remove('show-phone-number__overlay-active');
        }, 300);
    }

    // ===== ОБРАБОТЧИКИ СОБЫТИЙ ДЛЯ ГЛАВНОГО ФОТО =====
    leftArrow.addEventListener('click', () => {
        photoIndex = (photoIndex > 0) ? photoIndex - 1 : photoSources.length - 1;
        updateMainPhoto(photoIndex);
    });

    rightArrow.addEventListener('click', () => {
        photoIndex = (photoIndex < photoSources.length - 1) ? photoIndex + 1 : 0;
        updateMainPhoto(photoIndex);
    });

    mainPhotoContainer?.addEventListener('mouseover', showButtonsOnMainPhoto);
    mainPhotoContainer?.addEventListener('mouseleave', closeButtonsOnMainPhoto);

    advertisementAboutRight__additionallyPhoto.addEventListener('mouseover', function(event) {
        const elem = event.target.closest('.advertisement-about-right-additionally-photo__block');
        if (elem) {
            const hoveredImg = elem.querySelector('img');
            if (hoveredImg) {
                mainPhotoImg.src = hoveredImg.src;
            }
        }
    });

    // ===== ОБРАБОТЧИКИ СОБЫТИЙ ДЛЯ МОДАЛЬНОГО ОКНА ФОТО =====
    advertisementAbout__right.addEventListener('click', (event) => {
        const isLeftArrow = event.target.closest('.advertisement-about-right-main-photo__left-arrow');
        const isRightArrow = event.target.closest('.advertisement-about-right-main-photo__right-arrow');
        if (!isLeftArrow && !isRightArrow) {
            carPhoto__modal.classList.add('car-photo__modal-active');
            // Инициализируем видимость кнопок при открытии модалки
            setTimeout(updateLeftButtonsVisibility, 100);
        }
    });

    carPhotoModal__closeBtn.addEventListener('click', () => {
        carPhoto__modal.classList.remove('car-photo__modal-active');
    });

    leftPhotos.forEach((photo, index) => {
        photo.addEventListener('click', () => {
            middleIndex = index;
            scrollMiddleTo(middleIndex);
        });
    });

    topBtn.addEventListener('click', () => {
        if (leftPhotos.length > 7 && leftScrollIndex > 0) {
            scrollLeftPhotos('up');
        }
    });

    bottomBtn.addEventListener('click', () => {
        if (leftPhotos.length > 7 && leftScrollIndex < leftPhotos.length - 7) {
            scrollLeftPhotos('down');
        }
    });

    // Прокрутка левой колонки колесом мыши
    leftPhotosContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (leftPhotos.length > 7) {
            if (e.deltaY > 0 && leftScrollIndex < leftPhotos.length - 7) {
                scrollLeftPhotos('down');
            } else if (e.deltaY < 0 && leftScrollIndex > 0) {
                scrollLeftPhotos('up');
            }
        }
    }, { passive: false });

    middleContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0 && middleIndex < middleImages.length - 1) {
            middleIndex++;
        } else if (e.deltaY < 0 && middleIndex > 0) {
            middleIndex--;
        }
        scrollMiddleTo(middleIndex);
    }, { passive: false });

    // ===== ОБРАБОТЧИКИ СОБЫТИЙ ДЛЯ ТЕЛЕФОНА =====
    advertisementContacts__phone.addEventListener('click', function(event) {
        openOverlay();
        event.currentTarget.innerHTML = `
            <div class="advertisement-contacts-phone__left">
                <h5>+375-(33)-333-33-02</h5>
                <p>Круглосуточно</p>
            </div>
        `;
        event.currentTarget.style.background = '#fff';
        event.currentTarget.style.color = 'black';
        const el = event.currentTarget.querySelector('.advertisement-contacts-phone__left h5');
        el.style.fontWeight = 'bold';
    });

    showPhoneNumber__overlay.addEventListener('click', function(event) {
        if (event.target === showPhoneNumber__overlay) {
            closeOverlay();
        }
    });

    overlayCloseBtn?.addEventListener('click', closeOverlay);

    showPhoneNumberTop__firstBlock.classList.add('show-phone-number-top-first-block-active');
    
    showPhoneNumberTop__btn.addEventListener('click', function() {
        showPhoneNumberTop__firstBlock.classList.toggle('show-phone-number-top-first-block-active');
        showPhoneNumberTop__secondBock.classList.toggle('show-phone-number-top__second-block-active');
    });

    showPhoneNumberTopSecondBlock__back.addEventListener('click', function() {
        showPhoneNumberTop__firstBlock.classList.toggle('show-phone-number-top-first-block-active');
        showPhoneNumberTop__secondBock.classList.toggle('show-phone-number-top__second-block-active');
    });

    // Инициализация при загрузке
    updateLeftButtonsVisibility();
});