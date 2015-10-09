var adquirencia = {};

adquirencia.entity = {};

adquirencia.enviar = function(){

    $("#log").html("");

    adquirencia.entity.nomeEstabelecimento = $("#nome").val();
    adquirencia.entity.telefone = $("#telefone").val();
    adquirencia.entity.nomeResponsavel = $("#responsavel").val();
    adquirencia.entity.concorrentes = [];
    adquirencia.entity.endereco = "";
    
    var concorrentes = $("input[name=concorrentes]:checked");
    concorrentes.each(function(index) {
        adquirencia.entity.concorrentes.push($(this).val());
    });
    
    var rua = $("#rua").val();
    var numero = $("#numero").val();
    var complemento = $("#complemento").val();
    var bairro = $("#bairro").val();
    var cidade = $("#cidade").val();
    var uf = $("#uf").val();
    var cep = $("#cep").val();
    
    adquirencia.entity.endereco = rua + ", " + numero + ", " + complemento + ", " + bairro + ", " + cidade + ", " + uf + ", " + cep;
    
    var validMessage = adquirencia.validar();
    
    if(validMessage != null && validMessage != ""){
        $("#log").html(validMessage);
        return;
    }

    $.ajax({
        method: "POST",
        url: "https://desafioti.redetendencia.com.br/rest/adquirencia/gravar",
        contentType: "application/json",
        data: JSON.stringify(adquirencia.entity),
        headers: {
            "user": user
        },
        success: function() {
            $("#log").html("Enviado com sucesso!");
        },
        error: function(response) {
            
            if(response.status == 401){
                login.logout("Sem autorização, efetue login no sistema!");
            }else{
                $("#log").html("Erro ao enviar, tente novamente!");
            }
        
        }
      });

}

adquirencia.validar = function(){
    if(adquirencia.entity.nomeEstabelecimento == null || adquirencia.entity.nomeEstabelecimento == ""){
         return "O campo Nome deve ser preenchido!";
     }
     if(adquirencia.entity.telefone == null || adquirencia.entity.telefone == ""){
         return "O campo Telefone deve ser preenchido!";
     }
     if(adquirencia.entity.nomeResponsavel == null || adquirencia.entity.nomeResponsavel == ""){
         return "O campo Responsável deve ser preenchido!";
     }
}
