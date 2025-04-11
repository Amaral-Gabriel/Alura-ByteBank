console.log("teste");

let saldo = 3000;

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
if (elementoSaldo != null) {
    elementoSaldo.textContent = saldo.toString();
}

const elementoFormulario = document.querySelector(".block-nova-transicao form") as HTMLFormElement;
if (elementoFormulario) {
    elementoFormulario.addEventListener("submit", function(event) {
        event.preventDefault();
        
        if (!elementoFormulario.checkVisibility()) {
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }

        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLInputElement | null;
        const inputValor = elementoFormulario.querySelector("#valor") as HTMLInputElement | null;
        const inputData = elementoFormulario.querySelector("#data") as HTMLInputElement | null;

        if (inputTipoTransacao && inputValor && inputData) {
            let tipoTransacao: string = inputTipoTransacao.value;
            let valor: number = inputValor.valueAsNumber;
            let data: Date = new Date(inputData.value);

            if (tipoTransacao === "Depósito") {
                saldo += valor;
            } else if (tipoTransacao === "Transferência" || tipoTransacao === "Pagamento de Boleto") {
                if (valor > saldo) {
                    alert("Saldo insuficiente para essa transação!");
                    return;
                }
                saldo -= valor;
            } else {
                alert("Tipo de transação inválido!");
                return;
            }

            // Atualiza o saldo na página
            if (elementoSaldo) {
                elementoSaldo.textContent = saldo.toString();
            }

            // Cria o objeto da nova transação
            const novaTransacao = {
                tipoTransacao: tipoTransacao,
                valor: valor,
                data: data
            };

            console.log(novaTransacao);

            // Limpa o formulário
            elementoFormulario.reset();
        }
    });
}
