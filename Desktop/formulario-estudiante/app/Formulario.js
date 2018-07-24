function limpiarFormulario(inputs){
    inputs.forEach(function(v,i){
        document.getElementById(v).value = "";
    });
}

var Storage = window.localStorage;
var estudiantes = [];

window.onload = function(){
    var dEstudiantes = Storage.getItem("estudiantes");

    if (dEstudiantes !== undefined){
        estudiantes = JSON.parse(dEstudiantes);
        estudiantes.forEach(function(v,i) {
        agregarRow(v)
        });

        //console.log("Estudiantes : "+dEstudiantes);
    }   else {
        console.log("Estudiantes no encontrado");
    }



}


function agregarEstudiante(est){
    estudiantes.push(est);

    //agregarlo a la tabla HTML
    agregarRow(est);

    Storage.setItem("estudiantes", JSON.stringify(estudiantes));
    //TODO: Guardar en localStorage
}

function buscarEstudiantePorMatricula(matricula){
    var estudiante = null;

    estudiantes.forEach(function(v,i){
        if(v.matricula === matricula){
        estudiante = v;
        }
    });

    return estudiante;
}

function editarEstudiante(btnEditar){
    var matricula = btnEditar.getAttribute("data-matricula");
    //alert(matricula);

    var estudiante = buscarEstudiantePorMatricula(matricula);

    if (estudiante == null){
        console.log("no encontrado...");
        return;
    }

    document.getElementById("nombre").value = estudiante.nombre;
    document.getElementById("matricula").value = estudiante.matricula;
    document.getElementById("identificacion").value = estudiante.identificacion;
    

}

function agregarRow(estudiante){

    var tablaEstudiante = document.getElementById("tabla_estudiante");
    var tdNombre = document.createElement("td");
    var tdMatricula = document.createElement("td");
    var tdIdentificacion = document.createElement("td");
    var tdActions = document.createElement("td");

    var btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";

    btnEditar.setAttribute("onclick", "editarEstudiante(this)");
    btnEditar.setAttribute("data-matricula", estudiante.matricula);
    tdActions.appendChild(btnEditar);

    tdNombre.textContent = estudiante.nombre;
    tdMatricula.textContent = estudiante.matricula;
    tdIdentificacion.textContent = estudiante.identificacion;

    var tr = document.createElement("tr");
    tdNombre.textContent = estudiante.nombre;
    tdMatricula.textContent = estudiante.matricula;
    tdIdentificacion.textContent = estudiante.identificacion;

    tr.appendChild(tdNombre);
    tr.appendChild(tdMatricula);
    tr.appendChild(tdIdentificacion);
    tr.appendChild(tdActions);

    tablaEstudiante.appendChild(tr);
}

// Leer los inputs y agregarlo a la tabla
function leerEstudiante(){
    
    var nombre = document.getElementById("nombre").value;
    var matricula = document.getElementById("matricula").value;
    var identificacion = document.getElementById("identificacion").value;

    var est = new Estudiante();
    est.nombre = nombre;
    est.matricula = matricula;
    est.identificacion = identificacion;

    limpiarFormulario(["nombre", "matricula", "identificacion"]);

    //console.log(est);
    agregarEstudiante(est);
}

function editarEstudiante(matricula){
    var ID = matricula.getAttribute("data-matricula");

    
    console.log(ID);
}

