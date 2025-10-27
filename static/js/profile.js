document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items and contents
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('img');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.src = icon.src.replace('eye-open', 'eye-closed');
                icon.alt = 'Скрыть пароль';
            } else {
                input.type = 'password';
                icon.src = icon.src.replace('eye-closed', 'eye-open');
                icon.alt = 'Показать пароль';
            }
        });
    });

    // Password strength indicator
    const passwordInput = document.getElementById('new_password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Update strength bar
            const bar = strengthBar;
            bar.style.width = `${strength.percentage}%`;
            bar.style.backgroundColor = strength.color;
            
            // Update strength text
            strengthText.textContent = strength.text;
            strengthText.style.color = strength.color;
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (!value.startsWith('375')) {
                    value = '375' + value;
                }
                
                let formattedValue = '+' + value.substring(0, 3);
                
                if (value.length > 3) {
                    formattedValue += ' (' + value.substring(3, 5);
                }
                
                if (value.length > 5) {
                    formattedValue += ') ' + value.substring(5, 8);
                }
                
                if (value.length > 8) {
                    formattedValue += '-' + value.substring(8, 10);
                }
                
                if (value.length > 10) {
                    formattedValue += '-' + value.substring(10, 12);
                }
                
                e.target.value = formattedValue;
            }
        });
    }

    // Password confirmation validation
    const confirmPasswordInput = document.getElementById('confirm_password');
    
    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== passwordInput.value) {
                this.style.borderColor = 'var(--color-error)';
            } else {
                this.style.borderColor = 'var(--color-success)';
            }
        });
    }

    // Delete account modal
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const deleteAccountModal = document.getElementById('deleteAccountModal');
    const closeModal = document.querySelector('.close');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');

    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            deleteAccountModal.style.display = 'block';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            deleteAccountModal.style.display = 'none';
        });
    }

    if (cancelDelete) {
        cancelDelete.addEventListener('click', function() {
            deleteAccountModal.style.display = 'none';
        });
    }

    if (confirmDelete) {
        confirmDelete.addEventListener('click', function() {
            // Here you would typically send a request to delete the account
            alert('Запрос на удаление аккаунта отправлен');
            deleteAccountModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === deleteAccountModal) {
            deleteAccountModal.style.display = 'none';
        }
    });

    // Form validation
    const forms = document.querySelectorAll('.profile-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredInputs = this.querySelectorAll('input[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--color-error)';
                    
                    // Show error message
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'Это поле обязательно для заполнения';
                        errorMsg.style.color = 'var(--color-error)';
                        errorMsg.style.fontSize = '12px';
                        errorMsg.style.marginTop = '5px';
                        input.parentNode.appendChild(errorMsg);
                    }
                } else {
                    input.style.borderColor = '';
                    
                    // Remove error message
                    const errorMsg = input.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
                showMessage('Пожалуйста, заполните все обязательные поля', 'error');
            }
        });
    });

    // Helper function to calculate password strength
    function calculatePasswordStrength(password) {
        let score = 0;
        
        if (!password) {
            return {
                percentage: 0,
                color: 'var(--color-light-gray)',
                text: 'Введите пароль'
            };
        }
        
        // Length check
        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 15;
        
        // Character variety
        if (/[a-z]/.test(password)) score += 10;
        if (/[A-Z]/.test(password)) score += 10;
        if (/[0-9]/.test(password)) score += 10;
        if (/[^a-zA-Z0-9]/.test(password)) score += 10;
        
        // Common patterns penalty
        if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
        if (/123|abc|qwe/.test(password.toLowerCase())) score -= 10; // Common sequences
        
        // Ensure score is between 0 and 100
        score = Math.max(0, Math.min(100, score));
        
        // Determine strength level
        if (score < 40) {
            return {
                percentage: score,
                color: 'var(--color-error)',
                text: 'Слабый пароль'
            };
        } else if (score < 70) {
            return {
                percentage: score,
                color: 'var(--color-warning)',
                text: 'Средний пароль'
            };
        } else {
            return {
                percentage: score,
                color: 'var(--color-success)',
                text: 'Надежный пароль'
            };
        }
    }

    // Helper function to show messages
    function showMessage(text, type) {
        // Remove existing custom messages
        const existingMessages = document.querySelectorAll('.custom-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const message = document.createElement('div');
        message.className = `custom-message message ${type}`;
        message.textContent = text;
        
        // Insert message at the top of the form
        const form = document.querySelector('.profile-form');
        if (form) {
            form.insertBefore(message, form.firstChild);
        }
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    // Change avatar functionality
    const changeAvatarBtn = document.querySelector('.change-avatar-btn');
    const avatarInput = document.createElement('input');
    
    if (changeAvatarBtn) {
        avatarInput.type = 'file';
        avatarInput.accept = 'image/*';
        avatarInput.style.display = 'none';
        
        changeAvatarBtn.addEventListener('click', function() {
            avatarInput.click();
        });
        
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Here you would typically upload the file to the server
                const reader = new FileReader();
                reader.onload = function(e) {
                    const avatarImg = document.querySelector('.user-avatar img');
                    avatarImg.src = e.target.result;
                    showMessage('Аватар успешно обновлен', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
        
        document.body.appendChild(avatarInput);
    }
});