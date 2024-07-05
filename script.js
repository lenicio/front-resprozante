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
                <td><button type="button" class="btn btn-danger btn-sm" onclick="excluirPrato(${prato.id})">Excluir</button></td>
            `;

        pratosTableBody.appendChild(row);
      });
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


document.getElementById('addPratoForm').addEventListener('submit', function (event) {
  event.preventDefault();

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


});

