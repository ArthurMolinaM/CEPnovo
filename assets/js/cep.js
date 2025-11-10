// Recuperando o formulario + campo de cep + botão de CEP
const cepInput = document.querySelector('#cep')
const buscarCepBtn = document.querySelector('#buscarCep')
const form = document.querySelector('#enderecoForm')

// Função para impedir letras no CEP
function limparCep(valor){
  return valor.replace(/\D/g,'');
}





// Montando a função que chama a API e retorna os dados do CEP
 async function buscarCep(){

  document.querySelector('#complemento').value ='';
  document.querySelector('#numero').value = '';
  const cep = limparCep(cepInput.value);


//    Verificando se o Cep tem 08 digitos
  if(cep.length === 8){
    try{
        const res = await fetch (`https://viacep.com.br/ws/${cep}/json/`)
        const data = await res.json();
        if(!data.erro){
          document.querySelector('#logradouro').value = data.logradouro;
          document.querySelector('#bairro').value = data.bairro;
          document.querySelector('#cidade').value = data.localidade;
          document.querySelector('#estado').value = data.uf;

        //   Colocando o cursor no campo para digitar o numero
        document.querySelector('#numero').focus();
        } else{
            alert('Cep não encontrado!');
            cepInput.focus();
        }
         
    } catch (error){
        alert('Erro ao buscar CEP: ', error);
    }
  } else{
      alert('Digite um CEP com 08 números!');
       cepInput.focus();
  }
}


// Chamar a busca do cep, quando clicar no botão
buscarCepBtn.addEventListener('click', buscarCep);

// Máscara automática e permissão de apenas números
cepInput.addEventListener('input',(e) => {
    let valorDigitado = limparCep(e.target.value);
    if(valorDigitado.length > 5){
        valorDigitado =
        valorDigitado = valorDigitado.slice(0, 5) + '-' + valorDigitado.slice(5,8);
    }
    e.target.value = valorDigitado;
})

// Função para salvar no Storage
// recuperar o form para salvar os dados
form.addEventListener('submit', (e) =>{
  // cancelar o evento padrão
  e.preventDefault();

  // recuperar o que foi digitado no formulário e passar para as variaveis
   const nome = document.querySelector('#nome').value;
   const cep = document.querySelector('#cep').value;
   const logradouro = document.querySelector('#logradouro').value;
   const numero = document.querySelector('#numero').value;
   const complemento = document.querySelector('#complemento').value;
   const bairro = document.querySelector('#bairro').value;
   const cidade = document.querySelector('#cidade').value;
   const estado = document.querySelector('#estado').value;

  //  verificar se existe algum campo vazio
  // vamos comparar as variaveis
  if(!nome || !cep || !logradouro || !numero || !bairro || !cidade || !estado){
    alert('Por favor, preencha todos os campos!')
  };

  // Gerar o objeto para a gravação
  const usuario = { nome, cep, logradouro, numero, complemento, bairro, cidade, estado};

  // verificar se existe usuario objeto ja gravado, não existindo ele retorna um array vazio
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  // inserir o objeto usuario no fim do retorno
  usuarios.push(usuario);

  // grava no objeto na chave usuarios
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Dados gravados com sucesso!')

  // limpar os dados do formulario
  form.querySelectorAll('input').forEach(input => input.value = '')
   
})

