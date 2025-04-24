const app = document.getElementById('app');

let entrevistador = localStorage.getItem('entrevistador') || null;
let totalEntrevistas = 0;
let restantes = 0;
let entrevistasFeitas = 0;

function salvarEntrevistador(nome) {
  localStorage.setItem('entrevistador', nome);
  entrevistador = nome;
}

function salvarMetaEntrevistas(qtd) {
  totalEntrevistas = parseInt(qtd);
  restantes = totalEntrevistas;
  entrevistasFeitas = 0;
  localStorage.setItem('metaEntrevistas', qtd);
  localStorage.setItem('entrevistasFeitas', 0);
  localStorage.setItem('entrevistasRestantes', qtd);
}

function atualizarContadores() {
  entrevistasFeitas = parseInt(localStorage.getItem('entrevistasFeitas')) || 0;
  restantes = parseInt(localStorage.getItem('entrevistasRestantes')) || 0;
}

function renderNomeEntrevistador() {
  app.innerHTML = \`
    <h3>Informe seu nome</h3>
    <input type="text" class="form-control mb-3" id="nomeEntrevistador" />
    <button class="btn btn-primary" onclick="continuarComNome()">Continuar</button>
  \`;
}

function continuarComNome() {
  const nome = document.getElementById('nomeEntrevistador').value.trim();
  if (nome) {
    salvarEntrevistador(nome);
    renderOpcoesIniciais();
  }
}

function renderOpcoesIniciais() {
  atualizarContadores();
  app.innerHTML = \`
    <h4>Olá, \${entrevistador}</h4>
    <p>Entrevistas feitas até agora: <strong>\${entrevistasFeitas}</strong></p>
    <button class="btn btn-success me-2" onclick="definirQuantidade()">Iniciar entrevistas</button>
  \`;
}

function definirQuantidade() {
  app.innerHTML = \`
    <h4>Quantas entrevistas você fará?</h4>
    <input type="number" class="form-control mb-3" id="quantidade" />
    <button class="btn btn-primary" onclick="salvarQuantidade()">Confirmar</button>
  \`;
}

function salvarQuantidade() {
  const qtd = document.getElementById('quantidade').value;
  if (qtd > 0) {
    salvarMetaEntrevistas(qtd);
    iniciarEntrevista();
  }
}

function iniciarEntrevista() {
  let respostas = {};
  let perguntaAtual = 0;

  const perguntas = [
    { tipo: "texto", pergunta: "Qual seu nome?", chave: "nome" },
    { tipo: "radio", pergunta: "Qual seu sexo?", chave: "sexo", opcoes: ["Masculino", "Feminino"] }
  ];

  renderPergunta();

  function renderPergunta() {
    const p = perguntas[perguntaAtual];
    let html = \`<h5>Pergunta \${perguntaAtual + 1} de \${perguntas.length}</h5><h4>\${p.pergunta}</h4>\`;

    if (p.tipo === "texto") {
      html += \`<input type="text" class="form-control mb-3" id="resposta" />\`;
    } else if (p.tipo === "radio") {
      html += p.opcoes.map(opcao => \`
        <div class="form-check">
          <input class="form-check-input" type="radio" name="resposta" value="\${opcao}" id="\${opcao}">
          <label class="form-check-label" for="\${opcao}">\${opcao}</label>
        </div>
      \`).join('');
    }

    html += \`
      <div class="mt-3">
        <button class="btn btn-danger me-2" onclick="cancelarEntrevista()">Cancelar</button>
        <button class="btn btn-primary" id="btnProximo" disabled>Próximo</button>
      </div>
    \`;

    app.innerHTML = html;

    const btnProximo = document.getElementById('btnProximo');
    const entrada = document.getElementById('resposta') || document.querySelector('input[name="resposta"]');

    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        btnProximo.disabled = !inputValido();
      });
      input.addEventListener('change', () => {
        btnProximo.disabled = !inputValido();
      });
    });

    btnProximo.addEventListener('click', () => {
      respostas[p.chave] = p.tipo === "texto"
        ? document.getElementById('resposta').value
        : document.querySelector('input[name="resposta"]:checked')?.value;

      perguntaAtual++;
      if (perguntaAtual < perguntas.length) {
        renderPergunta();
      } else {
        salvarEntrevista(respostas);
      }
    });
  }
}

function salvarEntrevista(respostas) {
  const dados = JSON.parse(localStorage.getItem('dadosEntrevistas') || "[]");
  dados.push({
    entrevistador,
    respostas,
    data: new Date().toISOString()
  });

  localStorage.setItem('dadosEntrevistas', JSON.stringify(dados));

  entrevistasFeitas++;
  restantes--;
  localStorage.setItem('entrevistasFeitas', entrevistasFeitas);
  localStorage.setItem('entrevistasRestantes', restantes);

  renderOpcoesIniciais();
}

function cancelarEntrevista() {
  if (confirm("Tem certeza que deseja cancelar esta entrevista?")) {
    renderOpcoesIniciais();
  }
}

if (!entrevistador) {
  renderNomeEntrevistador();
} else {
  renderOpcoesIniciais();
}