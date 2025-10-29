class NewsDetail {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalClose = document.getElementById('modalClose');
        this.modalPrev = document.getElementById('modalPrev');
        this.modalNext = document.getElementById('modalNext');
        this.zoomBtn = document.getElementById('zoomBtn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.socialButtons = document.querySelectorAll('.social-btn');
        this.commentForm = document.getElementById('commentForm');
        
        this.currentImageIndex = 0;
        this.images = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.collectImages();
        this.setupSocialSharing();
        this.setupComments();
    }
    
    setupEventListeners() {
        // Zoom button
        if (this.zoomBtn) {
            this.zoomBtn.addEventListener('click', () => {
                this.openModal(0);
            });
        }
        
        // Gallery items
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openModal(index + 1); // +1 because main image is index 0
            });
        });
        
        // Modal controls
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalPrev.addEventListener('click', () => this.navigateImage(-1));
        this.modalNext.addEventListener('click', () => this.navigateImage(1));
        
        // Close modal on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.navigateImage(-1);
                        break;
                    case 'ArrowRight':
                        this.navigateImage(1);
                        break;
                }
            }
        });
    }
    
    collectImages() {
        // Main news image
        const mainImage = document.getElementById('mainNewsImage');
        if (mainImage) {
            this.images.push(mainImage.src);
        }
        
        // Gallery images
        this.galleryItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                this.images.push(img.dataset.fullsize || img.src);
            }
        });
    }
    
    openModal(index) {
        this.currentImageIndex = index;
        this.modalImage.src = this.images[index];
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons visibility
        this.updateNavigation();
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    navigateImage(direction) {
        this.currentImageIndex += direction;
        
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.images.length - 1;
        } else if (this.currentImageIndex >= this.images.length) {
            this.currentImageIndex = 0;
        }
        
        this.modalImage.src = this.images[this.currentImageIndex];
        this.updateNavigation();
    }
    
    updateNavigation() {
        // Show/hide navigation buttons based on image count
        if (this.images.length <= 1) {
            this.modalPrev.style.display = 'none';
            this.modalNext.style.display = 'none';
        } else {
            this.modalPrev.style.display = 'block';
            this.modalNext.style.display = 'block';
        }
    }
    
    setupSocialSharing() {
        this.socialButtons.forEach(button => {
            button.addEventListener('click', () => {
                const platform = button.dataset.share;
                this.shareNews(platform);
            });
        });
    }
    
    shareNews(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        const text = encodeURIComponent(document.querySelector('.news-excerpt')?.textContent || '');
        
        let shareUrl = '';
        
        switch(platform) {
            case 'vk':
                shareUrl = `https://vk.com/share.php?url=${url}&title=${title}&comment=${text}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${title}%20${url}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }
    
    setupComments() {
        if (this.commentForm) {
            this.commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitComment();
            });
        }
    }
    
    submitComment() {
        const textarea = this.commentForm.querySelector('textarea');
        const comment = textarea.value.trim();
        
        if (!comment) {
            this.showMessage('Пожалуйста, введите комментарий', 'error');
            return;
        }
        
        // Здесь будет AJAX запрос к серверу
        console.log('Отправка комментария:', comment);
        
        // Имитация успешной отправки
        this.showMessage('Комментарий успешно отправлен', 'success');
        textarea.value = '';
        
        // В реальном приложении здесь будет обновление списка комментариев
    }
    
    showMessage(message, type) {
        // Создаем элемент для сообщения
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transition: all 0.3s ease;
        `;
        
        if (type === 'success') {
            messageEl.style.background = '#4CAF50';
        } else {
            messageEl.style.background = '#f44336';
        }
        
        document.body.appendChild(messageEl);
        
        // Удаляем сообщение через 3 секунды
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }
    
    // Метод для загрузки комментариев (будет вызываться при загрузке страницы)
    loadComments() {
        // Здесь будет AJAX запрос для загрузки комментариев
        console.log('Загрузка комментариев...');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new NewsDetail();
});

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading для изображений
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}