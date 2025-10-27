document.addEventListener('DOMContentLoaded', function() {
    // Простая валидация паролей (только визуальная обратная связь)
    const passwordInput = document.getElementById('id_password1');
    const confirmPasswordInput = document.getElementById('id_password2');
    
    if (passwordInput && confirmPasswordInput) {
        // Валидация при вводе в поле подтверждения пароля
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== passwordInput.value) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
        
        // Также проверяем при вводе в основное поле пароля
        passwordInput.addEventListener('input', function() {
            if (confirmPasswordInput.value && this.value !== confirmPasswordInput.value) {
                confirmPasswordInput.style.borderColor = '#e74c3c';
            } else if (confirmPasswordInput.value) {
                confirmPasswordInput.style.borderColor = '#27ae60';
            }
        });
    }
    
    // Валидация обязательных полей при потере фокуса
    const authForm = document.querySelector('.auth-form');
    if (authForm) {
        const inputs = authForm.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = '#e74c3c';
                } else {
                    this.style.borderColor = '';
                }
            });
        });
    }
    
    console.log('Registration form loaded successfully');
});