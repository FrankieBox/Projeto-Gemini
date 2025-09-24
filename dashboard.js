document.addEventListener('DOMContentLoaded', () => {
    const addUserButton = document.querySelector('.add-user-btn');
    const userTable = document.querySelector('.table-container');
    const userForm = document.getElementById('add-user-form');
    const submitFormBtn = document.getElementById('submit-form-btn');
    const userTableBody = document.querySelector('tbody');
    const fullNameInput = document.getElementById('full-name');
    const emailAddressInput = document.getElementById('email-address');

    // Novo: Botão de voltar para a tabela
    const backToTableBtn = document.createElement('button');
    backToTableBtn.textContent = 'Voltar para Tabela';
    backToTableBtn.style.cssText = 'background-color: #f44336; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; margin-top: 10px;';
    userForm.insertBefore(backToTableBtn, userForm.firstChild);

    // Mostra o formulário de cadastro e esconde a tabela
    if (addUserButton && userTable && userForm) {
        addUserButton.addEventListener('click', () => {
            userTable.style.display = 'none';
            userForm.style.display = 'block';
            userForm.reset();
            submitFormBtn.textContent = 'Salvar Usuário';
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

            const newUserId = userTableBody.rows.length + 101; 
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td data-label="ID">${newUserId}</td>
                <td data-label="Nome Completo">${fullName}</td>
                <td data-label="E-mail">${emailAddress}</td>
                <td data-label="Status"><span class="status-badge active">Ativo</span></td>
                <td data-label="Ações">
                    <button class="action-btn edit-btn">Editar</button>
                    <button class="action-btn delete-btn">Excluir</button>
                </td>
            `;
            
            userTableBody.appendChild(newRow);

            userForm.style.display = 'none';
            userTable.style.display = 'block';

            fullNameInput.value = '';
            emailAddressInput.value = '';
        });
    }

    // Novo: Lógica para os botões de Editar e Excluir
    if (userTableBody) {
        userTableBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) {
                // Remove a linha quando o botão 'Excluir' é clicado
                event.target.closest('tr').remove();
            } else if (event.target.classList.contains('edit-btn')) {
                // Lógica de edição
                const row = event.target.closest('tr');
                const fullName = row.querySelector('td:nth-child(2)').textContent;
                const emailAddress = row.querySelector('td:nth-child(3)').textContent;

                // Preenche o formulário com os dados da linha
                fullNameInput.value = fullName;
                emailAddressInput.value = emailAddress;
                submitFormBtn.textContent = 'Salvar Edição';
                
                // Mostra o formulário e esconde a tabela
                userTable.style.display = 'none';
                userForm.style.display = 'block';

                // Remove a linha antiga (você pode fazer isso de forma mais inteligente depois)
                row.remove();
            }
        });
    }
});
