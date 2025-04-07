$(document).ready(function() {
    const eventoData = new Date("2025-05-19T19:00:00").getTime();
  
    const countdown = setInterval(() => {
        const agora = new Date().getTime();
        const distancia = eventoData - agora;
  
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  
        $("#days").text(dias);
        $("#hours").text(horas);
        $("#minutes").text(minutos);
        
  
        if (distancia < 0) {
            clearInterval(countdown);
            $("#countdown").html("O evento começou!");
        }
    }, 1000);
  
    // Configuração do emailjs
    emailjs.init("0ue-h5BW-1EzcefV6");

  const form = $("#rsvp-form");
  const mensagemDiv = $("#mensagem");

  if (!form.length) {
    console.error("Erro: Formulário 'rsvp-form' não encontrado.");
    return;
  }

  form.on("submit", async function(event) {
    event.preventDefault();

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

  if (!validateEmail(data.email)) {
    mensagemDiv.text("E-mail inválido.").css("color", "red");
    return;
  }

    try {
      const response = await emailjs.send("service_kk4qlks", "template_s57h6ui", data);

      if (response.status === 200) {
        mensagemDiv.text("Confirmação enviada com sucesso!").css("color", "green");

        // Enviar resposta automática
        emailjs.send("service_kk4qlks", "template_opx1avq", {
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
    }
  });
});

// Função para validar e-mail
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }