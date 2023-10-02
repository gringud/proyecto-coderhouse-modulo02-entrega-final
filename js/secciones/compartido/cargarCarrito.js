const   d=document,
        ls=localStorage;

let carritoObjeto;
export default function cargarCarrito(){
    console.log("Aca voy a cargar el carrito");

    let miCarritoDeCompras;
    
    miCarritoDeCompras = ls.getItem("carritoStorePoke");

    carritoObjeto = JSON.parse(miCarritoDeCompras);

    return carritoObjeto;
}