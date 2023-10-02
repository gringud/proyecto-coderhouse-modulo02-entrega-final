const   d = document,
        ls = localStorage;

let carritoGuardarJSON;

export default function actualizarLocalStorage(carritoObjeto){
    
    


    carritoGuardarJSON = JSON.stringify(carritoObjeto);

    ls.setItem("carritoStorePoke", carritoGuardarJSON)
}