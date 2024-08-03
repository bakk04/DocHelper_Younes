const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

function activateContainer() {
    container.classList.add("active");
}

function deactivateContainer() {
    container.classList.remove("active");
}

registerBtn.addEventListener('click', activateContainer);
loginBtn.addEventListener('click', deactivateContainer);
