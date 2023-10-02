import cargarCarrito from "../secciones/compartido/cargarCarrito.js";
import actualizarLocalStorage from "../secciones/compartido/actualizarLocalStorage.js"
import actualizarContadorCarrito from "../secciones/compartido/actualizarContadorCarrito.js";


const d = document;
let carritoObjeto =[];


export default function mostrarCarrito(gridSeccion3){
    console.log("Mostrando el carrito");
    carritoObjeto = cargarCarrito();
    console.log(carritoObjeto);

    let resumenTotal = 0,
        resumenCantidad = 0;
        
    const $gridSeccion3 = d.querySelector(gridSeccion3);

    $gridSeccion3.innerHTML =   `
                                <div class="contenedor-carrito">
                                    <div class="carrito-izq"></div>
                                    <div class="carrito-der"></div>
                                </div>
                                `

    const $carritoIzq = d.querySelector(".carrito-izq");
    const $carritoDer = d.querySelector(".carrito-der");
    

    /* cargarGridItems(); */
            
    function cargarGridProductos(){

        resumenTotal = 0,
        resumenCantidad = 0;

        $carritoIzq.innerHTML="";
        console.log(carritoObjeto);

        if (carritoObjeto != null){
            if (carritoObjeto.length === 0){
                console.log("carrito Vacio");
                console.log("supuestamente acada deberia empezar a cargarr vacio");
                $carritoIzq.innerHTML=  `
                                        <p class="carritoVacio">
                                            Carrito de compras Vacio
                                        </p>
                                        `;
            } else{
                //aca poner cargar grid de productos
                carritoObjeto.forEach(el =>{
                    console.log(el.url);
                    resumenCantidad = resumenCantidad + el.cantidad;
                    resumenTotal = resumenTotal + (el.valor * el.cantidad);
                    $carritoIzq.innerHTML += `
                                            <div class="producto">
                                                <div class="prod-arriba">
                                                    <div class="prod-arriba-izq">
                                                        <img class="prod-arriba-logo" src="./../images/pokemonIco.svg" alt="">
                                                        <p class="prod-arriba-nombre">PokeStore</p>
                                                    </div>
                                                    <div class="prod-arriba-der">
                                                        <p>#${el.id}</p>
                                                    </div>                                    
                                                </div>
                                                <div class="prod-medio">
                                                <div class="prod-medio-izq">
                                                    <img class="carrito-img" src="${el.url}" alt="">
                                                </div>
                                                <div class="prod-medio-centro">
                                                    <p class="nombre-producto">${el.name}</p>
                                                    <div class="prod-medio-centro-medio">
                                                    <p>Eliminar</p>
                                                    <p>Guardar</p>
                                                    <p>Comprar ahora</p>
                                                    </div>
                                                    <div class="prod-medio-abajo">
                                                    <button class="botones-carrito-menos" value="${el.id}">-</button>
                                                    <p class="carritoCantidad(${el.id})" value="${el.id}">${el.cantidad}</p>
                                                    <button class="botones-carrito-mas" value="${el.id}">+</button>
                                                    </div>
                                                </div>
                                                <div class="prod-medio-der">US$ ${el.valor}</div>
                                                
                                                </div>
                                                <div class="prod-abajo">
                                                <p class="prod-abajo-envio">Total</p>
                                                <p class="prod-abajo-precio carritoSubtotal(${el.id})">US$ ${el.cantidad*el.valor}</p>
                                                </div>
                                            </div>
                                            `
                })    
            }
        } else {
            //cargar el carritoVAcio
            $carritoIzq.innerHTML=  `
                                        <p class="carritoVacio">
                                            Carrito de compras Vacio
                                        </p>
                                        `;




        }
    }
    
    function cargarGridTotal(){
        $carritoDer.innerHTML = `
                            <div class="resumen-carrito">
                                <div class="resumen-arriba">Resumen de compra</div>
                                <div class="resumen-medio">
                                <div class="resumen-cant-prod">
                                    <p> Productos (${resumenCantidad})</p>
                                    <div class="resumen-cant-prod-val">$ ${resumenTotal}</div>
                                </div>
                                <div class="resumen-env-prod">
                                    <p>Envios</p>
                                    <div class="resumen-env-prod-val">$ 1.000</div>
                                </div>
                                <div class="resumen-codigo-promo">
                                    <p>Igresa codigo de cupon</p>
                                    <div class="resumen-codigo-promo-val"></div>
                                </div>
                                <div class="resumen-total-compra">
                                    <p>Total</p>
                                    <div class="resumen-total-compra">$ ${resumenTotal}</div>
                                </div>
                                </div>
                                <div class="resumen-boton">Continuar compra</div>
                            </div>
    
                            `
    }


    d.addEventListener("click", el =>{
        if (el.target.matches(".botones-carrito-menos")){
            console.log("Presione boton menos");
            console.log(el.target.value);
            console.log(`.cantidad(${el.target.value})`);
            let botonRestar = d.getElementsByClassName(`carritoCantidad(${el.target.value})`);
            let carritoSubtotal = d.getElementsByClassName(`carritoSubtotal(${el.target.value})`);
/* 
            let $carritoVacio = d.querySelector(`.carrito-izq`);
            let $carritoObjeto = d.getElementsByClassName(`carrito-izq`); */
            console.log(carritoObjeto); //me trae el carrito
            
                        
            
            carritoObjeto.forEach(e =>{
                
                if (e.id === parseInt(el.target.value)){
                    e.cantidad = e.cantidad-1;
                    console.log(carritoObjeto);
                    


                    //si selecciona cantidad igual 0 se elimina
                    const carritoTemporal = carritoObjeto.filter((item) => item.cantidad !== 0)
                    console.log(carritoTemporal);
                    carritoObjeto = carritoTemporal;
                    
                    /* (carritoObjeto.length === 0)?$carritoObjeto.innerHTML = "Carrito vacio":console.log("Tengo cositas");; */
                    /* if (carritoObjeto.length === 0){
                        console.log("Aca entre porque es cero el carrito");
                        $carritoIzq.innerHTML="<p>Puto el que lee</p>"
                        $carritoObjeto.innerHTML = "Carrito vacio"
                    } */
                    

                    

                    /* if (carritoTemporal.length === 0){
                        console.log("aca deberia agregar en carrito vacio");
                        $carritoVacio[0].innerHTML = "Carrito Vacio";
                    } else {
                        console.log("no entre");
                    } */


                    actualizarLocalStorage(carritoObjeto)

                    /* e.splice(); */
                    
                    cargarGridProductos();
                    cargarGridTotal();
                } else {
                    console.log("son distintos");
                }
            })

            
            actualizarContadorCarrito(carritoObjeto);

        }
    })

    d.addEventListener("click", el =>{
        if (el.target.matches(".botones-carrito-mas")){
            console.log("Presione boton menos");
            console.log(el.target.value);
            console.log(`.cantidad(${el.target.value})`);
            let botonRestar = d.getElementsByClassName(`carritoCantidad(${el.target.value})`);
            
            botonRestar[0].innerHTML = parseInt(botonRestar[0].innerHTML)+1;

            carritoObjeto.forEach(e =>{
                
                if (e.id === parseInt(el.target.value)){
                    e.cantidad = e.cantidad+1;
                    console.log(carritoObjeto);

                    //si selecciona cantidad igual 0 se elimina
                    const carritoTemporal = carritoObjeto.filter((item) => item.cantidad !== 0)
                    console.log(carritoTemporal);
                    carritoObjeto = carritoTemporal;

                    

                    actualizarLocalStorage(carritoObjeto)


                    cargarGridProductos();
                    cargarGridTotal();
                } else {
                    console.log("son distintos");
                }
            })

        }
    })

    cargarGridProductos();
    cargarGridTotal();
};


/* const filtradoArray = array.filter((item) => item.id !== 2)
console.log(filtradoArray); */
