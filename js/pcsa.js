var LOCAL_URL_LOGIN = "http://localhost:63342/WebPCSA/login.html";

/*
 * FUNCIONES PARA INDEX
 */
function TokenOrRedirect() {
    var IdToken = window.sessionStorage.getItem("IdToken");
    if (IdToken == null) {
        alert("Debe iniciar sesión");
        window.location.replace(LOCAL_URL_LOGIN);
    } else {

    }

}

/***
 *FUNCIONES PARA LOGIN
 ***/
function requestLoginPersona() {
    var formLogin = document.getElementById("formLogin");
    if (formLogin.checkValidity()) {
        login();
    } else {
        change_alert("alert-msj",
            "alert alert-warning alert-dismissible fade show container col-4",
            "<strong>Faltan completar los campos!</strong><br>Usuario / Constraseña son obligatorios.");
    }
}

function login() {
    var URL_LOGIN = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/login";

    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL_LOGIN);
    xhr.onreadystatechange = (evt) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.AuthenticationResult) {
                var AuthenticationResult = response.AuthenticationResult;
                window.sessionStorage.setItem("IdToken",AuthenticationResult.IdToken);
                window.location.replace("http://localhost:63342/WebPCSA/index.html");
            } else {
                change_alert("alert-msj",
                    "alert alert-danger alert-dismissible fade show container col-4",
                    "<strong>Ha ocurrido un error!</strong><br>Usuario / Constraseña incorrectos.");
            }

        }
    };
    xhr.onerror = (evt) => {
        console.log('error', evt);
    };
    var dataForm = {};
    $($("#formLogin").serializeArray()).each(function(i, field){
        dataForm[field.name] = field.value;
    });
    var params = {
        data: {
            username: dataForm['username'].toString(),
            password: dataForm['password'].toString()
        }
    };
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(params));
}

/**
    ALERTAS
 */

function change_alert(id, det_class, msj) {
    var alerta = document.getElementById(id);
    alerta.setAttribute("class",det_class);
    alerta.innerHTML = msj;
    mostrar(id);
}
function mostrar(id){
    document.getElementById(id).style.display = 'block';
    setTimeout(function(){
        ocultar(id);
    }, 3000)
}
function ocultar(id){
    document.getElementById(id).style.display = 'none';
}

/**
 * SESION
 */
function  cerrarSesion() {
    window.sessionStorage.setItem("IdToken", null);
    window.location.replace(LOCAL_URL_LOGIN);
}

/**
 * COOKIES
 **/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cookie_name) {
    var dato = getCookie(cookie_name);
    if (dato != "") {
        return True;
    } else {
        return False;
    }
}