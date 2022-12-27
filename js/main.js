window.onload = () => {
  'use strict';
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
};
let posicaoInicial;
const capturarLocalizacao =
  document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const sucesso = posicao => {
  posicaoInicial = posicao;
  latitude.innerHTML = posicaoInicial.coords.latitude;
  longitude.innerHTML = posicaoInicial.coords.longitude;
  const mapa = document.getElementById('mapa-google');
  mapa.setAttribute(
    'src',
    `https://maps.google.com/maps?q=${posicaoInicial.coords.latitude},${posicaoInicial.coords.longitude}&hl=es;z=14&amp;output=embed`
  );
};
const erro = error => {
  let errorMessage;
  switch (error.code) {
    case 0:
      errorMessage = 'Erro desconhecido';
      break;
    case 1:
      errorMessage = 'Permissão negada pelo usuário';
      break;
    case 2:
      errorMessage = 'Posição não está disponível';
      break;
    case 3:
      errorMessage = 'Tempo de requisição esgotado';
      break;
    default:
  }
  console.log('Ocorreu um erro: ' + errorMessage);
};
capturarLocalizacao.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(sucesso, erro);
});
