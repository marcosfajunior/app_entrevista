// Variáveis globais
let userName = localStorage.getItem('username'); // Recupera o nome do usuário
let modalClickTime = null; // Variável para armazenar a data e hora do clique

// Funcionalidade da página inicial
document.getElementById('acessarBtn').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  if (username) {
    localStorage.setItem('username', username);
    window.location.href = 'pagina2.html';  // Navega para a página 2
  } else {
    alert('Por favor, digite seu nome!');
  }
});

// Funcionalidade da página 2 (Modal)
document.getElementById('showModalBtn').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'block';
  modalClickTime = new Date(); // Armazena a data e hora do clique
});

document.getElementById('closeModalBtn').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'none';
  
  // Exibe o botão de exportação após o modal ser fechado
  document.getElementById('exportCSVBtn').style.display = 'inline-block';
});

// Função para exportar os dados para CSV
document.getElementById('exportCSVBtn').addEventListener('click', function() {
  if (modalClickTime) {
    const csvContent = `Nome do Usuário,Data/Hora do Clique
${userName},${modalClickTime.toISOString()}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'exportado.csv';  // Nome do arquivo CSV
    link.click();
  } else {
    alert('O modal não foi clicado ainda!');
  }
});
