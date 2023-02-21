// Criar variável para armazenar lista de contas
let contas = [];

//Obter o formulário para adicionar evento
const formulario = document.getElementById('form-cadastro');

// Criar função para ser executada no envio do formulário
const enviarFormulario = (event) => {

    // Evitar comportamento padrão do evento de submit do formulario
    event.preventDefault();

    // Obter os campos de senha e  validar se são iguais
    const senha = event.target.senha.value;
    const confirmacaosenha = event.target.confirmacaoSenha.value;
    if(senha !== confirmacaosenha){
        alert('Senhas Divergentes');
        return; //usa um return pra não precisar usar um else. Senhas diferentes, entra no if, mostra a mensagem e sai do bloco
    }

    // Adicionar a conta no array
    const nome =  event.target.nome.value;
    const cpf = event.target.cpf.value;
    const celular = event.target.celular.value;
    const conta = new Date().getTime(); //compara a data atual com uma data de 1970 ("new Date") e adiciona os milisegundos ("getTime"), o que gera sempre um numero diferente
    const saldo = 0;

    const contaCriada = {
        conta,
        nome,
        cpf,
        celular,
        senha,
        saldo,
    };

    contas.push(contaCriada);
    alert(`Conta criada com sucesso. Número: ${conta}`);
    console.log(contaCriada);

}

// Vincular função ao envento de submit do formulario
formulario.addEventListener('submit', enviarFormulario);


// OPERAÇÕES
// Obter formulario de operações
const formOperacao = document.getElementById ('form-operacao');

// Função de saque
const sacar = (conta, valor) => {
    if(valor > 0){
        if(conta.saldo >= valor){
            const novoSaldo = conta.saldo - valor;
            conta.saldo = novoSaldo;
            alert(`Depóstio efetuado com sucesso! Novo Saldo: R$ ${novoSaldo} `);
            return
        }
        alert(`Saldo insuficiente!`);
    }    
};

// Função de deposito
const depositar = (conta, valor) => {
    if(valor > 0){
        const novoSaldo = conta.saldo + valor;
        conta.saldo = novoSaldo;
        alert(`Depóstio efetuado com sucesso! Novo Saldo: R$ ${novoSaldo} `);
        return
    }
    alert(`Não foi possível efetuar o depósito!`);
}

// Função de saque
const consultarSaldo = (conta) => {
    alert(`Saldo Atual: R$ ${conta.saldo} `);    
}

//Envar formulário de operação
const enviarFormularioOperacao = (event) => {
    event.preventDefault();

    // Obter valores digitados no formulário
    const conta = parseInt( event.target.conta.value ); // parseInt - transforma o dado em int
    const operacao = event.target.operacao.value;
    const valor = parseFloat( event.target.valor.value ); // parseFloat - transforma o dado em float
    const senha = event.target.senhaOperacao.value;

    // Validar conta e senha
    const contaAtual = contas.find((c) => c.conta === conta);

    // Valida se a conta existe
    if(!contaAtual){
        alert('Conta inválida');
        return
    
    }

    // Valida se a senha esta correta
    if(contaAtual.senha !== senha){
        alert('Senha inválida');
        return
    }

    //Chamar a função correta de acordo com a operação
    switch (operacao){
        case 'saque':
            sacar(contaAtual, valor);
            break;
        case 'deposito':
            depositar(contaAtual, valor);
            break;
        case 'saldo':
            consultarSaldo(contaAtual);
            break;
        default:
            alert('Operação Inválida');
            break;
        
    }
}

// Vinculando função ao evento de submit do form Operação
formOperacao.addEventListener('submit', enviarFormularioOperacao);

// Desabilitar/Habilitar campo de valor

// Obter select para adicionar evento de onchange
const operacao = document. getElementById('operacao');
operacao.addEventListener('change', (event) => {
    const inputValor = document.getElementById('valor')

    //Verifica se o valor selecionado é saldo
    if (event.target.value === 'saldo') {
        //Desabilita o campo valor
        inputValor.disabled = true;
        //Limpa o valor digitado
        inputValor.value = "";
        return;        
    }

    // Habilita o campo quando a operação for diferente de saldo
    inputValor.disabled = false;
});