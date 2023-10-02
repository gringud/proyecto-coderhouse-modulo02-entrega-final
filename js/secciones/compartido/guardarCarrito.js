const   d = document,
        ls =  localStorage;


let carritoTemporal = [];
let carritoGuardarJSON;

export default function guardarCarrito(carritoObjeto, carritoID, carritoURL, carritoNombre, carritoValor){
    /* console.log("Estoy guardandoo!!!");
    console.log(carritoObjeto);
    console.log(carritoID, carritoURL, carritoNombre, carritoValor); */

    if (carritoObjeto.length === 0 ){
        /* console.log("Carrito Vacio");
        console.log("Entre por nuevo"); */
        carritoObjeto.push(
            {id: carritoID,
            url: carritoURL,
            name: carritoNombre,
            valor: carritoValor,
            cantidad: 1}
        )
    } else {
        /* console.log("Carrito con algo"); */
        let itemDistinto = "distinto";
        carritoObjeto.forEach(el =>{
            if (el.id === carritoID){
                console.log("Entre por igual");
                el.cantidad = el.cantidad + 1;
                
                itemDistinto="igual"
                return;
            }
        })

        if (itemDistinto === "distinto"){
            /* console.log("Entre por distinto"); */
            carritoObjeto.push(
                {id: carritoID,
                url: carritoURL,
                name: carritoNombre,
                valor: carritoValor,
                cantidad: 1}
            )
        }
    }    

    /* console.log(carritoObjeto); */
    carritoGuardarJSON = JSON.stringify(carritoObjeto);

    ls.setItem("carritoStorePoke", carritoGuardarJSON)
}