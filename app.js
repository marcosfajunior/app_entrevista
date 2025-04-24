// Registrar o Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.log('Erro ao registrar o Service Worker:', error);
      });
  });
}

// Função para mostrar o modal
function showModal() {
  $('#exampleModal').modal('show');
}

// Função para gerar e compartilhar o CSV
function exportCSV() {
  const username = localStorage.getItem('username');
  const date = new Date().toLocaleString();
  const csvContent = `Nome do Usuário,Data e Hora\n${username},${date}\n`;
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const file = new File([blob], 'dados_usuario.csv', { type: 'text/csv' });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    navigator.share({
      title: 'Dados do Usuário',
      text: 'Segue os dados exportados do PWA.',
      files: [file]
    }).catch(error => console.error('Erro ao compartilhar:', error));
  } else {
    alert('Seu navegador não suporta compartilhamento de arquivos.');
  }
}

// Captura do evento de "Acessar"
document.getElementById('acessarBtn').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  if (username) {
    localStorage.setItem('username', username);  // Armazena o nome do usuário no localStorage
    window.location.href = 'segunda-pagina.html';  // Redireciona para a segunda página
  } else {
    alert('Por favor, digite seu nome!');
  }
});
