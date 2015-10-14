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

var log = function(message){
    $("#log").html(message);
}

var logClear = function(){
    log("");
}

$(document).ready(function() {
    logClear();
    
    if(user == null){
        loadPage(PAGE_LOGIN);
    }else{
        loadPage(PAGE_ADQUIRENCIA);
    }
});