var adquirencia = {};
adquirencia.formId = "formEstabelecimento";
adquirencia.entity = {};

adquirencia.enviar = function(){
    logClear();
    removeMarkValidate();

    adquirencia.entity = formValues(adquirencia.formId);
    
    var validMessage = adquirencia.validar();
    
    if(validMessage != null && validMessage != ""){
        log(validMessage, "error");
        return;
    }
    
    //passando para string o endereco, pois o request espera esse tipo de dado
    adquirencia.entity.endereco = JSON.stringify(adquirencia.entity.endereco);

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
            
            toggle("endereco");
            toggle("concorrentes");
            
            log("Enviado com sucesso!", "success");
        },
        error: function(response) {
            
            if(response.status == 401){
                login.logout("Sem autorização, efetue login no sistema!", "error");
            }else{
                log("Erro ao enviar, tente novamente!", "error");
            }
        
        }
      });
}

adquirencia.validar = function(){    
    if(adquirencia.entity.nomeEstabelecimento == null || adquirencia.entity.nomeEstabelecimento == ""){
         markValidate("nome");
         return "O campo Nome deve ser preenchido!";
    }
     
    if(adquirencia.entity.telefone == null || adquirencia.entity.telefone == ""){
         markValidate("telefone");
         return "O campo Telefone deve ser preenchido!";
    }
    
    if(adquirencia.entity.telefone.length < 14){
        markValidate("telefone");
        return "O campo Telefone deve ser preenchido corretamente!";
    }
     
    if(adquirencia.entity.nomeResponsavel == null || adquirencia.entity.nomeResponsavel == ""){
         markValidate("responsavel");
         return "O campo Responsável deve ser preenchido!";
    }
    
    if(adquirencia.entity.endereco["cep"] != null && adquirencia.entity.endereco["cep"] != ""){
        if(adquirencia.entity.endereco["cep"].length < 10){
            markValidate("cep");
            return "O campo CEP deve ser preenchido corretamente!";
        }
    }
}
