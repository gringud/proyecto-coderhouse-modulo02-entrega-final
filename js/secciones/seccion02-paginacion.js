import cargarCarrito from "./compartido/cargarCarrito.js";
import consultCargaTemplete from "./compartido/consultCargaTemplete.js";
import guardarCarrito from "./compartido/guardarCarrito.js";
import actualizarContadorCarrito from "./compartido/actualizarContadorCarrito.js"

const   d = document,
        ls = localStorage;
let $templateNumber = "",
    $templateGrid = "";
let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

let perPage = 20;
let currentPage = 0;
let $prevLink, $nextLink;
let varSincroCons = 0;

//carrito de compras
let carritoGuardar,
    carritoTemporal = [],
    carritoGuardarJSON;

let carritoObjeto = [];



export default function seccion02(gridSeccion2, gridSeccion3, ubicacion){
    const $gridSeccion2 = d.querySelector(gridSeccion2);
    const $gridSeccion3 = d.querySelector(gridSeccion3);
    /* console.log("ubicacioooooooooonnnnnnn3 "+ubicacion); */
    /* $gridSeccion2.innerHTML="asd"; */

    $templateNumber = `
                <div class="limit">
                    <p>Por Página</p>
                    <select id="limit">
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="80">80</option>
                    </select>
                </div>

                <div class="navigation">
                    <div class="navigation-botones">
                        <div class="numbers"></div>
                    </div>
                </div>    
                `;

    $gridSeccion2.innerHTML = $templateNumber;

    const $limit = d.querySelector("#limit");
    const $btnNavigation = d.querySelector(".navigation-botones");
    const $numbers = d.querySelector(".numbers");
    
    


    $limit.addEventListener("change", e => {
        console.log($limit.value);
        const newUrl = `${pokeAPI}?limit=${$limit.value}`;
        perPage = $limit.value;
        loadPage(newUrl);
    })
    

    async function loadPage (url){

        $gridSeccion3.innerHTML = `
                                    <img class="loader" src="./images/svg-loaders/oval.svg" alt="cadgando...">
                                    <div id="barraProgreso" class="barraProgreso"></div>
                                `;


        try{
            let res = await fetch(url);
            let json = await res.json();



            let params = new URLSearchParams(url.split('?')[1]);
            currentPage = params.get("offset") / perPage;
            
            let res_bd_json = await fetch ("./json/valores_pokemon.json");

            let json_bd_json = await res_bd_json.json();

            carritoGuardar = json_bd_json;


            /* console.log("ubicacioooooooooonnnnnnn2 "+ubicacion); */
            consultCargaTemplete( gridSeccion3, url, json, json_bd_json, ubicacion);


            addNumber(json.count)

            $prevLink = json.previous ? `<a href="${json.previous}">«</a>` : "";
            $nextLink = json.next ? `<a href="${json.next}">»</a>` : "";
            /* $btnNavigation.innerHTML = $prevLink+" "+ `${addNumber(json.count)}` +" "+$nextLink; */
            $btnNavigation.innerHTML = $prevLink+" "+$nextLink;

            $btnNavigation.innerHTML = $prevLink;
            $btnNavigation.appendChild($numbers)
            $btnNavigation.innerHTML += $nextLink;

            addFocusClass();


        } catch (err){
            console.log(err);
        }
    }

    const addNumber= (count) => {
        clearNavigation();
        const page = (count-1) / perPage;
        /* console.log("page count "+count);
        console.log("page perPage "+perPage);
        console.log("page contiene "+page); */
        for (let i = 0; i< page;i++){
            let number = d.createElement("span");
            number.classList.add(`element-${i}`)
            /* console.log(number); */
    
            /* const numLink = `<button onclick="actionNum(${i})">${i+1}</button>` */
            const numLink = `<button class="btn-numero" id="actionNum(${i})">${i+1}</button>`
            number.innerHTML = numLink;
            
            /* console.log(numLink); */
            /* $btnNavigation.add(number); */
            $numbers.appendChild(number);
            

            /* console.log($btnNavigation, i); */
        }
        addFocusClass();
    }

    const clearNavigation = () => {
        $numbers.innerHTML = "";
    }

    const addFocusClass = () => {
        const span = d.querySelector(`.element-${currentPage}`);
        span.classList.add("current");
    }

    d.addEventListener("DOMContentLoaded", el => {
        loadPage(pokeAPI);
    });

    d.addEventListener("click", e => {
        if (e.target.matches(".btn-numero")){
            const newUrl = `${pokeAPI}?offset=${(e.target.innerHTML-1)*perPage}&limit=${perPage}`;
            loadPage(newUrl);
        }
    })

    d.addEventListener("click", (e) => {
        if (e.target.matches(".navigation-botones a")){
            e.preventDefault(); //cancelo la ejecucion del boton
            /* console.log("object"); */
            loadPage(e.target.getAttribute("href"));
        }
    })

    d.addEventListener("click", (el) => {
        if (el.target.matches(".btn-Compra")){
            
            let posicionID=0;

            (el.target.value<1018)? posicionID = el.target.value-1: posicionID = (parseInt(el.target.value))-8984;
            /* console.log("valor posision id ----> "+posicionID); */

            let carritoID = carritoGuardar[posicionID].id,
                carritoURL = el.target.name,
                carritoNombre = carritoGuardar[posicionID].nombre,
                carritoValor = carritoGuardar[posicionID].valor_dolares;

                /* console.log(carritoObjeto); */

                carritoObjeto = cargarCarrito();
            
                if (carritoObjeto === null){
                    carritoObjeto = [];
                }
            
            /* actualizarLocalStorage(carritoObjeto); */

            
            
            guardarCarrito(carritoObjeto, carritoID, carritoURL, carritoNombre, carritoValor);
            
            console.log("aprete el boton agregar!!!!");
            actualizarContadorCarrito(carritoObjeto);
        }
    })

    //recupero el carrito de compras


    carritoObjeto = cargarCarrito();

    /* let miCarritoDeCompras;
    
    miCarritoDeCompras = ls.getItem("carritoStorePoke");

    carritoObjeto = JSON.parse(miCarritoDeCompras); */

    /* console.log(carritoObjeto); */
    /* carritoObjeto.forEach(el =>{
        console.log(el);
    }) */

}