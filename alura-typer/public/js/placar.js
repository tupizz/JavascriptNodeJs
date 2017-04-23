/*Função Insere Placar*/
function inserePlacar(usuario, pontos) {
   var tabela = $('.placar').find('tbody');
   var linha = novaLinha(usuario, pontos);
   tabela.prepend(linha);

   inicializarRemovePlacar();
}

function novaLinha(usuario, pontos) {
   var linha = $('<tr>');

   var tdUsr = $('<td>');
   var tdPontos = $('<td>');
   var tdBtn = $('<td>');


   var btnRemover = $('<a>').addClass('btn-remover-placar').attr('href', '#');
   var icone = $('<i>').addClass('small material-icons').text('delete')

   tdUsr.text(usuario);
   tdPontos.text(pontos);
   tdBtn.append(btnRemover.append(icone));

   linha.append(tdUsr, tdPontos, tdBtn);

   return linha;
}


$('#btn-placar').click(mostraOuNaoPlacar);

function mostraOuNaoPlacar() {
   if (!$('.principal').hasClass('principal-com-placar')) {
      mostrarPlacar();
   } else {
      naoMostraPlacar();
   }
};

function mostrarPlacar() {
   $('.principal').removeClass('container');
   $('.principal').addClass('principal-com-placar');
   $('.placar').show();
   $('#section-de-jogo').addClass('section-game');
}

function naoMostraPlacar() {
   $('.principal').addClass('container');
   $('.principal').removeClass('principal-com-placar');
   $('.placar').hide();
   $('#section-de-jogo').removeClass('section-game');
}






$('#btn-sync').click(sincronizaPlacar);

function sincronizaPlacar() {
   /*Cria-se um array*/
   var placar = [];
   var linhas = $('tbody > tr');
   linhas.each(function (indice, linha) { /* linha == this */

      /* DIFERENÇA ENTRE linha.firstChild --> devolve um elemento html
         AGORA $(linha.firstChild) retorna um objeto jQuery */

      var usuario = $(linha).find('td:nth-child(1)').text();
      var pontos = $(linha).find('td:nth-child(2)').text();

      var obj = {
         usuario: usuario,
         pontos: pontos
      };

      placar.push(obj);

   });

   /*Para enviaros dados via post, ou get, os dados tem que estar na forma de objeto Javascript*/

   var dados = {
      placar: placar
   };

   $.post("http://localhost:3000/placar", dados, function () {
      Materialize.toast('Sincrozinado', 1500, 'green aviso-erro');
   });


}


function inicializarDadosPlacar() {
   $.get("http://localhost:3000/placar", function (data) {
      var tabela = $('.placar').find('tbody');
      for (var i = 0; i < data.length; i++) {
         inserePlacar(data[i].usuario, data[i].pontos);
      }
   });
}









/*--*/