let eventos = [];
let arr=[];
const json=cargarDatos();
try{
    arr=JSON.parse(json);
}
catch (err){
    arr=[];
}
eventos = arr? [...arr] : [];
const nombreEvento = document.getElementById("NombreEvento");
const FechaEvento = document.getElementById("FechaEvento");
const BTn_Enviar = document.getElementById("Agregar");
const lista_eventos = document.querySelector("#listaEventos");

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    agregarEvento();
})

function agregarEvento(){
    if (nombreEvento === "" || FechaEvento === ""){
        return;
    }
    if (diferenciaFecha(FechaEvento.value) < 0){
        return;
    }

    const nuevoEvento={
        id: (Math.random() * 100).toString(36).slice(3),
        nombre: nombreEvento.value,
        FechaEvento: FechaEvento.value,
    }
    eventos.unshift(nuevoEvento);
    guardarDatos(JSON.stringify(eventos));
    nombreEvento.value =  "";
    FechaEvento.value= "";
    cargarDatos()
    mostrarEventos();
}

function diferenciaFecha(destino){
    let FechaDestino = new Date(destino);
    let FechaActual = new Date();
    let diferencia = FechaDestino.getTime() - FechaActual.getTime();
    let dias = Math.ceil(diferencia / (100 * 3600 * 24));
    return dias;
}

function mostrarEventos(){
    const eventosHTML = eventos.map((evento) => {
        return `
        <div class="eventos">
            <div class="dias">
                <span class="diasFaltantes">${diferenciaFecha(evento.FechaEvento)}</span>
                <span class="texto">Dias para</span>
            </div>
            
            <div class="nombreeEvento">${evento.nombre}</div>
            <div class="fechaEvento">${evento.FechaEvento}</div>
            <div class="acciones">
                <button data-id=${evento.id} class="eliminar">Eliminar</button>
            </div>
        </div>
        `;
    });
    lista_eventos.innerHTML=eventosHTML.join("");
    document.querySelectorAll(".eliminar").forEach(button => {
        button.addEventListener("click", e => {
            const id = button.getAttribute('data-id');
            eventos = eventos.filter(evento => evento.id !== id)
            guardarDatos(JSON.stringify(eventos));
            mostrarEventos();
        });
    });
    
}
function guardarDatos(datos){
    localStorage.setItem("lista",datos);
}
function cargarDatos(){
    return localStorage.getItem("lista");
}
mostrarEventos();