import cargarCarrito from "../secciones/compartido/cargarCarrito.js";
import consultCargaTipo from "./../secciones/compartido/consultaCargaTipo.js";
import guardarCarrito from "./../secciones/compartido/guardarCarrito.js";



const   d = document,
        ls = localStorage;

let carritoObjeto = [];
let carritoGuardar;

let rutaTipos = "https://pokeapi.co/api/v2/type/";

export default function buscarTipo(gridSeccion2, gridSeccion3){
    const $gridSeccion2 = d.querySelector(gridSeccion2);
    const $gridSeccion3 = d.querySelector(gridSeccion3);
    let $template="";

    console.log($gridSeccion2);
    
    async function cargarTipos(){
        try{
            let res = await fetch(rutaTipos);
            /* console.log(res); */
            let json = await res.json();
            /* console.log(json); */
            console.log(json.results.length);
            /* $template = `<div class="tipo-titulo">
                            <label for="select-type">Seleccione el Tipo</label>
                        </div>`; */
            $template = `<p>Seleccione Tipo</p>
                        <div class="tipos-container">`;
            for(let i=0; i<json.results.length-2; i++){
                /* console.log(json.results[i].name);
                console.log(json.results[i].url); */
                $template += `
                                <div class="checkboxDiv">
                                    <input class="checkradio" type="radio" name="opcion-tipo" id="${i+1}" value="${json.results[i].url}" />
                                    <label class="checkradio-text" id="cbox${i}">${json.results[i].name}</label> 
                                </div>
                            `;
            }
            
            $template += `</div>`
                                {/* <div class="checkboxDiv">
                                    <input class="checkbox" type="checkbox" id="${i}" value="${json.results[i].url}" />
                                    <label class="checkbox-text" for="cbox${i}">${json.results[i].name}</label> 
                                </div> */}
        }catch (err){
            console.log(err);
        }

        $gridSeccion2.innerHTML = $template;
    }


    d.addEventListener("click", e=> {
        if (e.target.matches(".checkradio")){
            /* console.log("Pesione el boton", e.target);
            console.log("Pesione el boton", e.target.id);
            console.log("Pesione el boton", e.target.value); */
            
            $gridSeccion3.innerHTML = `
                                        <img class="loader" src="./../images/svg-loaders/oval.svg" alt="cargando...">
                                        <div id="barraProgreso" class="barraProgreso"></div>
                                    `;

            cargarGrid();

            async function cargarGrid(){
                try{
                    let res = await fetch(rutaTipos);
                    /* console.log(res); */
                    let json = await res.json();
                    /* console.log(json); */

                    let res_bd_json = await fetch ("./../json/valores_pokemon.json");
                    /* console.log(res_bd_json); */
                    let json_bd_json = await res_bd_json.json();
                    /* console.log(json_bd_json); */

                    carritoGuardar = json_bd_json;

                    let ress = await fetch(json.results[e.target.id-1].url);
                    /* console.log(ress); */
                    let jsonn = await ress.json();
                    /* console.log(jsonn); */
                    



                    /* console.log(gridSeccion3);
                    console.log(jsonn);
                    console.log(json_bd_json);
                    console.log(json.results[e.target.id-1].url); */

                    consultCargaTipo(gridSeccion3, json.results[e.target.id-1].url, json, json_bd_json);

                }catch (err){
                    console.log(err);
                }
            }









            /* cargarBusquedaTipo($divMostrar, e.target); */
            //enviar $divMostrar y la url de los pokes
        }
    })





    /*          estoy agregando estooooooo      */
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

                carritoObjeto = cargarCarrito();
            
                if (carritoObjeto === null){
                    carritoObjeto = [];
                }

            guardarCarrito(carritoObjeto, carritoID, carritoURL, carritoNombre, carritoValor);
        }
    })

    carritoObjeto = cargarCarrito();
    //recupero el carrito de compras
    /* let miCarritoDeCompras;
    
    miCarritoDeCompras = ls.getItem("carritoStorePoke");

    carritoObjeto = JSON.parse(miCarritoDeCompras);
 */
    console.log(carritoObjeto);


    cargarTipos();
};