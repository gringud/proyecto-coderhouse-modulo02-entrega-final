const   d = document,
        ls = localStorage;

let carritoGuardarJSON;

export default function actualizarLocalStorage(carritoObjeto){
    
    const $cantidadCarrito = d.querySelector(".bolitaCarrito");
    
    console.log(carritoObjeto);
    if ((carritoObjeto.length === 0) || (carritoObjeto === null)){
        console.log("CarritoVAcio");
        console.log($cantidadCarrito);
        $cantidadCarrito.innerHTML = ``
        $cantidadCarrito.classList.remove("bolitaCarrito")
    }
    
    
    /* if ((carritoObjeto === null) || (carritoObjeto.length === 0)){
        console.log("esta vacio");
    } else {
        console.log("TENGO COSITAS DENTRO");
        $cantidadCarrito.innerHTML += `<span class="bolitaCarrito">...</span> `
    } */


    carritoGuardarJSON = JSON.stringify(carritoObjeto);

    ls.setItem("carritoStorePoke", carritoGuardarJSON)
}