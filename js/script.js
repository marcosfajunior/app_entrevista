function entrar() {
  const nome = document.getElementById('username').value;
  localStorage.setItem('nomeUsuario', nome);
  window.location.href = 'pagina.html';
}

function abrirModal() {
  document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

window.onload = function() {
  const span = document.getElementById('nomeUsuario');
  if (span) {
    span.textContent = localStorage.getItem('nomeUsuario') || 'usuário';
  }
};
