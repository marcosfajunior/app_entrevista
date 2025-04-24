if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado:', registration);
      })
      .catch((error) => {
        console.log('Erro ao registrar o Service Worker:', error);
      });
  });
}

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
    csvContent += row + "\r\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "dados_usuario.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", () => {
  const acessarBtn = document.getElementById("acessarBtn");
  if (acessarBtn) {
    acessarBtn.addEventListener("click", () => {
      const username = document.getElementById("username").value;
      if (username) {
        localStorage.setItem("username", username);
        window.location.href = "segunda-pagina.html";
      } else {
        alert("Por favor, digite seu nome!");
      }
    });
  }
});