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

// Exemplo de ação para o botão de acessar
document.getElementById('acessarBtn').addEventListener('click', function() {
  alert("Você clicou no botão de acessar!");
});
