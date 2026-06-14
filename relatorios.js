// RESUMO

const totalHoje = 328;
const totalSemana = 1854;
const totalMes = 7932;
const totalAno = 84512;

document.getElementById("hoje").textContent =
    totalHoje.toLocaleString("pt-BR");

document.getElementById("semana").textContent =
    totalSemana.toLocaleString("pt-BR");

document.getElementById("mes").textContent =
    totalMes.toLocaleString("pt-BR");

document.getElementById("ano").textContent =
    totalAno.toLocaleString("pt-BR");


// BOTÃO PDF

document.querySelectorAll(".acoes button")[0]
.addEventListener("click", () => {

    alert(
        "Função Exportar PDF será implementada."
    );

});


// BOTÃO EXCEL

document.querySelectorAll(".acoes button")[1]
.addEventListener("click", () => {

    alert(
        "Função Exportar Excel será implementada."
    );

});


// BOTÃO IMPRIMIR

document.querySelectorAll(".acoes button")[2]
.addEventListener("click", () => {

    window.print();

});


// DATA ATUAL NO TÍTULO

const hoje = new Date();

console.log(
    "Relatório carregado em: " +
    hoje.toLocaleDateString("pt-BR")
);