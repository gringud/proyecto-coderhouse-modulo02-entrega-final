const   d = document,
        ls = localStorage;

export default function actualizarContadorCarrito(carritoObjeto){
    console.log("-------------------------");
    console.log("Aca entre en actualizar bolita");
    console.log(carritoObjeto);
    console.log("-------------------------");

    /* const $cantidadCarrito = d.querySelector(".nav-izq"); */
    const $cantidadCarrito = d.getElementById("bolitaCarrito");
    console.log($cantidadCarrito);

    /* $cantidadCarrito.innerHTML += `<span class="bolitaCarrito">${carritoObjeto.length}</span> ` */
    if((carritoObjeto != null)){
        if ((carritoObjeto.length != 0)){
            $cantidadCarrito.innerHTML = `<span class="bolitaCarrito">${carritoObjeto.length}</span> `
        } else {
            console.log($cantidadCarrito);
            $cantidadCarrito.classList.toggle(".bolitaCarrito")
        }
    }
    
    
    /* if (carritoObjeto.length >= 0){
        console.log($cantidadCarrito);
        console.log($cantidadCarrito.innerHTML);
        $cantidadCarrito.innerHTML=`${carritoObjeto.length}`
    } */
    



}