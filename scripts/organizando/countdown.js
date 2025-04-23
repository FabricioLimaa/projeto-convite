$(document).ready(function () {
    const eventoData = new Date("2025-05-19T19:30:00").getTime();
  
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
  });