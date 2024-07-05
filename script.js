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
            `;

            pratosTableBody.appendChild(row);
        });
    })
}