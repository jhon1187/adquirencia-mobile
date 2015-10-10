var login = {};

login.entity = {};

login.enviar = function(){

    $("#log").html("");

    login.entity.user = $("#login").val();
    login.entity.pass = $("#pass").val();
    
    var validMessage = login.validar();
    
    if(validMessage != null && validMessage != ""){
        $("#log").html(validMessage);
        return;
    }

    $.ajax({
        method: "POST",
        url: "https://desafioti.redetendencia.com.br/rest/adquirencia/autenticar",
        contentType: "application/json",
        headers: {
            "user": login.entity.user,
            "pass": login.entity.pass
        },
        success: function() {
            user = login.entity.user;
            $("#log").html("");
            loadPage(PAGE_ADQUIRENCIA);
        },
        error: function() {
            $("#log").html("Erro ao logar, tente novamente!");
        }
      });

}

login.validar = function(){
     if(login.entity.user == null || login.entity.user == ""){
         return "O campo Login deve ser preenchido!";
     }
     if(login.entity.pass == null || login.entity.pass == ""){
         return "O campo Senha deve ser preenchido!";
     }
}

login.logout = function(logTxt){
    user = null;
    $("#log").html("");

    if(logTxt != undefined){
        $("#log").html(logTxt);
    }

    loadPage(PAGE_LOGIN);
}
