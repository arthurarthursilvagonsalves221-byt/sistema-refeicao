/* ==========================================
   IMPORTAÇÃO DE ARQUIVOS
========================================== */

function importarArquivo(idInput, tipoArquivo) {

    const arquivo =
        document.getElementById(idInput).files[0];

    if (!arquivo) {

        alert(
            `Selecione um ${tipoArquivo}.`
        );

        return;
    }

    alert(
        `${tipoArquivo} importado: ${arquivo.name}`
    );
}