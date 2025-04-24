// Início do código

// Contagem regressiva para o evento
// Defina a data do evento (exemplo: 19 de maio de 2025, às 19:00)
$(document).ready(function() {
/*
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
*/

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

async function enviarEmail(templateId, data) {
  try {
    const response = await emailjs.send("service_d1l02bl", templateId, data);
    if (response.status === 200) {
      console.log("E-mail enviado com sucesso!");
    } else {
      console.error("Erro ao enviar e-mail:", response);
    }
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}

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

// Função para verificar a conexão com a internet
async function hasInternetConnection() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    return response.ok;
  } catch (error) {
    return false;
  }
}

form.on("submit", async function(event) {
  event.preventDefault();

  // Verifica se o usuário está conectado à internet
  // Se não estiver, exibe um alerta e não envia o formulário
  const isConnected = await hasInternetConnection();
  if (!isConnected) {
    Swal.fire({
      title: 'Erro!',
      text: 'Não foi possível enviar sua confirmação. Verifique sua conexão com a internet.',
      icon: 'error',
      confirmButtonText: 'Tentar Novamente'
    });
    return;
  }

  // Pega os dados do formulário
  const formData = form.serializeArray();
  const data = {};
  $.each(formData, function() {
    data[this.name] = this.value;
  });

  // Valida os dados do formulário
  // Verifica se os campos obrigatórios estão preenchidos
  if (!data.nome || !data.email || !data.confirmacao) {
    Swal.fire({
      title: 'Erro!',
      text: 'Por favor, preencha todos os campos obrigatórios.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  if (!validateName(data.nome)) {
    Swal.fire({
      title: 'Erro!',
      text: 'Nome inválido.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  if (!validateEmail(data.email)) {
    Swal.fire({
      title: 'Erro!',
      text: 'E-mail inválido.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }
  
  // Confirmação de presença
  const resultado = await Swal.fire({
    title: 'Confirmação de Presença',
    text: `Você confirma que escolheu "${data.confirmacao}" para o evento?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sim, Confirmo',
    cancelButtonText: 'Não, Cancelar',
    customClass: {
      popup: 'custom-popup-class',
      title: 'custom-title-class',
      text: 'custom-text-class',
      confirmButton: 'custom-confirm-button-class',
      cancelButton: 'custom-cancel-button-class'
    }
  });

  // Se o usuário confirmar, envia o e-mail de confirmação
  if (resultado.isConfirmed) {
    mensagemDiv.text("Enviando confirmação... Aguarde um momento.");
    setTimeout(async function() {
      mensagemDiv.text("");
      Swal.fire({
        title: 'Confirmação Enviada!',
        text: `Obrigado, ${data.nome}! Sua escolha foi registrada com sucesso.`,
        icon: 'success',
        confirmButtonText: 'Fechar'
      });

      const templateId = data.confirmacao === "Sim" ? "sim_uw7rj2m" : "nao_1g9i25m";
      await enviarEmail(templateId, {
        nome: data.nome,
        email: data.email,
        confirmacao: data.confirmacao,
        mensagem: data.confirmacao === "Sim"
          ? "Obrigado por confirmar sua presença."
          : "Confirmamos que você não comparecerá.",
      });
    }, 3000);
  } else {
    Swal.fire({
      title: 'Cancelado!',
      text: 'Confirmação cancelada.',
      icon: 'info',
      confirmButtonText: 'Fechar'
    });
  }
});
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

}); // Fim do $(document).ready
// Fim do código