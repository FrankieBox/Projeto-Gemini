document.addEventListener('DOMContentLoaded', () => {
    const addUserButton = document.querySelector('.add-user-btn');
    const userTable = document.querySelector('.table-container');

    if (addUserButton && userTable) {
        addUserButton.addEventListener('click', () => {
            userTable.style.display = 'none';
            // Em seguida, criaremos um formulário para aparecer aqui
            document.body.innerHTML += '<h2>Formulário de cadastro aqui</h2>';
        });
    }
});
