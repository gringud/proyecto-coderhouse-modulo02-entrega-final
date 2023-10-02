import consultCargaTipo from "./../secciones/compartido/consultCargaTemplete.js";
import guardarCarrito from "./../secciones/compartido/guardarCarrito.js"
const   d = document,
        ls = localStorage;

let carritoObjeto = [];
let carritoGuardar;


let pokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
let urlBaseDatos = "./../json/valores_pokemon.json";


export default function buscarNombre(gridSeccion2, gridSeccion3){
    /* console.log("entre"); */
    let $rutaImagen;
    let $template = "";
    const $gridSeccion2 = d.querySelector(gridSeccion2);
    const $gridSeccion3 = d.querySelector(gridSeccion3);

    $gridSeccion2.innerHTML = `
                                <div class="navigation">
                                    <div class="navigation-botones">
                                        <div class="container">
                                            <input class="inputBuscar" type="text" placeholder="Buscar">
                                            <div class="btn">🔍
                                                <i class="fa fa-search"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;

    async function cargaInicial(){
        console.log("object");
        $gridSeccion3.innerHTML =   `
                                        <img class="loader" src="./../images/svg-loaders/oval.svg" alt="cadgando...">
                                        <div id="barraProgreso" class="barraProgreso"></div>
                                    `;
        /* const $gridSeccion2 = d.querySelector(gridSeccion2); */
        /* const $controlLoader = d.querySeector(".barraProgreso"); */
        
        
                                    
        try{
            let res = await fetch(pokeAPI);
            console.log(res);
            let json = await res.json();
            console.log(json);

            let resBD = await fetch(urlBaseDatos);
            console.log(resBD);
            let jsonBD = await resBD.json();
            console.log(jsonBD);
            console.log(jsonBD.length);

            carritoGuardar = jsonBD;

            /* console.log(json.results[0]); */
            /* console.log(barraProgreso); */
            consultCargaTipo(gridSeccion3, json, json, jsonBD);

        } catch (err){
            console.log(err);
        }


    }
    
    cargaInicial();

    d.addEventListener("keyup", (el) =>{
        /* console.log(inputBuscar); */
        if (el.target.matches(".inputBuscar")){
            console.log(el.target.value);

            d.querySelectorAll(".tarjetaPoke").forEach((e) =>
                e.textContent.toLowerCase().includes(el.target.value)
                    ? e.classList.remove("filter")
                    : e.classList.add("filter")
                );
        } 
    })



    d.addEventListener("click", (el) => {
        if (el.target.matches(".btn-Compra")){
            
            let posicionID=0;

            (el.target.value<1018)? posicionID = el.target.value-1: posicionID = (parseInt(el.target.value))-8984;
            console.log("valor posision id ----> "+posicionID);

            /* console.log(carritoGuardar[posicionID].id);
            console.log(el.target.name);
            console.log(carritoGuardar[posicionID].nombre);
            console.log(carritoGuardar[posicionID].valor_dolares); */


            let carritoID = carritoGuardar[posicionID].id,
                carritoURL = el.target.name,
                carritoNombre = carritoGuardar[posicionID].nombre,
                carritoValor = carritoGuardar[posicionID].valor_dolares;

                console.log(carritoObjeto);
            
                if (carritoObjeto === null){
                    carritoObjeto = [];
                }

            guardarCarrito(carritoObjeto, carritoID, carritoURL, carritoNombre, carritoValor);
        }
    })

    //recupero el carrito de compras
    let miCarritoDeCompras;
    
    miCarritoDeCompras = ls.getItem("carritoStorePoke");

    carritoObjeto = JSON.parse(miCarritoDeCompras);

    console.log(carritoObjeto);

};