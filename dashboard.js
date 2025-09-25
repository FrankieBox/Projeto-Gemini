document.addEventListener('DOMContentLoaded', () => {
    const addUserButton = document.querySelector('.add-user-btn');
    const userTableContainer = document.querySelector('.table-container');
    const userFormContainer = document.getElementById('add-user-form');
    const backToTableBtn = userFormContainer.querySelector('.back-to-table-btn');
    const submitFormBtn = document.getElementById('submit-form-btn');
    const userTableBody = document.querySelector('tbody');
    const fullNameInput = document.getElementById('full-name');
    const emailAddressInput = document.getElementById('email-address');
    const statusToggleBtn = document.getElementById('status-toggle-btn');

    let users = [];
    let editingId = null;

    // Função para carregar usuários do localStorage
    const loadUsers = () => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            users = JSON.parse(storedUsers);
        } else {
            // Dados de demonstração
            users = [
                { id: 101, fullName: 'Ana Silva', email: 'ana.silva@email.com', status: 'Ativo' },
                { id: 102, fullName: 'Carlos Rodrigues', email: 'carlos.r@email.com', status: 'Inativo' }
            ];
            localStorage.setItem('users', JSON.stringify(users));
        }
    };

    // Função para renderizar a tabela com os usuários
    const renderTable = () => {
        userTableBody.innerHTML = '';
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

    // Função para alternar a exibição entre a tabela e o formulário
    const togglePanel = (showForm) => {
        userTableContainer.style.display = showForm ? 'none' : 'block';
        userFormContainer.style.display = showForm ? 'block' : 'none';
    };

    // Evento de clique para o botão "Adicionar Novo Usuário"
    addUserButton.addEventListener('click', () => {
        togglePanel(true);
        submitFormBtn.textContent = 'Salvar Usuário';
        fullNameInput.value = '';
        emailAddressInput.value = '';
        statusToggleBtn.textContent = 'Ativo';
        statusToggleBtn.classList.remove('inactive');
        statusToggleBtn.classList.add('active');
        editingId = null;
    });

    // Evento de clique para alternar o status
    statusToggleBtn.addEventListener('click', () => {
        if (statusToggleBtn.textContent === 'Ativo') {
            statusToggleBtn.textContent = 'Inativo';
            statusToggleBtn.classList.remove('active');
            statusToggleBtn.classList.add('inactive');
        } else {
            statusToggleBtn.textContent = 'Ativo';
            statusToggleBtn.classList.remove('inactive');
            statusToggleBtn.classList.add('active');
        }
    });

    // Evento de clique para o botão "Salvar"
    submitFormBtn.addEventListener('click', () => {
        const fullName = fullNameInput.value.trim();
        const emailAddress = emailAddressInput.value.trim();
        const status = statusToggleBtn.textContent;

        if (fullName === '' || emailAddress === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (editingId !== null) {
            const userIndex = users.findIndex(user => user.id === editingId);
            if (userIndex !== -1) {
                users[userIndex].fullName = fullName;
                users[userIndex].email = emailAddress;
                users[userIndex].status = status;
            }
        } else {
            const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 101;
            const newUser = {
                id: newUserId,
                fullName: fullName,
                email: emailAddress,
                status: status
            };
            users.push(newUser);
        }

        localStorage.setItem('users', JSON.stringify(users));
        renderTable();
        togglePanel(false);
    });

    // Evento de clique na tabela (para editar e excluir)
    userTableBody.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('delete-btn')) {
            const userId = parseInt(target.getAttribute('data-id'));
            users = users.filter(user => user.id !== userId);
            localStorage.setItem('users', JSON.stringify(users));
            renderTable();
        } else if (target.classList.contains('edit-btn')) {
            const userId = parseInt(target.getAttribute('data-id'));
            const userToEdit = users.find(user => user.id === userId);

            if (userToEdit) {
                togglePanel(true);
                fullNameInput.value = userToEdit.fullName;
                emailAddressInput.value = userToEdit.email;
                submitFormBtn.textContent = 'Salvar Edição';
                editingId = userId;
                
                if (userToEdit.status === 'Ativo') {
                    statusToggleBtn.textContent = 'Ativo';
                    statusToggleBtn.classList.remove('inactive');
                    statusToggleBtn.classList.add('active');
                } else {
                    statusToggleBtn.textContent = 'Inativo';
                    statusToggleBtn.classList.remove('active');
                    statusToggleBtn.classList.add('inactive');
                }
            }
        }
    });

    // Evento de clique para o botão "Voltar para Tabela"
    backToTableBtn.addEventListener('click', () => {
        togglePanel(false);
        editingId = null;
        renderTable();
    });

    // Inicia o carregamento e renderização
    loadUsers();
    renderTable();
});
