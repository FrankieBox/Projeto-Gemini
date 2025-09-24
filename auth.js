document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Tentando logar com:', { email, password });

        try {
            const response = await new Promise(resolve => setTimeout(() => {
                if (email === 'admin@gemini.com' && password === '123456') {
                    resolve({ status: 200, json: () => ({ success: true, token: 'fake_jwt_token' }) });
                } else {
                    resolve({ status: 401, json: () => ({ success: false, message: 'Credenciais inválidas.' }) });
                }
            }, 1500));

            if (response.status === 200) {
                const data = await response.json();
                console.log('Login bem-sucedido:', data);
                localStorage.setItem('authToken', data.token); 
                
                window.location.href = 'dashboard.html';
            } else {
                const errorData = await response.json();
                console.error('Falha no login:', errorData.message);
                alert('Falha no login: ' + errorData.message);
            }
        } catch (error) {
            console.error('Erro de rede ou de servidor:', error);
            alert('Não foi possível conectar ao servidor. Tente novamente.');
        }
    });
});
