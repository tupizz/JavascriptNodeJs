/* Js Página Principal.html */
/* Author: Tadeu Tupinambá */

var tempoInicial = $('#tempo-jogo').text();

/*Ou poderia ser também $(function(){}); */

$(document).ready(function () {
   atualizaTamanhoFrase();
   inicializarContadores();
   inicializarCronometro();
   inicializarCorBordaDigitacao();
   inicializarRemovePlacar();
   inicializarDadosPlacar();
   $('#btn-reiniciar').click(reiniciarJogo);
   $('#selecionar-usuario').selectize({
      create: true,
      sortField: 'text'
   });
});

/*
  Função para contar Palavras
*/

var contarPalavras = function (frase) {
   return frase.split(/\S+/).length - 1;
};

/*
  Palavras da frase inicial
*/

function atualizaTamanhoFrase() {
   var texto = $('.frase').text();
   $('#tamanho-frase').text(contarPalavras(texto));
}

function atualizaTempoInicial(tempo) {
   tempoInicial = tempo;
   $("#tempo-jogo").text(tempo);
}

/*
  Função abaixo é responsável por a cada vez que o usuario
  digitar um caracter novo no input deve-se contar no número de 
  palavras e o de caracteres

  Poderia ser por exemplo tamém (...).on('keydown', function(){});
*/

function inicializarContadores() {
   $('.campo-digitacao').on('input', function () {
      var textoDigitado = $(this).val();
      $('#contador-caracteres-usr').text(textoDigitado.length);
      $('#contador-palavras-usr').text(contarPalavras(textoDigitado));
   });
}

function inicializarCorBordaDigitacao() {

   $('.campo-digitacao').on('input', function () {
      var frase = $('.frase').text();
      var textoDigitado = $(this).val();
      /*
          var porcaoFrase = frase.substring(0, textoDigitado.length);
          if (textoDigitado === porcaoFrase) {
            $(this).removeClass('campo-digitacao-errado');
            $(this).addClass('campo-digitacao-certo');
          } else {
            $(this).removeClass('campo-digitacao-certo');
            $(this).addClass('campo-digitacao-errado');
          }
      */

      /*  A partir do ECMA Script 6 temos essa forma de realizar o mesmo código acima*/
      if (frase.startsWith(textoDigitado)) {
         $(this).removeClass('campo-digitacao-errado');
         $(this).addClass('campo-digitacao-certo');
      } else {
         $(this).removeClass('campo-digitacao-certo');
         $(this).addClass('campo-digitacao-errado');
      }

   })
};

/* 
  Função abaixo verifica quando o usuário selecionar o text-area
  pela primeira vez

  Ao contrário da função on() que fica escutando sempre
  a função one escuta apenas o primeiro evento que acontecer
*/

function inicializarCronometro() {

   $('.campo-digitacao').one('focus', function () {
      $('#btn-frase').attr("disabled", true);
      var tempoTotal = $('#tempo-jogo').text();
      var IDCronometro = setInterval(function () {
         tempoTotal--;
         $('#tempo-jogo').text(tempoTotal);
         if (tempoTotal < 1) {
            clearInterval(IDCronometro);
            $('#btn-frase').attr("disabled", false);
            finalizaJogo();

         }
      }, 1000);
   });
};

/*Função de finalização de cada jogo*/
function finalizaJogo() {
   $('.campo-digitacao').attr('disabled', true);
   $('#btn-reiniciar').attr('disabled', false);
   $('.campo-digitacao').addClass("finalizado");

   var usuario = $('#selecionar-usuario').val();
   var numPalavras = contarPalavras($(".campo-digitacao").val());

   inserePlacar(usuario, numPalavras);

   /*No fim do jogo devemos mostrar o placare além disso realizar uma animação de scroll para eles*/
   if (!$('.principal').hasClass('principal-com-placar')) {
      mostrarPlacar();
   }
   /* A função offset() retorna um objeto com a distancia do objeto do topo e esquerda */
   var posicaoPlacarTop = $('.placar').offset().top + "px";
   $('body').animate({
      scrollTop: posicaoPlacarTop
   }, 1000);
}


/*
  Function Reiniciar Jogo
*/

function reiniciarJogo() {
   $('.campo-digitacao').val("");
   $('.campo-digitacao').attr('disabled', false);
   $('.campo-digitacao').removeClass("finalizado");
   $('#contador-palavras-usr').text("0");
   $('#contador-caracteres-usr').text("0");
   $('#btn-reiniciar').attr('disabled', true);
   $("#tempo-jogo").text(tempoInicial);
   $('.campo-digitacao').removeClass("campo-digitacao-certo");
   $('.campo-digitacao').removeClass("campo-digitacao-errado");
   inicializarCronometro();
};

/*Botao remover Placar*/
function inicializarRemovePlacar() {
   $('.btn-remover-placar').click(function (e) {
      e.preventDefault();
      /*$(this).parent().parent().remove();*/
      $(this).closest("tr").remove();
   });
}
