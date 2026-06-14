/* ==========================================
   SISTEMA DE ALIMENTAÇÃO ESCOLAR
   CONTROLE DE ALUNOS E REFEIÇÕES
========================================== */

/* ==========================================
   CARREGAMENTO DE DADOS
========================================== */

let alunos =
    JSON.parse(localStorage.getItem("alunos")) || [];

let historico =
    JSON.parse(localStorage.getItem("historico")) || [];

/* ==========================================
   CONTADORES DE REFEIÇÕES
========================================== */

let cafeManha = 0;
let intervalo945 = 0;
let intervalo1145 = 0;
let intervalo315 = 0;

/* ==========================================
   INICIALIZAÇÃO DO SISTEMA
========================================== */

contabilizarRefeicoes();
atualizarDashboard();

/* ==========================================
   IMPORTAÇÃO DE ALUNOS VIA CSV
========================================== */

function importarCSV() {

    const arquivo =
        document.getElementById("csvAlunos").files[0];

    if (!arquivo) {
        alert("Selecione um arquivo CSV.");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (e) {

        const linhas = e.target.result
            .split("\n")
            .filter(linha => linha.trim() !== "");

        alunos = [];

        linhas.forEach(linha => {

            const dados = linha.split(",");

            if (dados.length >= 3) {

                const id = dados[0].trim();
                const nome = dados[1].trim();
                const turma = dados[2].trim();

                alunos.push({
                    id,
                    codigo: `CAT-${id}`,
                    nome,
                    turma,
                    ativo: true
                });

            }

        });

        localStorage.setItem(
            "alunos",
            JSON.stringify(alunos)
        );

        atualizarDashboard();

        alert(
            `${alunos.length} alunos importados.`
        );
    };

    leitor.readAsText(arquivo, "UTF-8");
}

/* ==========================================
   GERAÇÃO DE QR CODES
========================================== */

function gerarQRCodes() {

    if (alunos.length === 0) {
        alert("Importe os alunos primeiro.");
        return;
    }

    console.clear();

    alunos.forEach(aluno => {

        console.log("Aluno:", aluno.nome);
        console.log("QR:", aluno.codigo);

    });

    alert(
        `QR Codes preparados para ${alunos.length} alunos.`
    );
}

/* ==========================================
   REIMPRESSÃO DE QR CODE
========================================== */

function reimprimirQR(idAluno) {

    const aluno =
        alunos.find(a => a.id == idAluno);

    if (!aluno) {
        alert("Aluno não encontrado.");
        return;
    }

    alert(
        `Reimprimindo QR de:

${aluno.nome}
Código: ${aluno.codigo}`
    );
}

/* ==========================================
   BUSCA DE ALUNO
========================================== */

function buscarAlunoPorCodigo(codigo) {

    return alunos.find(
        aluno => aluno.codigo === codigo
    );

}

/* ==========================================
   REGISTRO DE REFEIÇÕES
========================================== */

function registrarRefeicao(codigoAluno, tipo) {

    const aluno =
        buscarAlunoPorCodigo(codigoAluno);

    if (!aluno) {
        alert("Aluno não encontrado.");
        return;
    }

    const agora = new Date();

    historico.push({
        id: aluno.id,
        nome: aluno.nome,
        turma: aluno.turma,
        tipo: tipo,
        horario: agora.toLocaleTimeString()
    });

    localStorage.setItem(
        "historico",
        JSON.stringify(historico)
    );

    atualizarDashboard();
}

/* ==========================================
   CONTABILIZAÇÃO DAS REFEIÇÕES
========================================== */

function contabilizarRefeicoes() {

    cafeManha = 0;
    intervalo945 = 0;
    intervalo1145 = 0;
    intervalo315 = 0;

    historico.forEach(item => {

        switch (item.tipo) {

            case "cafe":
                cafeManha++;
                break;

            case "945":
                intervalo945++;
                break;

            case "1145":
                intervalo1145++;
                break;

            case "315":
                intervalo315++;
                break;
        }
    });
}

/* ==========================================
   ATUALIZAÇÃO DO DASHBOARD
========================================== */

function atualizarDashboard() {

    contabilizarRefeicoes();

    const totalRefeicoes =
        cafeManha +
        intervalo945 +
        intervalo1145 +
        intervalo315;

    document.getElementById("totalAlunos").textContent =
        alunos.length;

    document.getElementById("cafeManha").textContent =
        cafeManha;

    document.getElementById("intervalo945").textContent =
        intervalo945;

    document.getElementById("intervalo1145").textContent =
        intervalo1145;

    document.getElementById("intervalo315").textContent =
        intervalo315;

    const total =
        document.getElementById("totalRefeicoes");

    if (total) {
        total.textContent = totalRefeicoes;
    }
}

/* ==========================================
   LIMPEZA DO HISTÓRICO
========================================== */

function limparHistorico() {

    const confirmar = confirm(
        "Deseja apagar o histórico?"
    );

    if (!confirmar) return;

    historico = [];

    localStorage.removeItem("historico");

    atualizarDashboard();

    alert("Histórico apagado.");
}