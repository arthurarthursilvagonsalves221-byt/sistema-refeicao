let alunos =
JSON.parse(
    localStorage.getItem("alunos")
) || [];

let historico =
JSON.parse(
    localStorage.getItem("historico")
) || [];

function registrar(){

    const codigo =
    document.getElementById(
        "codigoAluno"
    ).value.trim();

    const tipo =
    document.getElementById(
        "tipoRefeicao"
    ).value;

    const aluno =
    alunos.find(
        a => a.codigo === codigo
    );

    if(!aluno){

        alert(
            "Aluno não encontrado."
        );

        return;
    }

    const agora =
    new Date();

    historico.push({

        id: aluno.id,
        nome: aluno.nome,
        turma: aluno.turma,

        tipo: tipo,

        horario:
        agora.toLocaleTimeString()

    });

    localStorage.setItem(
        "historico",
        JSON.stringify(historico)
    );

    document.getElementById(
        "resultado"
    ).innerHTML =

        "<strong>" +
        aluno.nome +
        "</strong><br>" +

        "Turma: " +
        aluno.turma +
        "<br><br>" +

        "Refeição registrada com sucesso.";

    document.getElementById(
        "codigoAluno"
    ).value = "";

}