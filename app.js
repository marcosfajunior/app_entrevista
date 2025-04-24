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

// Função para gerar e exportar o CSV
function exportCSV() {
  const username = localStorage.getItem('username');
  const date = new Date().toLocaleString();
  const data = [
    ['Nome do Usuário', 'Data e Hora'],
    [username, date]
  ];

  let csvContent = "data:text/csv;charset=utf-8,";

  data.forEach((rowArray) => {
    let row = rowArray.join(",");
    csvContent += row + "\r\n"; // add carriage return to create new row
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "dados_usuario.csv");
  link.click();
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
