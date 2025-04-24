// Criar ou abrir o banco IndexedDB
let db;

const request = indexedDB.open('PesquisaDB', 1);

request.onupgradeneeded = function(e) {
  db = e.target.result;
  if (!db.objectStoreNames.contains('responses')) {
    db.createObjectStore('responses', { keyPath: 'id', autoIncrement: true });
  }
};

request.onsuccess = function(e) {
  db = e.target.result;
};

request.onerror = function(e) {
  console.log('Erro ao abrir IndexedDB', e);
};

// Função para salvar os dados no IndexedDB
function saveToIndexedDB(username, dataHora, bairro, veiculo, condicionalInput) {
  const transaction = db.transaction(['responses'], 'readwrite');
  const store = transaction.objectStore('responses');
  const data = {
    username: username,
    dataHora: dataHora,
    bairro: bairro,
    veiculo: veiculo,
    condicionalInput: condicionalInput
  };
  store.add(data);
}

// Função para exportar os dados para CSV
function exportCSV() {
  const transaction = db.transaction(['responses'], 'readonly');
  const store = transaction.objectStore('responses');
  const request = store.getAll();

  request.onsuccess = function(e) {
    const data = e.target.result;
    let csvContent = "data:text/csv;charset=utf-8,";

    data.forEach(function(row) {
      const rowArray = [row.username, row.dataHora, row.bairro, row.veiculo, row.condicionalInput];
      csvContent += rowArray.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dados_usuario.csv");
    link.click();
  };
}
