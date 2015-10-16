var user = null;

var loadPage = function(page){
    var pageHtml = ("pages/"+page+".html");
    var pageJs = ("js/"+page+".js");
    var pageCss = ("css/"+page+".css");
    
    $("#main").load(pageHtml);
    
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
