document.addEventListener('DOMContentLoaded', () => {
    const addUserButton = document.querySelector('.add-user-btn');
    const userTable = document.querySelector('.table-container');
    const userForm = document.getElementById('add-user-form');
    const submitFormBtn = document.getElementById('submit-form-btn');
    const userTableBody = document.querySelector('tbody');
    const fullNameInput = document.getElementById('full-name');
    const emailAddressInput = document.getElementById('email-address');

    // Mostra o formulário de cadastro e esconde a tabela
    if (addUserButton && userTable && userForm) {
        addUserButton.addEventListener('click', () => {
            userTable.style.display = 'none';
            userForm.style.display = 'block';
        });
    }

    // Lida com o envio do formulário
    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', () => {
            const fullName = fullNameInput.value;
            const emailAddress = emailAddressInput.value;

            // Verifica se os campos não estão vazios
            if (fullName.trim() === '' || emailAddress.trim() === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Cria um ID de usuário simples
            const newUserId = userTableBody.rows.length + 101; 

            // Cria a nova linha da tabela com os dados do formulário
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td data-label="ID">${newUserId}</td>
                <td data-label="Nome Completo">${fullName}</td>
                <td data-label="E-mail">${emailAddress}</td>
                <td data-label="Status"><span class="status-badge active">Ativo</span></td>
                <td data-label="Ações">
                    <button class="action-btn">Editar</button>
                    <button class="action-btn">Excluir</button>
                </td>
            `;
            
            // Adiciona a nova linha à tabela
            userTableBody.appendChild(newRow);

            // Esconde o formulário e mostra a tabela novamente
            userForm.style.display = 'none';
            userTable.style.display = 'block';

            // Limpa os campos do formulário
            fullNameInput.value = '';
            emailAddressInput.value = '';
        });
    }
});
