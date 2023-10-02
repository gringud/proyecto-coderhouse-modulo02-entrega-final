const d = document;

let $rutaImagen;
let varSincroCons = 0;

export default function consultCargaTemplete (gridSeccion3, url, json, json_bd_json, ubicacion, controlLoader){
    /* console.log(url);
    console.log(json);
    console.log(json_bd_json); */
    /* console.log("ubicacioooooooooonnnnnnn"+ubicacion); */
    
    const barraProgreso = d.querySelector(".barraProgreso");
    /* console.log(barraProgreso); */
    
    
    
    
    const $gridSeccion3 = d.querySelector(gridSeccion3);
    //  console.log($gridSeccion3);

    async function cargaTemplate (){

        

        /* console.log("-----------------------");
        console.log(json);
        console.log("-----------------------"); */

        let $template = "";
        
        for (let i = 0; i < json.results.length; i++){
            
            try {
                
                barraProgreso.innerHTML= `${Math. ceil(i*100/json.results.length)} %`;
                /* console.log(i); */
                let ress = await fetch(json.results[i].url);
                
                let pokemon = await ress.json();
                
                if (!ress.ok) throw{
                    status: ress.status, statusText: ress.statusText
                }

                /* console.log(pokemon); */

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
                    $rutaImagen = `${(ubicacion === "index")? "": "./."}./images/default.png`;
                }
                
                /* $rutaImagen = "./images/default.png"; */
                
                /* console.log(pokemon.id);
                console.log(json_bd_json[(pokemon.id)-1]); */
                $template += `
                    <figure class="tarjetaPoke"> 
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
                            Valor u$s ${(pokemon.id<1018)? json_bd_json[(pokemon.id)-1].valor_dolares: json_bd_json[(parseInt(pokemon.id))-8991].valor_dolares}
                        </figcaption>
                        <figcaption>
                        <button class="btn-Compra" name="${$rutaImagen}" value="${((pokemon.id)<1018) ? json_bd_json[(pokemon.id)-1].id: json_bd_json[(parseInt(pokemon.id))-8984].id}" id="btnCompra(${((pokemon.id)<1018) ? json_bd_json[(pokemon.id)-1].id: json_bd_json[(parseInt(pokemon.id))-8991].id})">Agregar Carrito</button>
                        </figcaption>
                    </figure>
                `;
                

                
                //funciona
                //<button class="btn-Compra" name="${$rutaImagen}" value="${((pokemon.id)<1018) ? json_bd_json[(pokemon.id)-1].id: json_bd_json[(parseInt(pokemon.id))-8991].id}" id="btnCompra(${((pokemon.id)<1018) ? json_bd_json[(pokemon.id)-1].id: json_bd_json[(parseInt(pokemon.id))-8991].id})">Agregar Carrito</button>


                //Valor u$s ${(pokemon.id<1018)? /* json_bd_json[(pokemon.id)-1].nombre+" "+ */json_bd_json[(pokemon.id)-1].valor_dolares: /* json_bd_json[(parseInt(pokemon.id))-8991].nombre+" "+ */json_bd_json[(parseInt(pokemon.id))-8991].valor_dolares}
                //<button class="btn-Compra"  value="${((pokemon.id)<1018) ? json_bd_json[(pokemon.id)-1].id: json_bd_json[(parseInt(pokemon.id))-8991].id}" id="btnCompra(${((pokemon.id)<1018) ? json_bd_json[(pokemon.id)-1].id: json_bd_json[(parseInt(pokemon.id))-8991].id})">Agregar Carrito</button>
                
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