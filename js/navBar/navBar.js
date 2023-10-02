const d = document;
let $template = "";

export default function navBar(navBar, ubicacion){
    const $navBar = d.querySelector(navBar);
   
    $template = `
                <div class="nav-der">
                    <img class"logo-svg" src="${(ubicacion === "index")? "": "./."}./images/pokemonIco.svg"></img>
                </div>
                <div class="nav-centro">
                    <div class="nav-centro-arriba">Seleccion de busqueda</div>
                    <div class="nav-centro-abajo">
                        <a class="opcion-busqueda" href="${(ubicacion === "index")? "": "./."}./index.html">Todos</a>
                        <a class="opcion-busqueda" href="${(ubicacion === "index")? "": "./."}./pages/buscarTipo.html">Tipos</a>
                        <a class="opcion-busqueda" href="${(ubicacion === "index")? "": "./."}./pages/buscarNombre.html">Nombre</a>
                    </div>
                </div>
                <div class="nav-izq">
                    <a href="${(ubicacion === "index")? "": "./."}./pages/carrito.html">Carrito 
                        <img src="${(ubicacion === "index")? "": "./."}./images/img/carrito.png" alt="">
                    </a>
                </div>
                `;
    
    $navBar.innerHTML = $template;

}