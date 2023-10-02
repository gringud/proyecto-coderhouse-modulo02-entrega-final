import navBar from "./navBar/navBar.js";
import section01 from "./secciones/seccion01.js";
import section02 from "./secciones/seccion02-paginacion.js";

let ubicacion = "index";
navBar(".nav", ubicacion);
section01(".seccion01-titulo", ubicacion);
section02(".seccion02-paginacion", ".grid-fluid", ubicacion);