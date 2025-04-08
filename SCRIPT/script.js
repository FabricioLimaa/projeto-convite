// Contagem regressiva para o evento
// Defina a data do evento (exemplo: 19 de maio de 2025, às 19:00)
$(document).ready(function() {
  const eventoData = new Date("2025-05-19T19:00:00").getTime();

  // Cria um intervalo para atualizar a contagem regressiva a cada segundo
  const countdown = setInterval(() => {
    const agora = new Date().getTime();
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
  try {
    // Exibe uma mensagem de carregamento
    mensagemDiv.text("Enviando confirmação... Aguarde um momento.");

    // Envia a confirmação de presença via emailjs
    const response = await emailjs.send("service_d1l02bl", "template_uw7rj2m", {
      nome: data.nome,
      email: data.email,
      confirmacao: data.confirmacao,
    });

    // Se a resposta for bem-sucedida, exibe uma mensagem de sucesso
    if (response.status === 200) {
      mensagemDiv.text("Confirmação enviada com sucesso!").css("color", "green");

      // Exibe a notificação com a opção escolhida e o primeiro nome da pessoa
      const notificacao = $("#notificacao");
      notificacao.html(`Obrigado, ${data.nome}! Você escolheu ${data.confirmacao} evento.`);
      notificacao.css("display", "block");

      // Enviar resposta automática
      emailjs.send("service_d1l02bl", "template_uw7rj2m", {
        to_name: data.nome,
        to_email: data.email,
        mensagem: "Obrigado por confirmar sua presença no evento!"
      });
    } else {
      mensagemDiv.text("Erro ao enviar a confirmação.").css("color", "red");
    }
  } catch (error) {
    console.error("Erro:", error);
    mensagemDiv.text("Erro ao enviar a confirmação.").css("color", "red");
  } finally {
    // Remove a mensagem de carregamento
    mensagemDiv.text("");
  }
} else {
  // Se a pessoa não confirmar a notificação, não envia o email
  mensagemDiv.text("Confirmação cancelada.");
}
});

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

});