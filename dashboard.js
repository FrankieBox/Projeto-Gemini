document.addEventListener('DOMContentLoaded', () => {
    const addUserButton = document.querySelector('.add-user-btn');
    const userTable = document.querySelector('.table-container');
    const userForm = document.getElementById('add-user-form');

    if (addUserButton && userTable && userForm) {
        addUserButton.addEventListener('click', () => {
            userTable.style.display = 'none';
            userForm.style.display = 'block';
        });
    }
});...
