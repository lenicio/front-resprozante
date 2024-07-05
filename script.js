document.addEventListener('DOMContentLoaded', function () {
  listarPratos();

})



function listarPratos() {
  fetch('http://127.0.0.1:8080/restaurante/pratos')
    .then(response => response.json())
    .then(data => {
      const pratosTableBody = document.getElementById('pratosTableBody');
      pratosTableBody.innerHTML = '';

      data.forEach(prato => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${prato.nome}</td>
                <td>${prato.valor}</td>
                <td>${prato.tipoPrato}</td>
                <td>
                <button type="button" class="btn btn-primary btn-sm" onclick="preencherFormulario(${prato.id})">Editar</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="excluirPrato(${prato.id})">Excluir</button>
                </td>
            `;

        pratosTableBody.appendChild(row);
      });
    })
}


document.getElementById('addPratoForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const pratoId = document.getElementById('pratoId').value;

  if(!pratoId) {
    adicionarPrato();
  } else {
    editarPrato(pratoId);
  }
});


function adicionarPrato() {
  const nome = document.getElementById('nome').value;
  const valor = document.getElementById('valor').value;
  const tipoPrato = document.getElementById('tipoPrato').value;

  fetch('http://127.0.0.1:8080/restaurante/prato', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({nome, valor, tipoPrato})
  })
  .then(response => response.json())
  .then(data => {
    alert('Prato adicionado com sucesso!');
    document.getElementById('addPratoForm').reset();
    listarPratos();
  })
}


function preencherFormulario(id) {
  fetch(`http://127.0.0.1:8080/restaurante/prato?id=${id}`)
  .then(response => response.json())
  .then(prato => {
    document.getElementById('pratoId').value = prato.id;
    document.getElementById('nome').value = prato.nome;
    document.getElementById('valor').value = prato.valor;
    document.getElementById('tipoPrato').value = prato.tipoPrato;
  })
}


function editarPrato(id) {
  const nome = document.getElementById('nome').value;
  const valor = document.getElementById('valor').value;
  const tipoPrato = document.getElementById('tipoPrato').value;

  fetch(`http://127.0.0.1:8080/restaurante/prato?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({nome, valor, tipoPrato})
  })
  .then(response => {
    if(response.ok) {
      alert('Prato editado com sucesso!');
      document.getElementById('addPratoForm').reset();
      document.getElementById('pratoId').value = '';
      listarPratos();
    }
  })
}


function excluirPrato(id) {
  // Para concatenar string com variavel, use à crase
  fetch(`http://127.0.0.1:8080/restaurante/prato?id=${id}`, {
    method: "DELETE"
  })
  .then(response => {
    if (response.ok) {
      alert("Prato excluido com sucesso!");
      listarPratos();
    }
  })
}
