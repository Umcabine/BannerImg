document.getElementById('excelFile').addEventListener('change', function (e) {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const tabela = document.getElementById('dadosTabela').getElementsByTagName('tbody')[0];
            tabela.innerHTML = '';

            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const nome = row[0];
                const numero = row[1];
                const status = row[2];

                // Adicione os dados à tabela na página
                const newRow = tabela.insertRow();
                newRow.insertCell(0).textContent = nome;
                newRow.insertCell(1).textContent = numero;
                newRow.insertCell(2).textContent = status;
            }
        };

        reader.readAsArrayBuffer(file);
    }
});

document.getElementById('enviarMensagem').addEventListener('click', function () {
    const tabela = document.getElementById('dadosTabela');
    const numero = tabela.getElementsByTagName('tbody')[0].rows[0].cells[1].textContent; // Número da primeira linha da tabela
    const mensagem = document.getElementById('mensagem').value;

    if (numero && mensagem) {
        const link = `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
        window.open(link, '_blank');
    } else {
        alert('Preencha os campos necessários antes de enviar a mensagem.');
    }
});
