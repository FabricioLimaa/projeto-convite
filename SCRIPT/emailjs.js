// Configuração do emailjs
// Este script inicializa o emailjs com um ID de usuário e envia um email usando um serviço especificado e ID do modelo.

import emailjs from 'emailjs';

emailjs.init('0ue-h5BW-1EzcefV6');

const serviceId = 'service_kk4qlks';
const templateId = 'template_s57h6ui';

emailjs.send(serviceId, templateId, {
  to_name: 'Nome do destinatário',
  to_email: 'email do destinatário',
  message: 'Mensagem do e-mail'
})
  .then((response) => {
    console.log('E-mail enviado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao enviar e-mail:', error);
  });

// Configuração do formulário
// Este script adiciona um evento de envio ao formulário, previne o comportamento padrão e envia os dados do formulário usando o emailjs.
const form = document.getElementById('meu-formulario');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const opcao = document.getElementById('opcao').value;

  emailjs.send('serviceId', 'templateId', {
    nome,
    email,
    opcao
  })
    .then((response) => {
      console.log('E-mail enviado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao enviar e-mail:', error);
    });
});