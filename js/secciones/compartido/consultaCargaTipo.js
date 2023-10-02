const   d = document,
        ls = localStorage;


let $rutaImagen;
let varSincroCons = 0;

export default async function consultCargaTemplete (gridSeccion3, url, json, json_bd_json){
    /* console.log(url);
    console.log(json);
    console.log(json_bd_json); */
    const $gridSeccion3 = d.querySelector(gridSeccion3);
    /* console.log($gridSeccion3);
    console.log(url);
    console.log(json);
    console.log(json_bd_json); */

    let res = await fetch(url);
    /* console.log(res); */
    let jsonn = await res.json();
    /* console.log(jsonn); */

    const barraProgreso = d.querySelector(".barraProgreso");
    /* console.log(barraProgreso); */


    async function cargaTemplate (){

        

        /* console.log("-----------------------");
        console.log(jsonn.pokemon);
        console.log(jsonn.pokemon.length);
        console.log("-----------------------"); */

        let $template = "";
        
        for (let i = 0; i < jsonn.pokemon.length; i++){
            try {




                barraProgreso.innerHTML= `${Math. ceil(i*100/jsonn.pokemon.length)} %`;

                
                let ressPoke = await fetch(jsonn.pokemon[i].pokemon.url);
                
                let pokemon = await ressPoke.json();
                
                /* if (!ressPoke.ok) throw{
                    status: ressPoke.status, statusText: ressPoke.statusText
                } */

                /* console.log(i);
                console.log(pokemon); */

                // REPARO PROBLEMA DE IMAGENES EN LA API
                if (pokemon.sprites.other.home.front_default != null){
                    $rutaImagen = pokemon.sprites.other.home.front_default;
                } else if (pokemon.sprites.other['official-artwork'].front_shiny != null){
                    $rutaImagen = pokemon.sprites.other['official-artwork'].front_shiny;
                } else if (pokemon.sprites.other['official-artwork'].front_default != null){
                    $rutaImagen = pokemon.sprites.other['official-artwork'].front_default;
                } else if (pokemon.sprites.front_default != null){
                    $rutaImagen = pokemon.sprites.front_default;
                } else {
                    $rutaImagen = "./../images/default.png";
                }
                
                $template += `
                    <figure> 
                        <img class="fugure-img" src ="${$rutaImagen}" alt="${pokemon.name}">
                        <figcaption>#${pokemon.id}</figcaption>
                        <figcaption>${
                            //  funcionTipoPoke(pokemon)
                            pokemon.types.map(type => (
                                `<span class="${type.type.name}">${type.type.name}</span>`
                            )).join(' ')     //con el .join saco el separador de los items
                        }</figcaption>
                        <figcaption>${pokemon.name}</figcaption>
                        <figcaption>
                        Valor u$s ${(pokemon.id<1018)? /* json_bd_json[(pokemon.id)-1].nombre+" "+ */json_bd_json[(pokemon.id)-1].valor_dolares: /* json_bd_json[(parseInt(pokemon.id))-8984].nombre+" "+ */json_bd_json[(parseInt(pokemon.id))-8984].valor_dolares}
                        </figcaption>
                        <figcaption>
                        <button class="btn-Compra" name="${$rutaImagen}" value="${((pokemon.id)<1018) ? json_bd_json[(pokemon.id)-1].id: json_bd_json[(parseInt(pokemon.id))-8984].id}" id="btnCompra(${((pokemon.id)<1018) ? json_bd_json[(pokemon.id)-1].id: json_bd_json[(parseInt(pokemon.id))-8984].id})">Agregar Carrito</button>
                        </figcaption>
                    </figure>
                `;

                
                
            } catch (err) {
                console.log(err);
                let message = err.statusText || "Ocurrio un error";
                $template += `
                <figure>
                <figcaption> Error ${err.status}: ${message}</figcaption>
                </figure>
                `;
            }

        
        }
        $gridSeccion3.innerHTML = $template;
    }
    
    cargaTemplate();
}