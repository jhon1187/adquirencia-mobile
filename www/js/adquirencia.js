var adquirencia = {};
adquirencia.formId = "formEstabelecimento";
adquirencia.entity = {};

adquirencia.enviar = function(){
    $("#log").html("");

    adquirencia.entity = formValues(adquirencia.formId);

    //passando para string o endereco, pois o request espera esse tipo de dado
    adquirencia.entity.endereco = JSON.stringify(adquirencia.entity.endereco);
    
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
            formReset(adquirencia.formId);
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
