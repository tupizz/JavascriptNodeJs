$('#btn-frase').click(atualizarFrase);

function atualizarFrase() {
   var frase = $('.frase');
   $('#tempo-jogo').text("");
   $('#tamanho-frase').text("");
   frase.text("");

   $(".spinner-itens").show();

   Materialize.toast('Mudou de frase', 1500, 'green aviso-erro');
   /* Método GET */
   $.get("http://localhost:3000/frases", fraseAleatoria)
      .fail(function () {
         Materialize.toast('Aconteceu um erro!', 1500, 'red aviso-erro');
      });
}

function fraseAleatoria(data) {
   var frase = $('.frase');
   var numeroAleatorio = Math.floor(Math.random() * data.length);

   frase.text(data[numeroAleatorio].texto);
   atualizaTamanhoFrase();
   atualizaTempoInicial(data[numeroAleatorio].tempo);

   $(".spinner-itens").hide();

}