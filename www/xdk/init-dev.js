window.dev = window.dev || {} ;

if( window.performance && performance.now ) {
    dev.timeStamp = function() { return performance.now().toFixed(3) ; } ;
}
else {
    dev.timeStart = Date.now() ;
    dev.timeStamp = function() { return (Date.now() - dev.timeStart) ; } ;
}

dev.LOG = dev.LOG || false ;

dev.consoleLog = function() {
    if( dev.LOG ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
} ;

if( typeof window.cordova !== "undefined" )
    dev.BROWSER = dev.BROWSER || 7000 ;

dev.INSURANCE = dev.INSURANCE || 250 ;      
dev.WINDOW_LOAD = dev.WINDOW_LOAD || 500 ;  
dev.BROWSER = dev.BROWSER || 500 ;          
dev.FAIL_SAFE = dev.FAIL_SAFE || 10000 ;    

dev.isDeviceReady = {                   
    a_startTime______:dev.timeStamp(),  
    b_fnDocumentReady:false,
    c_cordova_ready__:false,
    d_xdk_ready______:false,
    e_fnDeviceReady__:false,
    f_browser_ready__:false
} ;

dev.onDeviceReady = function() {
    var fName = "dev.onDeviceReady():" ;
    dev.consoleLog(fName, "entry") ;

    if( dev.isDeviceReady.e_fnDeviceReady__ ) {
        dev.consoleLog(fName, "function terminated") ;
        return ;
    } else {
        dev.isDeviceReady.e_fnDeviceReady__ = dev.timeStamp() ;
    }

    var evt = document.createEvent("Event") ;
    evt.initEvent("app.Ready", false, false) ;
    document.dispatchEvent(evt) ;

    dev.consoleLog(fName, dev.isDeviceReady) ;
    dev.consoleLog(fName, "exit") ;
} ;

dev.onDeviceReadyCordova = function() {
    dev.isDeviceReady.c_cordova_ready__ = dev.timeStamp() ;
    var fName = "dev.onDeviceReadyCordova():" ;
    dev.consoleLog(fName, dev.isDeviceReady.c_cordova_ready__) ;
    window.setTimeout(dev.onDeviceReady, dev.INSURANCE) ;
} ;

dev.onDeviceReadyXDK = function() {
    dev.isDeviceReady.d_xdk_ready______ = dev.timeStamp() ;
    var fName = "dev.onDeviceReadyXDK():" ;
    dev.consoleLog(fName, dev.isDeviceReady.d_xdk_ready______) ;
    window.setTimeout(dev.onDeviceReady, dev.INSURANCE) ;
} ;

dev.onDeviceReadyBrowser = function() {
    dev.isDeviceReady.f_browser_ready__ = dev.timeStamp() ;
    var fName = "dev.onDeviceReadyBrowser():" ;
    dev.consoleLog(fName, dev.isDeviceReady.f_browser_ready__) ;
    window.setTimeout(dev.onDeviceReady, dev.INSURANCE) ;
} ;

dev.initDeviceReady = function() {
    var fName = "dev.initDeviceReady():" ;
    dev.consoleLog(fName, "entry") ;

    if( dev.isDeviceReady.b_fnDocumentReady ) {
        dev.consoleLog(fName, "function terminated") ;
        return ;
    } else {
        dev.isDeviceReady.b_fnDocumentReady = dev.timeStamp() ;
    }

    document.addEventListener("intel.xdk.device.ready", dev.onDeviceReadyXDK, false) ;
    document.addEventListener("deviceready", dev.onDeviceReadyCordova, false) ;
    window.setTimeout(dev.onDeviceReadyBrowser, dev.BROWSER) ;

    dev.consoleLog(fName, "navigator.vendor:", navigator.vendor) ;
    dev.consoleLog(fName, "navigator.platform:", navigator.platform) ;
    dev.consoleLog(fName, "navigator.userAgent:", navigator.userAgent) ;

    dev.consoleLog(fName, "exit") ;
} ;

if( document.readyState ) {
    dev.consoleLog("document.readyState:", document.readyState) ;
    document.onreadystatechange = function () {
        dev.consoleLog("document.readyState:", document.readyState) ;
        if( (document.readyState === "complete") || (document.readyState === "loaded") ) {
            dev.initDeviceReady() ;
        }
    } ;
}

if( document.addEventListener ) {
    dev.consoleLog("document.addEventListener:", dev.timeStamp()) ;
    document.addEventListener("DOMContentLoaded", dev.initDeviceReady, false) ;
}

if( window.addEventListener ) {
    dev.consoleLog("window.addEventListener:", dev.timeStamp()) ;
    window.addEventListener("load", dev.initDeviceReady, false) ;
} else if( window.attachEvent ) {
    dev.consoleLog("window.attachEvent:", dev.timeStamp()) ;
    window.attachEvent("onload", dev.initDeviceReady) ;
}

window.setTimeout(dev.initDeviceReady, dev.FAIL_SAFE) ;
dev.consoleLog("end init-dev.js:", dev.timeStamp()) ;
