var user = null;

var loadPage = function(page){

    var pageHtml = ("pages/"+page+".html");
    var pageJs = ("js/"+page+".js");
    var pageCss = ("css/"+page+".css");
    
    $("#main").load(pageHtml);
    
    $.getScript(pageJs);
    
}

$(document).ready(function() {
    
    $("#log").html("");
    
    if(user == null){
        loadPage(PAGE_LOGIN);
    }else{
        loadPage(PAGE_ADQUIRENCIA);
    }
    
});