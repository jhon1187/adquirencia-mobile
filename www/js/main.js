var user = null;

var enterNextFocus = function(){
    
    /* ao pressionar uma tecla em um campo que seja de class="pula" */
    $("input").keypress(function(e){
        /* 
         * verifica se o evento é Keycode (para IE e outros browsers)
         * se não for pega o evento Which (Firefox)
        */
       var tecla = (e.keyCode?e.keyCode:e.which);

       /* verifica se a tecla pressionada foi o ENTER */
       if(tecla == 13){
           /* guarda o seletor do campo que foi pressionado Enter */
           campo =  $('input');
           /* pega o indice do elemento*/
           indice = campo.index(this);
           /*soma mais um ao indice e verifica se não é null
            *se não for é porque existe outro elemento
           */
          if(campo[indice+1] != null){
             /* adiciona mais 1 no valor do indice */
             proximo = campo[indice + 1];
             /* passa o foco para o proximo elemento */
             proximo.focus();
          }
           
          /* impede o sumbit caso esteja dentro de um form */
          e.preventDefault(e);
          return false;
       }
        
    });
}


var focusInputEvent = function(){
    $("input[type=text],input[type=number],input[type=tel]").focusin(function() {
      $(".bar-footer").addClass("hide");
    });
    
    $("input[type=text],input[type=number],input[type=tel]").focusout(function() {
      $(".bar-footer").removeClass("hide");
    });
}

var loadCallBack = function(){
    enterNextFocus();
}

var loadPage = function(page){
    var pageHtml = ("pages/"+page+".html");
    var pageJs = ("js/"+page+".js");
    var pageCss = ("css/"+page+".css");
    
    $("#main").load(pageHtml, loadCallBack);
    
    $.getScript(pageJs);
}

var formValues = function(formId){
    return $("#"+formId).serializeObject();
}

var formReset = function(formId){
    $("#"+formId)[0].reset();
}

var goTopPage = function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

var log = function(message, type){
    $("#log").removeClass();
    
    if(type != undefined){
        $("#log").addClass(type);
    }
    
    $("#log").html(message);
    
    $("#log").addClass("show");
    
    goTopPage();
}

var logClear = function(){
    log("");
    $("#log").addClass("hide");
}

var removeMarkValidate = function(){
    $("form span").css("color","#444");
}

var markValidate = function(inputId){
    $("#"+inputId).parent().children("span").css("color","#f44336");
}

var toggle = function(id){
    if($("#"+id).hasClass("hide")){
        $("#"+id).removeClass("hide");
    }else{
        $("#"+id).addClass("hide");
    }
}

var hide = function(id){
    $("#"+id).addClass("hide");
}
         
$( document ).ajaxStart(function() {
    $("#loading").removeClass("hide");
});

$( document ).ajaxComplete(function() {
    $("#loading").addClass("hide");
});

$(document).ready(function() {
    logClear();
    
    if(user == null){
        loadPage(PAGE_LOGIN);
    }else{
        loadPage(PAGE_ADQUIRENCIA);
    }
});
