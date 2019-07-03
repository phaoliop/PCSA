// URL LOCALES
var LOCAL_URL_LOGIN = "login.html";

// URL GLOBALES
var URL_LOGIN = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/login";
var URL_REGISTRAR = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/users/v0/clientes";
var URL_LISTAR_PRODUCTOS = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/productos/v0";
var URL_LISTAR_PROVEEDORES = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/proveedores/v0";
var URL_LISTAR_CLIENTES = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/users/v0/clientes";

var URL_COMPRAS_PROVEEDOR = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/compras/v0/proveedores";
var URL_COMPRAS_CLIENTE = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/productos/v0/cliente";
var URL_PROVEEDORES = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/proveedores/v0";
var URL_PRODUCTOS = "https://km29vlujn4.execute-api.us-east-2.amazonaws.com/api/productos/v0";

/*
 * FUNCIONES PARA COMPRAS
 */

function requestRegistrarComprasProveedor() {
    var formRegistrar = document.getElementById("formRegistrar");
    if (formRegistrar.checkValidity()) {
        registrarComprasProveedor();
    } else {
        change_alert("alert-msj",
            "alert alert-warning alert-dismissible fade show container col-4",
            "<strong>Faltan completar los campos obligatorios!</strong><br>");
    }
}

function registrarComprasProveedor() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL_COMPRAS_PROVEEDOR);
    xhr.onreadystatechange = (evt) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.response=='ok') {
                window.location.replace("index.html");
            } else {
                change_alert("alert-msj",
                    "alert alert-danger alert-dismissible fade show container col-4",
                    "<strong>Ha ocurrido un error!</strong><br>Datos inválidos!!");
            }

        }
    };
    xhr.onerror = (evt) => {
        change_alert("alert-msj",
            "alert alert-dark alert-dismissible fade show container col-4",
            "<strong>Ha ocurrido al intentar registrar</strong><br>Por favor intente nuevamente.");
    };
    var dataForm = {};
    $($("#formRegistrar").serializeArray()).each(function(i, field){
        dataForm[field.name] = field.value;
    });
    var params = {
        data: {
            num_factura: dataForm['num_factura'].toString(),
            proveedor: dataForm['proveedor'].toString(),
            fecha: dataForm['fecha'].toString(),
            lista_productos: [
                {
                    codigo: dataForm['codigo'].toString(),
                    precio_compra: dataForm['precio_compra'].toString(),
                    cantidad: dataForm['cantidad'].toString()
                }
            ]
        }
    };
    console.info(params);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('TokenId', window.sessionStorage.getItem('IdToken'));
    xhr.send(JSON.stringify(params));
}

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

function requestRegistrarProducto() {
    var formRegistrar = document.getElementById("formRegistrar");
    if (formRegistrar.checkValidity()) {
        registrarProducto();
    } else {
        change_alert("alert-msj",
            "alert alert-warning alert-dismissible fade show container col-4",
            "<strong>Faltan completar los campos obligatorios!</strong><br>");
    }
}

function registrarProducto() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL_PRODUCTOS);
    xhr.onreadystatechange = (evt) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.data=='ok') {
                window.location.replace("productos.html");
            } else {
                change_alert("alert-msj",
                    "alert alert-danger alert-dismissible fade show container col-4",
                    "<strong>Ha ocurrido un error!</strong><br>Datos inválidos!!");
            }

        }
    };
    xhr.onerror = (evt) => {
        change_alert("alert-msj",
            "alert alert-dark alert-dismissible fade show container col-4",
            "<strong>Ha ocurrido al intentar registrar</strong><br>Por favor intente nuevamente.");
    };
    var dataForm = {};
    $($("#formRegistrar").serializeArray()).each(function(i, field){
        dataForm[field.name] = field.value;
    });
    var params = {
        data: {
            codigo: dataForm['codigo'].toString(),
            descripcion: dataForm['descripcion'].toString(),
            foto: "#",
            marca: dataForm['marca'].toString(),
            proveedor: dataForm['proveedor'].toString(),
            categoria: dataForm['categoria'].toString(),
            nombre: dataForm['nombre'].toString(),
            cantidad: dataForm['cantidad'].toString(),
            precio_compra: dataForm['precio_compra'].toString()
        }
    };
    console.info(params);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('TokenId', window.sessionStorage.getItem('IdToken'));
    xhr.send(JSON.stringify(params));
}


/*
 * FUNCIONES PARA PROVEEDORES
 */
 
 function cargarListaProveedores(response) {
    if (response.response == "ok") {
		var data = response.data;
		var selectlist = document.getElementById("proveedor");
		
		//Recorrer lista de productos
		var lista_registros = data.proveedores;
		for (pos in lista_registros){
			var registro = lista_registros[pos];
			console.log(registro);
			selectlist.innerHTML += "<option value='"+ registro.RUC +"'>"+ registro.nombre +"</option>";
		}
	}
 }
 
 function consultarProveedores(filtro) {
	if (filtro != undefined) {
		filtro = "?filter=" + filtro;
	} else {
		filtro = "";
	}
 
	const xhr = new XMLHttpRequest();
    xhr.open('GET', URL_LISTAR_PROVEEDORES + filtro);
    xhr.onreadystatechange = (evt) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
			cargarListaProveedores(response);
        }
    };
    xhr.onerror = (evt) => {
        console.log(evt);
    };
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('TokenId', window.sessionStorage.getItem('IdToken'));
    xhr.send();
 }

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

function requestRegistrarProveedor() {
    var formRegistrar = document.getElementById("formRegistrar");
    if (formRegistrar.checkValidity()) {
        registrarProveedor();
    } else {
        change_alert("alert-msj",
            "alert alert-warning alert-dismissible fade show container col-4",
            "<strong>Faltan completar los campos obligatorios!</strong><br>");
    }
}

function registrarProveedor() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL_PROVEEDORES);
    xhr.onreadystatechange = (evt) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.data=='ok') {
                window.location.replace("proveedores.html");
            } else {
                change_alert("alert-msj",
                    "alert alert-danger alert-dismissible fade show container col-4",
                    "<strong>Ha ocurrido un error!</strong><br>Datos inválidos!!");
            }

        }
    };
    xhr.onerror = (evt) => {
        change_alert("alert-msj",
            "alert alert-dark alert-dismissible fade show container col-4",
            "<strong>Ha ocurrido al intentar registrar</strong><br>Por favor intente nuevamente.");
    };
    var dataForm = {};
    $($("#formRegistrar").serializeArray()).each(function(i, field){
        dataForm[field.name] = field.value;
    });
    var params = {
        data: {
            RUC: dataForm['RUC'].toString(),
            correo: dataForm['correo'].toString(),
            direccion: dataForm['direccion'].toString(),
            nombre:dataForm['nombre'].toString(),
            celular: dataForm['celular'].toString(),
        }
    };
    console.info(params);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('TokenId', window.sessionStorage.getItem('IdToken'));
    xhr.send(JSON.stringify(params));
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
        window.location.replace(LOCAL_URL_LOGIN);
        alert("Debe iniciar sesión");
       
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
                window.location.replace("index.html");
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

/***
 *FUNCIONES PARA REGISTRO
 ***/

function requestRegistrarPersona() {
    var formRegistrar = document.getElementById("formRegistrar");
    if (formRegistrar.checkValidity()) {
        registrar();
    } else {
        change_alert("alert-msj",
            "alert alert-warning alert-dismissible fade show container col-4",
            "<strong>Faltan completar los campos!</strong><br>DNI / Constraseña son obligatorios.");
    }
}

function registrar() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL_REGISTRAR);
    xhr.onreadystatechange = (evt) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.data=='ok') {
                window.location.replace("login.html");
            } else {
                change_alert("alert-msj",
                    "alert alert-danger alert-dismissible fade show container col-4",
                    "<strong>Ha ocurrido un error!</strong><br>Datos inválidos!!");
            }

        }
    };
    xhr.onerror = (evt) => {
        change_alert("alert-msj",
            "alert alert-dark alert-dismissible fade show container col-4",
            "<strong>Ha ocurrido al intentar registrarse</strong><br>Por favor intente nuevamente.");
    };
    var dataForm = {};
    $($("#formRegistrar").serializeArray()).each(function(i, field){
        dataForm[field.name] = field.value;
    });
    var params = {
        data: {
            username: dataForm['username'].toString(),
            password: dataForm['password'].toString(),
            direccion: dataForm['direccion'].toString(),
            correo:dataForm['correo'].toString(),
            apellidos: dataForm['apellidos'].toString(),
            nombre: dataForm['nombre'].toString(),
            celular: dataForm['celular'].toString()
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
function cerrarSesion() {
    window.sessionStorage.clear();
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