var user = null;

$(document).ready(function() {
    
    $("#log").html("");
    
    if(user == null){
        $("#main").load("pages/login.html");
    }else{
        $("#main").load("pages/adquirencia.html");
    }
    
});