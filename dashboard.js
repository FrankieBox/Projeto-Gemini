document.addEventListener('DOMContentLoaded', () => {
    const addUserButton = document.querySelector('.add-user-btn');
    const userTable = document.querySelector('.table-container');
    const userForm = document.getElementById('add-user-form');
    const submitFormBtn = document.getElementById('submit-form-btn');
    const userTableBody = document.querySelector('tbody');
    const fullNameInput = document.getElementById('full-name');
    const emailAddressInput = document.getElementById('email-address');

    // Botão de voltar para a tabela
    const backToTableBtn = document.createElement('button');
    backToTableBtn.textContent = 'Voltar para Tabela';
    backToTableBtn.style.cssText = 'background-color: #f44336; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; margin-top: 10px;';
    userForm.insertBefore(backToTableBtn, userForm.firstChild);

    let users = [];
    let editingId = null;

    // Função para carregar usuários do localStorage
    const loadUsers = () => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            users = JSON.parse(storedUsers);
        } else {
            // Dados de teste se não houverem usuários salvos
            users = [
                { id: 101, fullName: 'Ana Silva', email: 'ana.silva@email.com', status: 'Ativo' },
                { id: 102, fullName: 'Carlos Rodrigues', email: 'carlos.r@email.com', status: 'Inativo' }
            ];
            localStorage.setItem('users', JSON.stringify(users));
        }
    };
    
    // Função para renderizar a tabela
    const renderTable = () => {
        userTableBody.innerHTML = ''; // Limpa a tabela
        users.forEach(user => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td data-label="ID">${user.id}</td>
                <td data-label="Nome Completo">${user.fullName}</td>
                <td data-label="E-mail">${user.email}</td>
                <td data-label="Status"><span class="status-badge ${user.status.toLowerCase()}">${user.status}</span></td>
                <td data-label="Ações">
                    <button class="action-btn edit-btn" data-id="${user.id}">Editar</button>
                    <button class="action-btn delete-btn" data-id="${user.id}">Excluir</button>
                </td>
            `;
            userTableBody.appendChild(newRow);
        });
    };

    loadUsers(); // Carrega os usuários ao iniciar
    renderTable(); // Renderiza a tabela inicial

    // Mostra o formulário de cadastro e esconde a tabela
    if (addUserButton && userTable && userForm) {
        addUserButton.addEventListener('click', () => {
            userTable.style.display = 'none';
            userForm.style.display = 'block';
            submitFormBtn.textContent = 'Salvar Usuário';
            fullNameInput.value = '';
            emailAddressInput.value = '';
            editingId = null; // Reinicia o ID de edição
        });
    }

    // Lida com o envio do formulário
    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', () => {
            const fullName = fullNameInput.value;
            const emailAddress = emailAddressInput.value;

            if (fullName.trim() === '' || emailAddress.trim() === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            if (editingId !== null) {
                // Lógica de edição
                const userIndex = users.findIndex(user => user.id === editingId);
                if (userIndex !== -1) {
                    users[userIndex].fullName = fullName;
                    users[userIndex].email = emailAddress;
                }
            } else {
                // Lógica de novo usuário
                const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 101;
                const newUser = {
                    id: newUserId,
                    fullName: fullName,
                    email: emailAddress,
                    status: 'Ativo'
                };
                users.push(newUser);
            }

            localStorage.setItem('users', JSON.stringify(users)); // Salva os dados
            renderTable();

            userForm.style.display = 'none';
            userTable.style.display = 'block';
        });
    }

    // Lógica para os botões de Editar e Excluir
    if (userTableBody) {
        userTableBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) {
                const userId = parseInt(event.target.getAttribute('data-id'));
                users = users.filter(user => user.id !== userId);
                localStorage.setItem('users', JSON.stringify(users)); // Salva os dados
                renderTable();
            } else if (event.target.classList.contains('edit-btn')) {
                const userId = parseInt(event.target.getAttribute('data-id'));
                const userToEdit = users.find(user => user.id === userId);

                if (userToEdit) {
                    fullNameInput.value = userToEdit.fullName;
                    emailAddressInput.value = userToEdit.email;
                    submitFormBtn.textContent = 'Salvar Edição';
                    
                    userTable.style.display = 'none';
                    userForm.style.display = 'block';
                    editingId = userId;
                }
            }
        });
    }

    // Lida com o clique no botão de voltar
    if (backToTableBtn) {
        backToTableBtn.addEventListener('click', () => {
            userForm.style.display = 'none';
            userTable.style.display = 'block';
            renderTable(); // Recarrega a tabela para garantir que esteja atualizada
        });
    }
});
