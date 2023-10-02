const d = document;
let $template = ""

export default function seccion01(seccion01, ubicacion){
    const $seccion01 = d.querySelector(seccion01);

    $template = `
                    <img class="imgLogo" src="${(ubicacion === "index")? "": "./."}./images/img/logoPokemon.png" alt="titulo-Poleapi">
        
                `
    
    $seccion01.innerHTML = $template;

}