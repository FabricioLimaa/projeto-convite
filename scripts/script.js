// Início do código

// Contagem regressiva para o evento
// Defina a data do evento (exemplo: 19 de maio de 2025, às 19:00)
$(document).ready(function() {

// TESTANDO FORMULÁRIO DE MENSAGEM
const formMensagem = document.getElementById('form-mensagem');
const textareaMensagem = document.getElementById('mensagem-from');
const contadorCaracteres = document.getElementById('contador-caracteres');
const enviarMensagem = document.getElementById('enviar-mensagem');
const mensagensEnviadas = document.getElementById('mensagens-enviadas');

const limiteCaracteres = 200;

// Adiciona um evento de input ao campo de texto
textareaMensagem.addEventListener('input', () => {
  const caracteresDigitados = textareaMensagem.value.length;
  const caracteresRestantes = limiteCaracteres - caracteresDigitados;
  // Verifica se o usuário digitou mais de 200 caracteres
  if (caracteresDigitados > limiteCaracteres) {
    textareaMensagem.value = textareaMensagem.value.substring(0, limiteCaracteres);
    alert(`Você não pode digitar mais de ${limiteCaracteres} caracteres!`);
  }
  contadorCaracteres.textContent = caracteresRestantes;
});

enviarMensagem.addEventListener('click', (e) => {
  e.preventDefault();
  const mensagem = textareaMensagem.value.trim();
  if (mensagem === '') {
    alert('Por favor, digite uma mensagem!');
    return;
  }
  if (mensagem.length > limiteCaracteres) {
    alert(`A mensagem não pode ter mais de ${limiteCaracteres} caracteres!`);
    return;
  }
  // Enviar a mensagem para o servidor (ou armazená-la localmente)
  // Aqui você pode usar uma API ou um banco de dados para armazenar as mensagens
  const mensagemEnviada = {
    texto: mensagem,
    data: new Date().toLocaleString(),
  };
  mensagensEnviadas.innerHTML += `
    <div class="mensagem-enviada">
      <p>${mensagemEnviada.texto}</p>
      <p>Enviada em: ${mensagemEnviada.data}</p>
    </div>
  `;
  textareaMensagem.value = '';
});


  // Data do evento em milissegundos
  const eventoData = new Date("2025-05-19T19:30:00").getTime();
  // Cria um intervalo para atualizar a contagem regressiva a cada segundo
  const countdown = setInterval(() => {
    // Data atual em milissegundos
    const agora = new Date().getTime();
    // Diferença entre a data do evento e a data atual
    const distancia = eventoData - agora;

    // Calcula os dias, horas e minutos restantes até o evento
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));

    // Atualiza a contagem regressiva no HTML
    $("#days").text(dias);
    $("#hours").text(horas);
    $("#minutes").text(minutos);

    // Se o evento já começou, para a contagem regressiva e exibe uma mensagem
    if (distancia < 0) {
      clearInterval(countdown);
      $("#countdown").html("O evento começou!");
    }
  }, 1000);

// Configuração do emailjs
emailjs.init("IVenFoOLReJtoRink");

/*
const pessoasAutorizadas = {
  "João": true,
  "Maria": true,
  "Pedro": true,
  "Ana": true,
  "Carlos": true
};

function validarPessoa(nome) {
  if (pessoasAutorizadas[nome]) {
    return true;
  } else {
    return false;
  }
}*/

// Seleciona o formulário de confirmação de presença
const form = $("#rsvp-form");
const mensagemDiv = $("#mensagem");

// Verifica se o formulário existe
if (!form.length) {
  console.error("Erro: Formulário 'rsvp-form' não encontrado.");
  return;
}

// Adiciona um evento de envio ao formulário
form.on("submit", async function(event) {
  event.preventDefault();

  // Serializa os dados do formulário
  const formData = form.serializeArray();
  const data = {};
  $.each(formData, function() {
    data[this.name] = this.value;
  });

  /*
  // Validação do nome
  const resultado = inserirNome(data.nome);
  if (resultado.erro) {
    mensagemDiv.addClass("erro");
    mensagemDiv.text(resultado.erro);
    return;
  }
  */

    // Validação dos dados do formulário
    if (!data.nome || !data.email || !data.confirmacao) {
      mensagemDiv.text("Por favor, preencha todos os campos obrigatórios.").css("color", "red");
      return;
    }

    // Validação do nome
    if (!validateName(data.nome)) {
      mensagemDiv.text("Nome inválido.").css("color", "red");
      return;
    }
    // Validação do e-mail
    if (!validateEmail(data.email)) {
      mensagemDiv.text("E-mail inválido.").css("color", "red");
      return;
    }

    // Verifica se a pessoa tem certeza da sua escolha
    if (confirm(`Você tem certeza? Sua escolha foi ${data.confirmacao}!`)) {
      setTimeout(function() {
        window.location.reload();
      }, 10000);
/*
    // Envia a confirmação de presença via emailjs
    const response = await emailjs.send("service_d1l02bl", "template_uw7rj2m", {
      nome: data.nome,
      email: data.email,
      confirmacao: data.confirmacao,
    });
*/
/*
    // Se a resposta for bem-sucedida, exibe uma mensagem de sucesso
    if (response.status === 200) {
      mensagemDiv.text("Confirmação enviada com sucesso!").css("color", "green");
    }
*/     
// Verifica se a pessoa tem certeza da sua escolha
    setTimeout(function() {
    if (data.confirmacao === "Sim")
       {
        emailjs.send("service_d1l02bl", "sim_uw7rj2m", {
          nome: data.nome,
          email: data.email,
          confirmacao: data.confirmacao,
          mensagem: "Obrigado por confirmar sua presença.",
        });
      }
      // Envia uma mensagem de não comparecimento
      else if (data.confirmacao === "Não") {
        emailjs.send("service_d1l02bl", "nao_1g9i25m", {
          nome: data.nome,
          email: data.email,
          confirmacao: data.confirmacao,
          mensagem: "Confirmamos que você não comparecerá.",
        });
      }
    }, 2000);
  } 

    // Exibe uma mensagem de carregamento
    mensagemDiv.text("Enviando confirmação... Aguarde um momento.");
    setTimeout(function() {
      mensagemDiv.text("");
       // Exibe a notificação com a opção escolhida e o primeiro nome da pessoa
       const notificacao = $("#notificacao");
       notificacao.html(`Obrigado, ${data.nome}! Você escolheu ${data.confirmacao} ao evento.`);
       notificacao.css("display", "block");
    }, 3000);
  });
}) 
      /* Enviar resposta automática
      emailjs.send("service_d1l02bl", "template_uw7rj2m", {
        to_name: data.nome,
        to_email: data.email,
        mensagem: "Obrigado por confirmar sua presença no evento!"
      });*/

// Função para validar o nome
function validateName(name) {
  const regex = /^[a-zA-Zà-ü\s]+$/;
  return regex.test(name);
}

// Função para validar e-mail
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Função para validar se o nome está na lista de autorizados
/*function inserirNome(nome) {
  if (validarPessoa(nome)) {
    return { sucesso: true };
  } else {
    return { erro: `Nome não autorizado: ${nome}` };
  }
}*/

// Fim do código