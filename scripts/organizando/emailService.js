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

export { enviarEmail };