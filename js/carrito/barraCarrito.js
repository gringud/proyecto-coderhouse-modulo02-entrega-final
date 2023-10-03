const   d = document,
        ls = localStorage;

export default function cargarBarraCarrito(resumenTotal){
        
        const $carritoPorcentaje = d.querySelector(".barraEnvioDelante");
        const $carritoValorGratis = d.querySelector(".resumen-env-prod-val");


        
        console.log($carritoPorcentaje);

        console.log("-------------------");
        console.log(resumenTotal);
        console.log("-------------------");
        
        if ((resumenTotal*100/120) > 99){
            console.log("Carrito Gratis");
            $carritoValorGratis.innerHTML = `Gratis`;
            $carritoValorGratis.style.color = ("green")
            $carritoValorGratis.style.fontWeight = ("bold")
            /* $carritoValorGratis.style.fontSize = ("18px") */
            /* $carritoValorGratis.style.transform = ("scale(1)")
            $carritoValorGratis.style.transition = ("fontSize 1s") */



            /* transform: scale(1);
            transition: transform 1s; */
        } else {
            console.log("Carrito pagaaaaaaaaaaa");
        }
        /* $carritoPorcentaje.style.width = (`0%`); */
        $carritoPorcentaje.style.width = (`${resumenTotal*100/120}%`);
        $carritoPorcentaje.style.transition = ("width 2s")
    
}