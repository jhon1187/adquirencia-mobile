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

$(document).ready(function() {
    $("#log").html("");
    
     if(user == null){
         loadPage(PAGE_LOGIN);
     }else{
         loadPage(PAGE_ADQUIRENCIA);
     }
});