import actualizarContadorCarrito from "./actualizarContadorCarrito.js"
const   d=document,
        ls=localStorage;

let carritoObjeto;
export default function cargarCarrito(){
    /* console.log("Aca voy a cargar el carrito"); */

    
    const $cantidadCarrito = d.querySelector(".nav-izq");
    
    let miCarritoDeCompras;
    
    miCarritoDeCompras = ls.getItem("carritoStorePoke");

    carritoObjeto = JSON.parse(miCarritoDeCompras);


    actualizarContadorCarrito(carritoObjeto);

    //ACA EMPIEZA TEMA BOLITA ROJA

    /* console.log(carritoObjeto); */

    


    return carritoObjeto;
}