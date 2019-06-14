// URL LOCALES
var LOCAL_URL_LOGIN = "login.html";

// URL GLOBALES
var URL_LOGIN = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/login";
var URL_LISTAR_PRODUCTOS = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/productos/v0";
var URL_LISTAR_PROVEEDORES = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/proveedores/v0";
var URL_LISTAR_CLIENTES = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/users/v0/clientes";

/*
 * FUNCIONES PARA PRODUCTOS
 */
function listarProductos() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL_LISTAR_PRODUCTOS);
    xhr.onreadystatechange = (evt) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.response == "ok") {
                var data = response.data;
                var tbody = document.getElementById("tabla-lista-productos");

                //Recorrer lista de productos
                var lista_productos = data.productos;
                var i = 1;
                for (pos in lista_productos){
                    var producto = lista_productos[pos];

                    console.log(producto);

                    //Generar html
                    var tr = document.createElement("tr");
                    var th = document.createElement("th", {scope:"row"});
                    th.appendChild(document.createTextNode(i));

                    //Se añade elementos del registro
                    tr.appendChild(th);
                    var td = document.createElement("td",);
                    td.appendChild(document.createTextNode(producto.Nombre));tr.appendChild(td);

                    td = document.createElement("td",);
                    td.appendChild(document.createTextNode(producto.Marca));tr.appendChild(td);
                    td = document.createElement("td",);
                    td.appendChild(document.createTextNode(producto.Categoria));tr.appendChild(td);
                    td = document.createElement("td",);
                    td.appendChild(document.createTextNode(producto.Proveedor));tr.appendChild(td);

                    //Se añade a la tabla
                    tbody.appendChild(tr);
                    i += 1;
                }
            } else {
                console.log(response.message);
                change_alert("alert-msj",
                    "alert alert-danger alert-dismissible fade show container col-4",
                    "<strong>Ha ocurrido un error!</strong><br>No se ha podido cargar los datos.");
            }

        }
    };
    xhr.onerror = (evt) => {
        change_alert("alert-msj",
            "alert alert-dark alert-dismissible fade show container col-4",
            "<strong>Ha ocurrido al intentar cargar los datos.</strong>");
    };
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('TokenId', window.sessionStorage.getItem('IdToken'));
    xhr.send();
}

/*
 * FUNCIONES PARA PROVEEDORES
 */

function listarProveedores() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL_LISTAR_PROVEEDORES);
    xhr.onreadystatechange = (evt) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.response == "ok") {
                var data = response.data;
                var tbody = document.getElementById("tabla-lista-proveedores");

                //Recorrer lista de productos
                var lista_registros = data.proveedores;
                var i = 1;
                for (pos in lista_registros){
                    var registro = lista_registros[pos];

                    console.log(registro);

                    //Generar html
                    var tr = document.createElement("tr");
                    var th = document.createElement("th", {scope:"row"});
                    th.appendChild(document.createTextNode(i));

                    //Se añade elementos del registro
                    tr.appendChild(th);
                    var td = document.createElement("td",);
                    td.appendChild(document.createTextNode(registro.nombre));tr.appendChild(td);

                    td = document.createElement("td",);
                    td.appendChild(document.createTextNode(registro.correo));tr.appendChild(td);
                    td = document.createElement("td",);
                    td.appendChild(document.createTextNode(registro.celular));tr.appendChild(td);
                    td = document.createElement("td",);
                    td.appendChild(document.createTextNode(registro.direccion));tr.appendChild(td);

                    //Se añade a la tabla
                    tbody.appendChild(tr);
                    i += 1;
                }
            } else {
                console.log(response.message);
                change_alert("alert-msj",
                    "alert alert-danger alert-dismissible fade show container col-4",
                    "<strong>Ha ocurrido un error!</strong><br>No se ha podido cargar los datos.");
            }

        }
    };
    xhr.onerror = (evt) => {
        change_alert("alert-msj",
            "alert alert-dark alert-dismissible fade show container col-4",
            "<strong>Ha ocurrido al intentar cargar los datos.</strong>");
    };
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('TokenId', window.sessionStorage.getItem('IdToken'));
    xhr.send();
}

/*
 * FUNCIONES PARA CLIENTES
 */

function listarClientes(tipo_cliente) {
    //definir query params
    var query = "";
    var idtbody = "tabla-lista-cliente-empresas";
    if (tipo_cliente != "") {
        query = "?ruta="+ tipo_cliente;
        idtbody = "tabla-lista-cliente-personas";
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL_LISTAR_CLIENTES+query);
    xhr.onreadystatechange = (evt) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.response == "ok") {
                var data = response.data;
                var tbody = document.getElementById(idtbody);

                //Recorrer lista de productos
                var lista_registros = data.clientes;
                for (pos in lista_registros){
                    var registro = lista_registros[pos];

                    console.log(registro);

                    //Generar html
                    var tr = document.createElement("tr");
                    var th = document.createElement("th", {scope:"row"});
                    th.appendChild(document.createTextNode(parseInt(pos)+1));

                    //Se añade elementos del registro
                    tr.appendChild(th);
                    var td = document.createElement("td",);
                    td.appendChild(document.createTextNode(registro.name));tr.appendChild(td);

                    td = document.createElement("td",);
                    td.appendChild(document.createTextNode(registro.email));tr.appendChild(td);
                    td = document.createElement("td",);
                    td.appendChild(document.createTextNode(registro.phone_number));tr.appendChild(td);
                    td = document.createElement("td",);
                    td.appendChild(document.createTextNode(registro.UserStatus));tr.appendChild(td);
                    td = document.createElement("td",);
                    td.appendChild(document.createTextNode(registro.Enabled));tr.appendChild(td);

                    //Se añade a la tabla
                    tbody.appendChild(tr);
                }
            } else {
                console.log(response.message);
                change_alert("alert-msj",
                    "alert alert-danger alert-dismissible fade show container col-4",
                    "<strong>Ha ocurrido un error!</strong><br>No se ha podido cargar los datos.");
            }

        }
    };
    xhr.onerror = (evt) => {
        change_alert("alert-msj",
            "alert alert-dark alert-dismissible fade show container col-4",
            "<strong>Ha ocurrido al intentar cargar los datos.</strong>");
    };
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('TokenId', window.sessionStorage.getItem('IdToken'));
    xhr.send();
}


/*
 * FUNCIONES PARA INDEX
 */
function TokenOrRedirect() {
    var IdToken = window.sessionStorage.getItem("IdToken");
    if (IdToken == null) {
        alert("Debe iniciar sesión");
        window.location.replace(LOCAL_URL_LOGIN);
    } else {
        //Actualizar token de ser necesario
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
        change_alert("alert-msj",
            "alert alert-dark alert-dismissible fade show container col-4",
            "<strong>Ha ocurrido al intentar acceder</strong><br>Por favor intente nuevamente.");
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