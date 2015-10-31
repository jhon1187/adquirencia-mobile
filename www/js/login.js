var login = {};
login.formId = "formLogin";
login.entity = {};

login.enviar = function(){
    logClear();
    removeMarkValidate();

    login.entity = formValues(login.formId);
    
    var validMessage = login.validar();
    
    if(validMessage !== undefined){
        log(validMessage, "error");
        return;
    }
    
    $.ajax({
        method: "POST",
        url: "https://desafioti.redetendencia.com.br/rest/adquirencia/autenticar",
        contentType: "application/json",
        headers: {
            "user": login.entity.login,
            "pass": login.entity.pass
        },
        success: function() {
            user = login.entity.login;
            logClear();
            loadPage(PAGE_ADQUIRENCIA);
        },
        error: function() {
            log("Erro ao logar, tente novamente!", "error");
        }
      });
};

login.validar = function(){
     if(login.entity.login === null || login.entity.login === ""){
         markValidate("login");
         return "O campo Login deve ser preenchido!";
     }
     if(login.entity.pass === null || login.entity.pass === ""){
         markValidate("pass");
         return "O campo Senha deve ser preenchido!";
     }
};

login.logout = function(logTxt){
    user = null;
    logClear();

    if(logTxt !== undefined){
        log(logTxt, "error");
    }

    loadPage(PAGE_LOGIN);
};
