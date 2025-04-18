"use strict";
console.log("teste");
let saldo = 3000;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
if (elementoSaldo != null) {
    elementoSaldo.textContent = saldo.toString();
}
const elementoFormulario = document.querySelector(".block-nova-transicao form");
if (elementoFormulario) {
    elementoFormulario.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!elementoFormulario.checkVisibility()) {
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }
        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
        const inputValor = elementoFormulario.querySelector("#valor");
        const inputData = elementoFormulario.querySelector("#data");
        if (inputTipoTransacao && inputValor && inputData) {
            let tipoTransacao = inputTipoTransacao.value;
            let valor = inputValor.valueAsNumber;
            let data = new Date(inputData.value);
            if (tipoTransacao === "Depósito") {
                saldo += valor;
            }
            else if (tipoTransacao === "Transferência" || tipoTransacao === "Pagamento de Boleto") {
                if (valor > saldo) {
                    alert("Saldo insuficiente para essa transação!");
                    return;
                }
                saldo -= valor;
            }
            else {
                alert("Tipo de transação inválido!");
                return;
            }
            if (elementoSaldo) {
                elementoSaldo.textContent = saldo.toString();
            }
            const novaTransacao = {
                tipoTransacao: tipoTransacao,
                valor: valor,
                data: data
            };
            console.log(novaTransacao);
            elementoFormulario.reset();
        }
    });
}
