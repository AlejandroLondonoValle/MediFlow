// Lógica para el Dark Mode
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Revisar preferencia local
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

themeToggleBtn.addEventListener('click', function() {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

// Lógica de Autenticación
const loginForm = document.getElementById('login-form');
const btnSubmit = document.getElementById('btn-submit');
const API_URL = 'http://localhost:4000/api'; // Asegúrate de que este es el puerto de tu backend

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // UI Feedback (Loading)
    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Procesando...';
    btnSubmit.disabled = true;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Solo guardamos el token. El rol ya no se expone aquí.
            localStorage.setItem('mediflow_token', data.token);
            localStorage.removeItem('mediflow_rol'); // Limpiamos por si acaso quedó basura
            
            Swal.fire({
                title: '¡Bienvenido!',
                text: 'Has iniciado sesión correctamente.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: htmlElement.classList.contains('dark') ? '#1f2937' : '#fff',
                color: htmlElement.classList.contains('dark') ? '#fff' : '#1f2937',
            }).then(() => {
                window.location.href = './dashboard.html';
            });
        } else {
            throw new Error(data.message || 'Error en las credenciales');
        }
    } catch (error) {
        Swal.fire({
            title: 'Error de acceso',
            text: error.message,
            icon: 'error',
            background: htmlElement.classList.contains('dark') ? '#1f2937' : '#fff',
            color: htmlElement.classList.contains('dark') ? '#fff' : '#1f2937',
        });
    } finally {
        // Restaurar botón
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
    }
});
