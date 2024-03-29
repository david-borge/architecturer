/***** Para instalar este proyecto gulp *****/

// Crear el repositorio:
//  - Crear un nuevo repositorio con GitKraken.
//  - Copiar los archivos de gulp-amp-template a la carpeta del nuevo repositorio; menos dist, node_modules, package-lock.json y README.md.
//  - Renombrar package.json a _old-package.json
//  - Crear un nuevo package.json poniendo en la terminal: npm init
//  - Copiar todo lo que esté debajo del homepage de _old-package.json a package.json
//  - Borrar _old-package.json
// Instalar gulp y sus dependencias: en la terminal: npm install --save-dev gulp
//   - Es posible que haya que solucionar incompatibilidades entre los plugins que van surgiendo con las actualizaciones de los mismos.
//       - Problema de gulp-image: en la terminal: npm install --save-dev gulp-image@6.2.1
// Ejecutar alguna de las "Tareas importantes" (ver más abajo).

/***** Fin de: Para instalar este proyecto gulp *****/




/***** Tareas importantes (escribir en la terminal) *****/

// Desarrollo:                      gulp
// Producción:                      gulp build
// Borrar la caché:                 gulp borrar_cache
// Borrar la carpeta dist:          gulp borrar_carpeta_dist
// Comprimir el proyecto en un ZIP: gulp comprimir_el_proyecto_en_un_zip_sin_node_modules

/***** Fin de: Tareas importantes (escribir en la terminal) *****/




/***** Documentación de Gulp *****/


// Nota: Todas las tareas de Gulp son funciones JavaScript asíncronas (todas empiezan a ejecutarse casi al mismo tiempo, y no sabemos en qué orden). Cuando queramos que una tarea termine, tenemos que avisar a Node.js. Para ello, Gulp pasa automáticamente la función callback como primer argumento de la función función_que_se_ejecutará_al_ejecutar_esta_tarea_de_gulp(). Para indicar que la tarea ha terminado, simplemente tenemos que llamar a esta función.
// Nota: El comando gulp nombre_de_la_tarea ejecuta la tarea con el nombre nombre_de_la_tarea, que está definida en el archivo “gulpfile.js”.


/** Gulp APIs **/
// gulp.src("glob_pattern"): dice el archivo o archivos de origen para la tarea. Para seleccionar varios archivos o carpetas, se pueden usar expresiones regulares usando Globs (https://gulpjs.com/docs/en/getting-started/explaining-globs/).
// gulp.pipe(): pipe significa pipeline y nos permite ejecutar métodos de Gulp en el orden que queramos dentro de una tarea.
// gulp.dest("glob_pattern"): dest significa destino e indica donde se va a guardar el archivo de salida de este método. No hace falta indicar el nombre del archivo.
// gulp.watch(glob_pattern_a_los_archivos_que_quiero_watchear, lista_de_tareas_que_quiero_watchear).
// gulp.series(["list_of_tasks"]): se usar para listar varias tareas que se ejecutarán en el orden que las pongamos, una por una. Es menos rápido que gulp.parallel(), pero nos permite establecer el orden de ejecución de las tareas.
// gulp.parallel(["list_of_tasks"]): las tareas se ejecutan todas a la vez. Eso se usa si el orden de las tareas no importa, ya que es más rápido que gulp.series().


/** Glob patterns **/
// Documentación: https://gulpjs.com/docs/en/getting-started/explaining-globs/
// Se usan para seleccionar varios archivos o carpetas.
//-    *.file_name_extension (e.g. "scripts/*.js") - matches all the files within one directory. Children files and folders are not included
//-    **/*.file_name_extension (e.g. "scripts/**/*.js") - matches all the files within one directory, INCLUDING all the children folders and files
//-    !full_file_or_folder_name (e.g. "!main.scss" or "!node_modules/**") - negative glob. Excludes file/files and folders. Use it only after the positive globs


/** Pasos para añadir una nueva funcionalidad. **/
/*
  1) Find a plugin with the help of the browser: gulp plugin_name

  2) Install the plugin’s package: npm install --save-dev plugin_name
  
  3) Import the plugin’s package to the gulpfile.js: 
  
      const variable_name = require("gulp_plugin_name");

  4) Create a basic task using plantilla_de_tareas() below.

  5) Use the "gulp.src" method to specify a glob for the source files in the task:

      gulp.src("glob_pattern")

  6) Add additional steps to the task with the ".pipe" method:

      .pipe()

  7) Execute the plugin and provide additional options if they are required or needed:

      .pipe(rename("./styles.min.css"))

  8) Use the "gulp.dest" method to specify the output directory for the files in the task:

      gulp.dest("/dist/")

  9) Set the "gulp.watch" task in order to track the globes and execute tasks upon any changes

  10) Use the "gulp.series" method when you want to execute tasks in the sequential, strict order:

      gulp.series(["sass", "js", "less"])

  11) Use the "gulp.parallel" method when you want to execute tasks simultaneously:

      gulp.parallel(["sass", "less", "imagemin", "html"])
*/


/** Bootstrap **/
/*
    1) Instalación: npm install --save-dev bootstrap
    2) Importar en src/sass, o bien en un archivo propio o en el archivo SCSS principal con: @import '../../node_modules/bootstrap/scss/bootstrap.scss';
    3) En index.html, enlazar el Bootstrap compilado: <link rel="stylesheet" href="./css/bootstrap.min.css">
    4) Para reemplazar las variables SASS de Bootstrap, hay dos opciones:
        Opción 1: añadir esas variables antes de la línea @import '../../node_modules/bootstrap/scss/bootstrap.scss';
        Opción 2: crear _variables.scss dentro de src/sass e importarlo antes de la línea @import '../../node_modules/bootstrap/scss/bootstrap.scss';
    Documentación: https://getbootstrap.com/
    MUCHO CUIDADO: NO hay que poner const bootstrap = require('bootstrap'); o no funciona.
*/


/***** Fin de: Documentación de gulp *****/ 




/***** Importar Gulp (para poder usar sus APIs) y sus plugins *****/

const gulp                   = require('gulp');  // Le dice a Node.JS que busque el módulo 'gulp' dentro de la carpeta 'node_modules' y lo asigna a la constante gulp.
const fileinclude            = require('gulp-file-include');
const i18n                   = require('gulp-html-i18n');
const htmlmin                = require('gulp-htmlmin');
const jsonMinify             = require('gulp-json-minify');
const minifyInlineJSON       = require('gulp-minify-inline-json');
const sass                   = require('gulp-sass')(require('sass'));
const less                   = require('gulp-less');
const sourcemaps             = require('gulp-sourcemaps');
const autoprefixer           = require('gulp-autoprefixer');
const htmlInlineAutoprefixer = require( "gulp-inline-autoprefixer" );
const cssnano                = require('gulp-cssnano');
const stripCssComments       = require('gulp-strip-css-comments');
const purgecss               = require('gulp-purgecss');
// const inlineCss           = require('gulp-inline-css');
const uglify                 = require('gulp-uglify');
const babel                  = require('gulp-babel');
const concat                 = require('gulp-concat');
const rename                 = require('gulp-rename');
const injectHTML             = require('gulp-inject-in-html');
const image                  = require('gulp-image');
const srcset                 = require('gulp-srcset').default;
const browserSync            = require('browser-sync').create();
const cache                  = require('gulp-cache');
const plumber                = require('gulp-plumber');
const notifier               = require('gulp-notifier');
const mergeStream            = require('merge-stream');
const styleInject            = require("gulp-style-inject");
const fs                     = require("fs");
const inject                 = require('gulp-inject-string');
const htmlreplace            = require('gulp-html-replace');
const zip                    = require('gulp-zip');
const del                    = require('del');
const gulpAmpValidator       = require('gulp-amphtml-validator');
const through2               = require('through2');
const AmpOptimizer           = require('@ampproject/toolbox-optimizer');
const ampOptimizer           = AmpOptimizer.create();
const { dest, parallel, series } = require('gulp');

/***** Fin de: Importar Gulp (para poder usar sus APIs) y sus plugins *****/




/***** Configuración de Gulp *****/


// Configuración de Gulp: ubicación de los archivos de origen
var filesPathSrc = {
    html: "./src/html/**/*.html",
    lang: "./src/lang/**/*.*",
    sass: "./src/sass/**/*.scss",
    less: "./src/less/**/*.less",
    js:   "./src/js/**/*.js",
    serviceworkers:   "./src/js/service-workers/**/*.js",
    img:  "./src/img/**/*.*",
    lang: "./src/lang/",
    ssl: "./src/ssl/"
}


// Configuración de Gulp: i18n (multi-idioma)
// Documentación: https://www.npmjs.com/package/gulp-html-i18n

// MUY IMPORTANTE: idioma acutal (el que se mostrará el watch y el build)
// TODO: al cambiar el idioma, cambiarlo también en:
//        - Este archivo: variable url_produccion
//        - Archivo: src\lang\en\_lang.json

// var localization = "en";
var localization = "es-es";

var i18nOptions = {
    langDir: filesPathSrc.lang,
    fallback: 'es-es',
    createLangDirs: false,  // IMPORTANTE: si está en true, crea un directorio para cada idioma en lugar de crear un index-{lang}.html por cada idioma.
    inline: localization
    // allowEmpty: true
};


// Configuración de Gulp: minificar HTML
// Documentación general: https://www.npmjs.com/package/gulp-htmlmin
// Documentación de las opciones: https://github.com/kangax/html-minifier
var htmlminOptions = {
    collapseWhitespace: true,
    removeComments: true,
    ignoreCustomComments:  // Importante para el uso del plugin gulp-html-replace
                            [
                                /^<!-- build:remove -->!/,
                                /^<!-- endbuild -->!/
                            ],
    // ignoreCustomFragments: // USAR PARA PHP?
};


// Configuración de Gulp: ubicación de los archivos de destino
var dist = "./dist";
var filesPathDest = {
    dist:     dist,
    html:     dist + "/" + localization,
    css:      dist + "/" + localization + "/css",
    js:       dist + "/" + localization + "/js",
    img:      dist + "/" + localization + "/img",
    iframes:  dist + "/" + localization + "/iframes"
}


// Configuración de Gulp: SASS
// Documentación: https://github.com/sass/node-sass#options
var sassOptions = {
    // outputStyle: 'compressed'
};


// Configuración de Gulp: stripCssComments
// Documentación: https://github.com/sindresorhus/strip-css-comments#options
var stripCssCommentsOptions = {
    preserve: false  // Borrar comentarios CSS /*! */ (como el de Bootstrap)
};


// Configuración de Gulp: Autoprefixer
// Documentación: https://github.com/postcss/autoprefixer#options
var autoprefixerOptions = {
    // MUCHO CUIDADO: el parámetro browsers es IMPRESCINDIBLE, pero NO debe estar definido aquí (en autoprefixerOptions), sino en package.json, porque indica que a qué navegadores estamos dando soporte y esta información puede ser utilizada por varios plugins. Documentación: https://github.com/postcss/autoprefixer#options. Ver qué configuración usa el Autoprefixer Online: https://autoprefixer.github.io/ y ver "Browserslist".
    // cascade: false,
};


// Configuración de Gulp: Inline CSS
// Documentación: https://www.npmjs.com/package/gulp-inline-css
/* var inlineCssOptions = {
    preserveMediaQueries: true
}; */


// Configuración de Gulp: Inject CSS
// Documentación: https://www.npmjs.com/package/gulp-style-inject
var styleInjectOptions = {
    // encapsulated: true
};


// (No usado) Configuración de Gulp: notificaciones de tareas completadas correctamente
notifier.defaults({
    messages: {
        html:  "HTML se ha compilado correctamente!",
        sass: "CSS de SASS se ha compilado correctamente!",
        less: "CSS de LESS se ha compilado correctamente!",
        js:   "JS se ha compilado correctamente!"
    },
    prefix: "=====",  // Añadir un prefijo a las notificaciones de la terminal
    suffix: "=====",  // Añadir un sufijo a las notificaciones de la terminal
    exclusions: ".map"  // Excluir las notificaciones sobre los archivos .map
});


/***** Fin de: Configuración de Gulp *****/




/***** Configuración de la web *****/


// Configuración de la web: URL de desarrollo
const url_desarrollo = "https://192.168.1.42:3000";  // TODO: si cambia la URL de desarrollo, también hay que cambiarla en todos los archivos de la carpeta src y también en la tarea watch().


// Configuración de la web: URL de producción
switch ( localization ) {

    case "es-es": {
        url_produccion = "https://davidborge.es/architecturer";
        //  url_produccion = "https://localhost/architecturer/dist/es-es";
        break;
    }

    case "en": {
        url_produccion = "https://davidborge.com/architecturer";
        //  url_produccion = "https://localhost/architecturer/dist/en";
        break;
    }

    default:
        break;

}


/***** Fin de: Configuración de la web *****/




/**** Plantilla de tareas de Gulp ****/

// Tarea Gulp: plantilla de tareas de Gulp.
// Instalación: COMANDO_INSTALACION
// Documentación: URL_A_NPMJS_COM
// Para ejecturarla, escribir en la terminal: gulp plantilla_de_tareas
function plantilla_de_tareas(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'plantilla_de_tareas'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp plantilla_de_tareas!");  // Imprime el mensaje en la terminal
    return gulp  // CUIDADO: hay que añadir el return para indicar a Gulp que la tarea ha terminado.
        .src( "" )
        .pipe( dest() );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'plantilla_de_tareas' after xxxx ms

}
exports.plantilla_de_tareas = plantilla_de_tareas;

/**** Fin de: Plantilla de tareas de Gulp ****/



/**** Listado de tareas de Gulp (hasta el final del archivo) ****/

// Tarea Gulp: plantillas HTML.
// Para incluir los archivos HTML (o de otro tipo) unos en otros, usar: @@include('ruta/relativa/al/archivo/actual/archivo_a_incluir.html')
// Nota: se pueden usar condicionales (if) y bucles (for)
// Instalación: npm install --save-dev gulp-file-include
// Documentación: https://www.npmjs.com/package/gulp-file-include
// Para ejecturarla, escribir en la terminal: gulp plantillas_html_con_multiidioma_y_manejar_errores

// |- Multi-idioma.
//    Instalación: npm install --save-dev gulp-html-i18n
//    Documentación: https://www.npmjs.com/package/gulp-html-i18n
//    Referencia de proyecto Gulp con multi-idioma: https://github.com/ChrisLowe-Takor/static-gulp-i18n-website-template

// |- Mostrar errores en la terminal y en las notificaciones del Sistema Operativo.
//    Instalación de plumber:  npm install --save-dev gulp-plumber
//    Instalación de notifier: npm install --save-dev gulp-notifier
//    Documentación del plumber: https://www.npmjs.com/package/gulp-plumber
//    Documentación de notifier: https://www.npmjs.com/package/gulp-notifier
function plantillas_html_con_multiidioma_y_manejar_errores(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'plantillas_html_con_multiidioma_y_manejar_errores'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp plantillas_html_con_multiidioma_y_manejar_errores!");  // Imprime el mensaje en la terminal
    return gulp
        .src( [filesPathSrc.html] )  // Objeto filesPathSrc definido arriba.
        .pipe( plumber({ errorHandler: notifier.error }) )  // Mostrar errores en la terminal y las notificaciones del Sistema Operativo. Debe ir después de gulp.src().
        .pipe( fileinclude({
                prefix: '@@',
                basepath: '@file'
            }) )
        .pipe( i18n(i18nOptions) )
        .pipe( dest(filesPathDest.html) );
        // .pipe( notifier.success( "html" ) );  // Notificar cuando el HTML se ha compilado correctamente. Variable definida en notifier.defaults más arriba.

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'plantillas_html_con_multiidioma_y_manejar_errores' after xxxx ms

}
exports.plantillas_html_con_multiidioma_y_manejar_errores = plantillas_html_con_multiidioma_y_manejar_errores;



// Tarea Gulp: convertir SASS en CSS + añadir CSS sourcemaps + minificar CSS + renombrar el CSS minificado añadiendo el  ".min". + mostrar errores en la terminal
// Instalación: npm install --save-dev sass gulp-sass
// Documentación: https://www.npmjs.com/package/gulp-sass
// Para ejecturarla, escribir en la terminal: gulp convertir_sass_en_css_con_plantillas_y_sourcemaps_y_anadir_sufijo_min_y_manejar_errores

// |- Plantillas de archivos.
//    Para incluir los archivos HTML (o de otro tipo) unos en otros, usar: @@include('ruta/relativa/al/archivo/actual/archivo_a_incluir.html')
//    Nota: se pueden usar condicionales (if) y bucles (for)
//    Instalación: npm install --save-dev gulp-file-include
//    Documentación: https://www.npmjs.com/package/gulp-file-include
//    Para ejecturarla, escribir en la terminal: gulp plantillas_html_con_multiidioma_y_manejar_errores

// |- CSS sourcemaps: son archivos que linkan los archivos SCSS de origen con los archivos CSS de destino en las Herramientas de desarrollo del navegador, de manera que sepamos de qué archivo de origen viene cada propiedad CSS.
//    Instalación: npm install --save-dev gulp-sourcemaps
//    Documentación: https://www.npmjs.com/package/gulp-sourcemaps

// |- Mostrar errores en la terminal y en las notificaciones del Sistema Operativo.
//    Instalación de plumber:  npm install --save-dev gulp-plumber
//    Instalación de notifier: npm install --save-dev gulp-notifier
//    Documentación del plumber: https://www.npmjs.com/package/gulp-plumber
//    Documentación de notifier: https://www.npmjs.com/package/gulp-notifier
function convertir_sass_en_css_con_plantillas_y_sourcemaps_y_anadir_sufijo_min_y_manejar_errores(terminar_tarea) {

    // En la terminal, se indica el inicio de esta tarea con: Starting 'convertir_sass_en_css_con_plantillas_y_sourcemaps_y_anadir_sufijo_min_y_manejar_errores'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp convertir_sass_en_css_con_plantillas_y_sourcemaps_y_anadir_sufijo_min_y_manejar_errores!");  // Imprime el mensaje en la terminal
    return gulp
        .src(    // Nota: para no incluir archivos o carpetas, primero creamos un array de selecciones con [] y ponemos ! delante de los archivos o carpetas que no queramos seleccionar. Documentación: https://gulpjs.com/docs/en/getting-started/explaining-globs/
           [
                filesPathSrc.sass,  // Objeto filesPathSrc definido arriba.
                // "!./src/sass/no-procesar-este-archivo.scss"
            ]
        )
        .pipe( plumber({ errorHandler: notifier.error }) )  // Mostrar errores en la terminal y en las notificaciones del Sistema Operativo. Debe ir después de gulp.src().
        .pipe( sourcemaps.init() )  // Inicializar los CSS sourcemaps. Debe hacerse antes de sass().
        .pipe( fileinclude({
            prefix: '@@',
            basepath: '@file'
        }) )
        .pipe( sass(sassOptions).on('error', sass.logError) )
        // .pipe( gulp.dest(filesPathDest.dist + "/css") )  // Opcional: sacar los archivos sin minificar si hace falta.
        .pipe( rename( function(path) {
            if( !path.extname.endsWith(".map") ) {  // Si no es un archivo sourcemap
                path.basename += ".min"  // Renombrar el CSS minificado añadiendo el sufijo ".min". Debe ir justo antes de gulp.dest(). El parámetro es el nombre del archivo de salida.
            }
        } ))
        .pipe( sourcemaps.write(".") )  // Escribir los archivos de sourcemaps. Debe hacerse antes de gulp.dest(). El punto especifica la ubicación (¿?).
        .pipe( gulp.dest(filesPathDest.css) )
        .pipe( browserSync.stream() );  // MUY IMPORTANTE: poniendo esto, cuando esté ejecutando la tarea de desarrollo, el CSS se actualiza automáticamente SIN necesidad de recargar la página. Documentación: https://browsersync.io/docs/gulp
        // .pipe( notifier.success( "sass" ) );  // Notificar cuando el CSS de SASS se ha compilado correctamente. Variable definida en notifier.defaults más arriba.

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'watch' after xxxx ms

}
exports.convertir_sass_en_css_con_plantillas_y_sourcemaps_y_anadir_sufijo_min_y_manejar_errores = convertir_sass_en_css_con_plantillas_y_sourcemaps_y_anadir_sufijo_min_y_manejar_errores;



// Tarea Gulp: convertir LESS en CSS + añadir CSS sourcemaps + minificar CSS + renombrar el CSS minificado añadiendo el  ".min".
// Instalación: npm install --save-dev gulp-less
// Documentación: https://www.npmjs.com/package/gulp-less
// Para ejecturarla, escribir en la terminal: gulp convertir_less_en_css_con_sourcemaps_y_anadir_sufijo_min_y_manejar_errores

// |- CSS sourcemaps: son archivos que linkan los archivos SCSS de origen con los archivos CSS de destino en las Herramientas de desarrollo del navegador, de manera que sepamos de qué archivo de origen viene cada propiedad CSS.
//    Instalación: npm install gulp-sourcemaps
//    Documentación: https://www.npmjs.com/package/gulp-sourcemaps

// |- Minificar CSS (eliminar espacios e indexaciones inncesarias, eliminar comentarios).
//    Instalación: npm install --save-dev gulp-cssnano
//    Documentación: https://www.npmjs.com/package/gulp-cssnano

// |- Renombrar el CSS minificado añadiendo el sufijo ".min".
//    Instalación: npm install --save-dev gulp-rename
//    Documentación: https://www.npmjs.com/package/gulp-rename
function convertir_less_en_css_con_sourcemaps_y_anadir_sufijo_min_y_manejar_errores(terminar_tarea) {

    // En la terminal, se indica el inicio de esta tarea con: Starting 'convertir_less_en_css_con_sourcemaps_y_anadir_sufijo_min_y_manejar_errores'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp convertir_less_en_css_con_sourcemaps_y_anadir_sufijo_min_y_manejar_errores!");  // Imprime el mensaje en la terminal
    return gulp
        .src( filesPathSrc.less )  // Objeto filesPathSrc definido arriba.
        .pipe( plumber({ errorHandler: notifier.error }) )  // Mostrar errores en la terminal y las notificaciones del Sistema Operativo. Debe ir después de gulp.src().
        .pipe( sourcemaps.init() )  // Inicializar los CSS sourcemaps. Debe hacerse antes de less().
        .pipe( less() )
        // .pipe( gulp.dest(filesPathDest.dist + "/css") )  // Opcional: sacar los archivos sin minificar si hace falta.
        .pipe( rename( function(path) {
            if( !path.extname.endsWith(".map") ) {  // Si no es un archivo sourcemap
                path.basename += ".min"  // Renombrar el CSS minificado añadiendo el sufijo ".min". Debe ir justo antes de gulp.dest(). El parámetro es el nombre del archivo de salida.
            }
        } ))
        .pipe( sourcemaps.write(".") )  // Escribir los archivos de sourcemaps. Debe hacerse antes de gulp.dest(). El punto especifica la ubicación (¿?).
        .pipe( gulp.dest(filesPathDest.css) )
        .pipe( browserSync.stream() );  // MUY IMPORTANTE: poniendo esto, cuando esté ejecutando la tarea de desarrollo, el CSS se actualiza automáticamente SIN necesidad de recargar la página. Documentación: https://browsersync.io/docs/gulp
        // .pipe( notifier.success( "less" ) );  // Notificar cuando el CSS de LESS se ha compilado correctamente.   // Variable definida en notifier.defaults más arriba.;

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'watch' after xxxx ms

}
exports.convertir_less_en_css_con_sourcemaps_y_anadir_sufijo_min_y_manejar_errores = convertir_less_en_css_con_sourcemaps_y_anadir_sufijo_min_y_manejar_errores;



// Tarea Gulp: compilar (transpilar) JS con Babel + concatenar JS (unir todos los archivos JS en uno solo) + minificar JS (eliminar espacios e indexaciones inncesarias, eliminar comentarios) + renombrar el JS minificado añadiendo el  ".min".
// Instalación: npm install --save-dev gulp-babel @babel/core @babel/preset-env
// Documentación: https://www.npmjs.com/package/gulp-babel
// Explicación de Babel: https://babeljs.io/
// Para ejecturarla, escribir en la terminal: gulp compilar_js_y_concatenar_y_minificar_y_anadir_sufijo_min

// |- Concatenar JS (unir todos los archivos JS en uno solo).
//    Instalación: npm install --save-dev gulp-concat
//    Documentación: https://www.npmjs.com/package/gulp-concat

// |- Minificar JS (unir todos los archivos JS en uno solo).
//    Instalación: npm install --save-dev gulp-uglify
//    Documentación: https://www.npmjs.com/package/gulp-uglify

// |- Renombrar el JS minificado añadiendo el sufijo ".min".
//    Instalación: npm install gulp-rename
//    Documentación: https://github.com/hparra/gulp-rename
function compilar_js_y_concatenar_y_minificar_y_anadir_sufijo_min(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'compilar_js_y_concatenar_y_minificar_y_anadir_sufijo_min'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp compilar_js_y_concatenar_y_minificar_y_anadir_sufijo_min!");  // Imprime el mensaje en la terminal
    
    var array_tareas = [];

    // Nueva tarea al array de tareas
    // JS que quiero combinar en uno solo (main.min.js)
    array_tareas.push(

        gulp
            .src( [
                filesPathSrc.js,
                "!" + filesPathSrc.serviceworkers,
                "!" + "./src/js/offline.js"
            ] )  // Objeto filesPathSrc definido arriba.  // Archivos JS de origen si no importa el orden en el que los voy a concatenar o si no los quiero concatenar.
            /* .src( [  // Archivos JS de origen si quiero concatenarlos en un orden concreto.
                        "./src/js/mis-scripts.js",
                        "./src/js/alert.js"
                    ] ) */
            .pipe( plumber({ errorHandler: notifier.error }) )  // Mostrar errores en la terminal y las notificaciones del Sistema Operativo. Debe ir después de gulp.src().
            .pipe( babel({
                        presets: [ "@babel/env" ]
                    }) )
            .pipe( concat("main.js") )  // Concatenar JS (unir todos los archivos JS en uno solo). Debe hacerse antes de la minificación y de añadir el sufijo ".min". El parámetro es el nombre del archivo final (que contiene el código de todos los archivos JS en uno solo).
            .pipe( uglify() )  // Minificar JS
            .pipe( rename({
                            suffix: ".min"  // Renombrar el CSS minificado añadiendo el sufijo ".min". Debe ir justo antes de gulp.dest(). El parámetro es el nombre del archivo de salida.
                            }) )
            .pipe( gulp.dest(filesPathDest.js) )
            // .pipe( notifier.success( "js" ) );  // Notificar cuando el JS se ha compilado correctamente.   // Variable definida en notifier.defaults más arriba.;

    );

    // Nueva tarea al array de tareas
    // JS que NO quiero combinar en uno solo, sino que los quiero mantener separados
    array_tareas.push(

        gulp
            .src( [
                "./src/js/offline.js"
            ] )
            .pipe( plumber({ errorHandler: notifier.error }) )  // Mostrar errores en la terminal y las notificaciones del Sistema Operativo. Debe ir después de gulp.src().
            .pipe( uglify() )  // Minificar JS
            .pipe( rename({
                            suffix: ".min"  // Renombrar el CSS minificado añadiendo el sufijo ".min". Debe ir justo antes de gulp.dest(). El parámetro es el nombre del archivo de salida.
                            }) )
            .pipe( gulp.dest(filesPathDest.js) )
            // .pipe( notifier.success( "js" ) );  // Notificar cuando el JS se ha compilado correctamente.   // Variable definida en notifier.defaults más arriba.;

    );

    return mergeStream(array_tareas);

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'compilar_js_y_concatenar_y_minificar_y_anadir_sufijo_min' after xxxx ms

}
exports.compilar_js_y_concatenar_y_minificar_y_anadir_sufijo_min = compilar_js_y_concatenar_y_minificar_y_anadir_sufijo_min;



// Tarea Gulp: minificar JS de Service Workers (eliminar espacios e indexaciones inncesarias, eliminar comentarios) + renombrar el JS minificado añadiendo el  ".min".
// Para ejecturarla, escribir en la terminal: gulp js_service_workers_minificar_y_anadir_sufijo_min

// |- Minificar JS (unir todos los archivos JS en uno solo).
//    Instalación: npm install --save-dev gulp-uglify
//    Documentación: https://www.npmjs.com/package/gulp-uglify

// |- Renombrar el JS minificado añadiendo el sufijo ".min".
//    Instalación: npm install gulp-rename
//    Documentación: https://github.com/hparra/gulp-rename
function js_service_workers_minificar_y_anadir_sufijo_min(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'js_service_workers_minificar_y_anadir_sufijo_min'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp js_service_workers_minificar_y_anadir_sufijo_min!");  // Imprime el mensaje en la terminal
    return gulp
        .src( [
            filesPathSrc.serviceworkers
        ] )  // Objeto filesPathSrc definido arriba.
        .pipe( plumber({ errorHandler: notifier.error }) )  // Mostrar errores en la terminal y las notificaciones del Sistema Operativo. Debe ir después de gulp.src().
        .pipe( uglify() )  // Minificar JS
        .pipe( rename({
                        suffix: ".min"  // Renombrar el CSS minificado añadiendo el sufijo ".min". Debe ir justo antes de gulp.dest(). El parámetro es el nombre del archivo de salida.
                        }) )
.pipe( gulp.dest(filesPathDest.html ) );  // CUIDADO: los archivos JS de los Service Workers deben ir a la altura del HTML en las builds.
        // .pipe( notifier.success( "js" ) );  // Notificar cuando el JS se ha compilado correctamente.   // Variable definida en notifier.defaults más arriba.;

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'js_service_workers_minificar_y_anadir_sufijo_min' after xxxx ms

}
exports.js_service_workers_minificar_y_anadir_sufijo_min = js_service_workers_minificar_y_anadir_sufijo_min;



// Tarea Gulp: inyectar el JS en el HTML.
// Instalación: npm install --save-dev gulp-inject-in-html
// Documentación: https://www.npmjs.com/package/gulp-inject-in-html
// Para ejecturarla, escribir en la terminal: gulp inyectar_el_js_en_el_html
function inyectar_el_js_en_el_html(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'inyectar_el_js_en_el_html'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp inyectar_el_js_en_el_html!");  // Imprime el mensaje en la terminal
    return gulp  // CUIDADO: hay que añadir el return para indicar a Gulp que la tarea ha terminado.
        .src( filesPathDest.html + '/**/*.html' )
        .pipe( injectHTML() )
        .pipe( dest(filesPathDest.html) );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'inyectar_el_js_en_el_html' after xxxx ms

}
exports.inyectar_el_js_en_el_html = inyectar_el_js_en_el_html;



// Tarea Gulp: generar y optimizar imágenes responsive (de distintos tamaños) (PNG, JPEG, GIF and SVG images) + caché de imágenes.
// Nota: las imágenes que no son compatibles con el plugin (JFIF, WEBP), simplemente se copian a la carpeta dist sin ningún cambio (si su extensión están en el src()).
// Instalación: npm install --save-dev gulp-image@6.2.1
// Nota sobre la instalación: hay que instalar la versión 6.2.1 como mucho, porque a partir de la 6.3.0 el plugin requiere uso de módulos ESM de JS, cosa que no estoy usando. Los que uso yo, se importan con const nombre = require('nombre_modulo');. Y los que requieren módulos ESM de JS se importan con import nombre from 'nombre_modulo';. Fuente: https://github.com/1000ch/gulp-image/releases, apartado v6.3.0
// Documentación: https://www.npmjs.com/package/gulp-image
// Para ejecturarla, escribir en la terminal: gulp generar_y_optimizar_imagenes_reponsive_con_cache

// |- Generar imágenes responsive (de distintos tamaños).
//    Importación: const srcset = require('gulp-srcset').default;
//      - MUCHO CUIDADO: si no se pone el .default, no funciona.
//    Instalación: npm install --save-dev gulp-srcset
//    Documentación: https://www.npmjs.com/package/gulp-srcset/v/2.1.0

// |- Caché de imágenes. Uso esto porque las imágenes tardan un tiempo en optimizarse y no queremos que eso pase cada vez que cambiemos cualquier cosa en el proyecto.
//    Instalación: npm install --save-dev gulp-cache
//    Documentación: https://www.npmjs.com/package/gulp-cache
//    IMPORTANTE: para limpiar la caché, ejecutar la tarea: gulp clear_cache
function generar_y_optimizar_imagenes_reponsive_con_cache(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'generar_y_optimizar_imagenes_reponsive_con_cache'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp generar_y_optimizar_imagenes_reponsive_con_cache!");  // Imprime el mensaje en la terminal
    
    var array_tareas = [];

    // Imágenes de las que hay que generar imágenes responsive
    array_tareas.push(

        gulp.src( [
                    filesPathSrc.img,
                    "!./src/img/favicon/**/*",
                    "!./src/img/logo/**/*"
                ] )
            .pipe( srcset([{
                    match:  '(min-width: 200px)',  // El tamaño mínimo o máximo de las imágenes de las cuales hay que generar imágenes responsive.
                    width:  [1, 1400, 1200, 992, 768, 600, 576, 400, 300],  // El 1 indica que también hay que tener la imagen original
                    format: ['jpg', 'webp']  // Formatos de imágenes que hay que generar
                }]) )
            .pipe( cache( image() ) )  // A imagemin() se le puede pasar un parámetro de configuración con distintas opciones para distintos tipos de archivo.
            .pipe( gulp.dest(filesPathDest.img) )

    );

    // Imágenes de las que NO hay que generar imágenes responsive
    array_tareas.push(

        gulp.src( [
                    "./src/img/favicon/**/*",
                ] )
            .pipe( cache( image() ) )  // A imagemin() se le puede pasar un parámetro de configuración con distintas opciones para distintos tipos de archivo.
            .pipe( gulp.dest(filesPathDest.img + "/favicon/") )

    );

    // Imágenes de las que NO hay que generar imágenes responsive
    array_tareas.push(

        gulp.src( [
                    "./src/img/logo/**/*",
                ] )
            .pipe( cache( image() ) )  // A imagemin() se le puede pasar un parámetro de configuración con distintas opciones para distintos tipos de archivo.
            .pipe( gulp.dest(filesPathDest.img + "/logo/") )

    );

    return mergeStream(array_tareas);

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'generar_y_optimizar_imagenes_reponsive_con_cache' after xxxx ms

}
exports.generar_y_optimizar_imagenes_reponsive_con_cache = generar_y_optimizar_imagenes_reponsive_con_cache;



// |- Optimizar una imagen. Uso esto porque las imágenes tardan un tiempo en optimizarse y no queremos que eso pase cada vez que cambiemos cualquier cosa en el proyecto.
//    Instalación: npm install --save-dev gulp-cache
//    Documentación: https://www.npmjs.com/package/gulp-cache
//    IMPORTANTE: para limpiar la caché, ejecutar la tarea: gulp clear_cache
function generar_y_optimizar_una_imagen_reponsive(terminar_tarea) {

    // En la terminal, se indica el inicio de esta tarea con: Starting 'generar_y_optimizar_una_imagen_reponsive'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp generar_y_optimizar_una_imagen_reponsive!");  // Imprime el mensaje en la terminal

    var array_tareas = [];

    // Imágenes de las que hay que generar imágenes responsive
    array_tareas.push(

        gulp.src( [
                    "./src/img/banderas/**/*.*"  // Poner aquí la imágen a optimizar
                ] )
            .pipe( srcset([{
                    // match:  '(min-width: 576px)',  // El tamaño mínimo o máximo de las imágenes de las cuales hay que generar imágenes responsive.
                    width:  [1],  // El 1 indica que también hay que tener la imagen original
                    // width:  [1, 1400, 1200, 992, 768, 576],  // El 1 indica que también hay que tener la imagen original
                    format: ['svg']  // Formatos de imágenes que hay que generar
                    // format: ['jpg', 'webp']  // Formatos de imágenes que hay que generar
                }]) )
            .pipe( cache( image() ) )  // A imagemin() se le puede pasar un parámetro de configuración con distintas opciones para distintos tipos de archivo.
            .pipe( gulp.dest(filesPathDest.img + "/banderas") )

    );

    return mergeStream(array_tareas);

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'generar_y_optimizar_una_imagen_reponsive' after xxxx ms

}
exports.generar_y_optimizar_una_imagen_reponsive = generar_y_optimizar_una_imagen_reponsive;



// Tarea Gulp: combinar CSS, eliminar CSS innecesario; página por página.

// |- Eliminar CSS innecesario.
//    Instalación: npm install --save-dev gulp-purgecss
//    Documentación: https://www.npmjs.com/package/gulp-purgecss

// |- Autoprefixer CSS.
//    Instalación: npm install --save-dev gulp-autoprefixer
//    Documentación: https://www.npmjs.com/package/gulp-autoprefixer
//    Opciones: https://github.com/postcss/autoprefixer#options

// |- Minificar CSS (eliminar espacios e indexaciones inncesarias, eliminar comentarios).
//    Instalación: npm install --save-dev gulp-cssnano
//    Documentación: https://www.npmjs.com/package/gulp-cssnano

// |- Borrar comentarios CSS /*! */ (como el de Bootstrap)
//    Instalación: npm install --save-dev gulp-strip-css-comments
//    Documentación: https://www.npmjs.com/package/gulp-strip-css-comments

// |- Loopear una tarea de Gulp (para aplicarla a varios archivos).
//    Instalación: no hace falta.
//    Documentación: https://www.npmjs.com/package/merge-stream
function combinar_css_y_eliminar_innecesario_y_minimizar_y_autoprefixer_y_borrar_comentarios(terminar_tarea) {

    var array_tareas = [];

    // Listar todos los archivos de ./dist/location en un array
    var array_archivos = fs.readdirSync( filesPathDest.html );

    // Comprobación
    // console.log( array_archivos );

    // Loopear todos los archivos de ./dist/location
    array_archivos.forEach( function(archivo, indice)  {

        // Solo tratar los archivos HTML
        if( archivo.endsWith(".html") == true && archivo != "error-404.html" && archivo != "error-405.html" && archivo != "error-500.html" && archivo != "error-505.html" ) {

            // Comprobación
            // console.log(archivo, indice);

            // Quitar la extensión al nombre del archivo
            archivo = archivo.replace(/\.[^/.]+$/, "");

            // PurgeCSS contrasta las páginas de error contra error-403.html
            if ( archivo == "error-403" ) {
                archivo = "error-xxx";
                archivo_purgecss = "error-403";
            } else {
                archivo_purgecss = archivo;
            }

            // Nueva tarea al array de tareas
            array_tareas.push(

                gulp.src( [  // CSS del que se va a eliminar lo no usado
                            
                            // Estilos generales
                            filesPathDest.css + "/vendor/**/*.css",
                            filesPathDest.css + "/partials/**/*.css",
                            filesPathDest.css + "/main/**/*.css",
                            
                            // Estilos de esta página
                            filesPathDest.css + "/" + archivo + "/**/*.css",

                        ] )
                    .pipe( concat(archivo + ".para-meter-en-style.min.css") )  // Concatenar CSS (unir todos los archivos CSS de esta página en uno solo). El parámetro es el nombre del archivo final (que contiene el código de todos los archivos CSS en uno solo).
                    .pipe( purgecss({  // eliminar CSS innecesario.
                            content: [filesPathDest.html + "/" + archivo_purgecss + ".html"]  // HTML que tiene que mirar el plugin para ver qué CSS no se está usando.
                        }) )
                    .pipe( cssnano() )  // Minificar CSS (eliminar espacios e indexaciones inncesarias, eliminar comentarios). Debe ejecutarse después de sass().
                    .pipe( autoprefixer(autoprefixerOptions) )  // MUCHO CUIDADO: el parámetro browsers es IMPRESCINDIBLE, pero NO debe estar definido aquí (en autoprefixerOptions), sino en package.json, porque indica que a qué navegadores estamos dando soporte y esta información puede ser utilizada por varios plugins. Documentación: https://github.com/postcss/autoprefixer#options. Ver qué configuración usa el Autoprefixer Online: https://autoprefixer.github.io/ y ver "Browserslist".
                    .pipe( stripCssComments(stripCssCommentsOptions) )  // Borrar comentarios CSS /*! */ (como el de Bootstrap)
                    .pipe( dest(filesPathDest.dist + "/para-meter-en-style") )
                    .pipe(browserSync.stream())

            );

        }

    });

    return mergeStream(array_tareas);

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'combinar_css_y_eliminar_innecesario_y_minimizar_y_autoprefixer_y_borrar_comentarios' after xxxx ms
    
}
exports.combinar_css_y_eliminar_innecesario_y_minimizar_y_autoprefixer_y_borrar_comentarios = combinar_css_y_eliminar_innecesario_y_minimizar_y_autoprefixer_y_borrar_comentarios;



// Tarea Gulp: autoprefixer CSS en línea.
// Instalación: npm install --save-dev gulp-inline-autoprefixer
// Documentación: https://www.npmjs.com/package/gulp-inline-autoprefixer
function autoprefixer_css_en_linea(terminar_tarea) {

    return gulp.src(
                    [
                        filesPathDest.html + '/**/*.html'
                    ]
                )
                .pipe( htmlInlineAutoprefixer() )

                // Inyecto las dos etiquetas <style amp-boilerplate> porque htmlInlineAutoprefixer() las modifica, cuando no hay que hacerlo.
                .pipe( inject.after('<style amp-boilerplate>', 'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}') )
                .pipe( inject.after('<noscript><style amp-boilerplate>', 'body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}') )
                
                .pipe( dest(filesPathDest.html) );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'autoprefixer_css_en_linea' after xxxx ms
    
}
exports.autoprefixer_css_en_linea = autoprefixer_css_en_linea;



// Tarea Gulp: Inyectar el CSS generado en <style amp-custom>.
// Instalación: npm install --save-dev gulp-inject-string
// Documentación: https://www.npmjs.com/package/gulp-inject-string

// |- Loopear una tarea de Gulp (para aplicarla a varios archivos).
//    Instalación: no hace falta.
//    Documentación: https://www.npmjs.com/package/merge-stream
function inyectar_el_css_generado_en_style_tag(terminar_tarea) {

    var array_tareas = [];

    // Listar todos los archivos de ./dist/location en un array
    var array_archivos = fs.readdirSync( filesPathDest.html );

    // Comprobación
    // console.log( array_archivos );

    // Loopear todos los archivos de ./dist/location
    array_archivos.forEach( function(archivo, indice)  {

        // Solo tratar los archivos HTML
        if( archivo.endsWith(".html") == true ) {

            // Comprobación
            // console.log(archivo, indice);

            // Quitar la extensión al nombre del archivo
            archivo = archivo.replace(/\.[^/.]+$/, "");

            // El CSS de las páginas de error está en error-xxx.para-meter-en-style.min.css
            if ( archivo == "error-403" || archivo == "error-404" || archivo == "error-405" || archivo == "error-500" || archivo == "error-505" ) {
                archivo_csscontent = "error-xxx";
            } else {
                archivo_csscontent = archivo;
            }

            // Leer el contenido del archivo con el CSS
            var cssContent = fs.readFileSync(filesPathDest.dist + "/para-meter-en-style/" + archivo_csscontent + ".para-meter-en-style.min.css", "utf8");
            
            // Nueva tarea al array de tareas
            array_tareas.push(

                gulp
                    .src( filesPathDest.html + '/' + archivo + '.html' )
                    .pipe( inject.after('style amp-custom>', cssContent) )
                    .pipe( inject.replace('!important', '') )  // Eliminar los !important porque AMP no los permite.
                    .pipe( gulp.dest(filesPathDest.html) )

            );

        }

    });

    return mergeStream(array_tareas);
        
    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'inyectar_el_css_generado_en_style_tag' after xxxx ms

}
exports.inyectar_el_css_generado_en_style_tag = inyectar_el_css_generado_en_style_tag;



// Tarea Gulp: Minificar HTML.
// Instalación: npm install --save-dev gulp-htmlmin
// Documentación: https://www.npmjs.com/package/gulp-htmlmin
// Documentación de las opciones: https://github.com/kangax/html-minifier
function minificar_html(terminar_tarea) {

    return gulp
        .src( filesPathDest.html + '/**/*.html' )
        .pipe( htmlmin(htmlminOptions) )
        .pipe( gulp.dest(filesPathDest.html) );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'minificar_html' after xxxx ms

}
exports.minificar_html = minificar_html;



// Tarea Gulp: Minificar JSON en línea.
// Minifies inline <script> tags containing JSON data, i.e. application/json and application/ld+json.
// Instalación: npm install --save-dev gulp-minify-inline-json
// Documentación: https://www.npmjs.com/package/gulp-minify-inline-json
function minificar_json_en_linea(terminar_tarea) {

    return gulp
        .src( filesPathDest.html + '/**/*.html' )
        .pipe( minifyInlineJSON() )
        .pipe( gulp.dest(filesPathDest.html) );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'minificar_json_en_linea' after xxxx ms

}
exports.minificar_json_en_linea = minificar_json_en_linea;



// Tarea Gulp: Minificar archivos JSON.
// Instalación: npm install --save-dev gulp-json-minify
// Documentación: https://www.npmjs.com/package/gulp-json-minify
function minificar_archivos_json(terminar_tarea) {

    return gulp
        .src( filesPathDest.html + '/**/*.json' )
        .pipe( jsonMinify() )
        .pipe( gulp.dest(filesPathDest.html) );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'minificar_archivos_json' after xxxx ms

}
exports.minificar_archivos_json = minificar_archivos_json;



// Tarea Gulp: Borrar carpetas innecesarias de dist (para las builds)
function borrar_carpetas_innecesarias_de_dist(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'borrar_carpetas_innecesarias_de_dist'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp borrar_carpetas_innecesarias_de_dist!");  // Imprime el mensaje en la terminal
    return del( [
                    filesPathDest.dist + "/para-meter-en-style",
                    filesPathDest.css,
                    filesPathDest.js,
                    filesPathDest.html + "/partials",
                    filesPathDest.html + "/iframes"  // No uso iframes en esta web
                ] );

    // return del( [filesPathDest.dist + "/**/*"] );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'borrar_carpetas_innecesarias_de_dist' after xxxx ms

}
exports.borrar_carpetas_innecesarias_de_dist = borrar_carpetas_innecesarias_de_dist;



// Tarea Gulp: Borrar enlaces a CSS
// Instalación: npm install --save-dev gulp-html-replace
// Documentación: https://www.npmjs.com/package/gulp-html-replace
function borrar_enlaces_a_css(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'borrar_enlaces_a_css'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp borrar_enlaces_a_css!");  // Imprime el mensaje en la terminal
    return gulp
        .src( filesPathDest.html + "/*.html" )
        .pipe( htmlreplace({
                            'remove': '',
                            // 'js': 'js/bundle.min.js'
                        }) )
        .pipe( gulp.dest(filesPathDest.html) );

    // return del( [filesPathDest.dist + "/**/*"] );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'borrar_enlaces_a_css' after xxxx ms

}
exports.borrar_enlaces_a_css = borrar_enlaces_a_css;



// Tarea Gulp: copiar otros archivos a dist (.htaccess, sitemap.xml, robots.txt, manifest.json, PDFs, etc.).
// Para ejecturarla, escribir en la terminal: gulp otros_archivos
function copiar_otros_archivos_a_dist(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'copiar_otros_archivos_a_dist'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp copiar_otros_archivos_a_dist!");  // Imprime el mensaje en la terminal

    // .htaccess
    var tarea1 = gulp.src(
                            ['./src/.htaccess']
                        )
                      .pipe( gulp.dest(filesPathDest.html) );

    // sitemap.xml
    var tarea2 = gulp.src(
                            ['./src/sitemap.xml']
                        )
                      .pipe( gulp.dest(filesPathDest.html) );

    // robots.txt
    var tarea3 = gulp.src(
                            ['./src/robots.txt']
                        )
                      .pipe( gulp.dest(filesPathDest.html) );

    // manifest.json
    var tarea4 = gulp.src(
                            ['./src/img/favicon/manifest.json']
                        )
                      .pipe( gulp.dest(filesPathDest.img + "/favicon/") );

    // Fuentes
    var tarea5 = gulp.src(
                            ['./src/fonts/**/*']
                        )
                      .pipe( gulp.dest(filesPathDest.html + "/fonts/") );

    // Archivos PHP
    var tarea6 = gulp.src(
                            ['./src/**/*.php']
                        )
                      .pipe( gulp.dest(filesPathDest.html) );

    // Carpeta "vendor" (generado por Composer para poder usar PHPMailer)
    var tarea7 = gulp.src(
                            ['./vendor/**/*'],
                            { base:"." }  // Si no se pone esto, no se respeta bien la estructura de carpetas al copiar.
                         )
                      .pipe( gulp.dest(filesPathDest.html) );

    // Archivos HTML que incluyo con iframes
    var tarea8 = gulp.src(
                            ['./src/iframes/**/*']
                        )
                      .pipe( gulp.dest(filesPathDest.html + "/iframes/") );
    
    // Vídeos
    var tarea9 = gulp.src(
                            [
                                './src/**/*.mp4',
                                './src/**/*.webm'
                            ]
                        )
                      .pipe( gulp.dest(filesPathDest.html) );
                                
    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'copiar_otros_archivos_a_dist' after xxxx ms

    return [ tarea1, tarea2, tarea3, tarea4, tarea5, tarea6, tarea7, tarea8, tarea9 ];

}
exports.copiar_otros_archivos_a_dist = copiar_otros_archivos_a_dist;



// Tarea Gulp: Reemplazar la URL de desarrollo por la URL de producción
// Instalación: npm install --save-dev gulp-inject-string
// Documentación: https://www.npmjs.com/package/gulp-inject-string
function reemplazar_url_desarrollo_por_url_produccion(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'reemplazar_url_desarrollo_por_url_produccion'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp reemplazar_url_desarrollo_por_url_produccion!");  // Imprime el mensaje en la terminal
    return gulp
        .src( [
                filesPathDest.html + '/**/*.html',
                filesPathDest.html + '/**/*.php',
                filesPathDest.html + '/**/.htaccess',
                filesPathDest.html + '/**/robots.txt',
                filesPathDest.html + '/**/manifest.json',
                filesPathDest.html + '/**/*.js',  // JS y Service Workers
            ] )
        .pipe( inject.replace( url_desarrollo,  url_produccion) )
        .pipe( gulp.dest(filesPathDest.html) );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'reemplazar_url_desarrollo_por_url_produccion' after xxxx ms

}
exports.reemplazar_url_desarrollo_por_url_produccion = reemplazar_url_desarrollo_por_url_produccion;



// Tarea Gulp: Reemplazar otros textos
// Instalación: npm install --save-dev gulp-inject-string
// Documentación: https://www.npmjs.com/package/gulp-inject-string
function reemplazar_otros_textos(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'reemplazar_otros_textos'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp reemplazar_otros_textos!");  // Imprime el mensaje en la terminal
    var array_tareas = [];

    // Nueva tarea al array de tareas
    // Quitar el atributo data-ampdevmode="true" de las etiquetas <amp-script>
    array_tareas.push(

        gulp
            .src( [
                    filesPathDest.html + '/**/*.html',
                    filesPathDest.html + '/**/*.php'
                ] )
            .pipe( inject.replace( " data-ampdevmode",  "") )
            .pipe( gulp.dest(filesPathDest.html) )

    );

    // Quitar el atributo amp del <html> de algunas páginas
    // Quitar el atributo data-ampdevmode="true" de las etiquetas <amp-script>
    array_tareas.push(

        gulp
            .src( [
                    filesPathDest.html + '/**/offline.html'
                ] )
            .pipe( inject.replace( "<html amp",  "<html") )
            .pipe( gulp.dest(filesPathDest.html) )

    );

    return mergeStream(array_tareas);

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'reemplazar_otros_textos' after xxxx ms

}
exports.reemplazar_otros_textos = reemplazar_otros_textos;



// Tarea Gulp: cambiar los nombres de los archivos en otros idiomas
//    Instalación: npm install --save-dev gulp-rename
//    Documentación: https://github.com/hparra/gulp-rename
function cambiar_nombres_archivos_en_otros_idiomas(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'cambiar_nombres_archivos_en_otros_idiomas'...


    /**** EN -> ES ****/
    if( localization == "es-es" ) {

        // Código que se ejecutará al ejecutar esta tarea de Gulp
        // console.log("Hola desde la tarea de Gulp cambiar_nombres_archivos_en_otros_idiomas!");  // Imprime el mensaje en la terminal
        var array_tareas = [];

        
        // about-us.html -> sobre-nosotros.html
        array_tareas.push(

            gulp
                .src( filesPathDest.dist + "/" + "es-es" + "/" + "about-us.html" )
                .pipe( rename( "sobre-nosotros.html") )
                .pipe( gulp.dest(filesPathDest.html) )

        );
        del( filesPathDest.dist + "/" + "es-es" + "/" + "about-us.html" );

        // contact.html -> contacto.html
        array_tareas.push(

            gulp
                .src( filesPathDest.dist + "/" + "es-es" + "/" + "contact.html" )
                .pipe( rename( "contacto.html") )
                .pipe( gulp.dest(filesPathDest.html) )

        );
        del( filesPathDest.dist + "/" + "es-es" + "/" + "contact.html" );

        // cookies-policy.html -> politica-de-cookies.html
        array_tareas.push(

            gulp
                .src( filesPathDest.dist + "/" + "es-es" + "/" + "cookies-policy.html" )
                .pipe( rename( "politica-de-cookies.html") )
                .pipe( gulp.dest(filesPathDest.html) )

        );
        del( filesPathDest.dist + "/" + "es-es" + "/" + "cookies-policy.html" );

        // legal-notice.html -> aviso-legal.html
        array_tareas.push(

            gulp
                .src( filesPathDest.dist + "/" + "es-es" + "/" + "legal-notice.html" )
                .pipe( rename( "aviso-legal.html") )
                .pipe( gulp.dest(filesPathDest.html) )

        );
        del( filesPathDest.dist + "/" + "es-es" + "/" + "legal-notice.html" );

        // privacy-policy.html -> politica-de-privacidad.html
        array_tareas.push(

            gulp
                .src( filesPathDest.dist + "/" + "es-es" + "/" + "privacy-policy.html" )
                .pipe( rename( "politica-de-privacidad.html") )
                .pipe( gulp.dest(filesPathDest.html) )

        );
        del( filesPathDest.dist + "/" + "es-es" + "/" + "privacy-policy.html" );

        // single-portfolio-1.html -> portfolio-individual-1.html
        array_tareas.push(

            gulp
                .src( filesPathDest.dist + "/" + "es-es" + "/" + "single-portfolio-1.html" )
                .pipe( rename( "portfolio-individual-1.html") )
                .pipe( gulp.dest(filesPathDest.html) )

        );
        del( filesPathDest.dist + "/" + "es-es" + "/" + "single-portfolio-1.html" );

        // single-portfolio-2.html -> portfolio-individual-2.html
        array_tareas.push(

            gulp
                .src( filesPathDest.dist + "/" + "es-es" + "/" + "single-portfolio-2.html" )
                .pipe( rename( "portfolio-individual-2.html") )
                .pipe( gulp.dest(filesPathDest.html) )

        );
        del( filesPathDest.dist + "/" + "es-es" + "/" + "single-portfolio-2.html" );
       

        return mergeStream(array_tareas);
 
    }

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'cambiar_nombres_archivos_en_otros_idiomas' after xxxx ms

}
exports.cambiar_nombres_archivos_en_otros_idiomas = cambiar_nombres_archivos_en_otros_idiomas;



// Tarea Gulp: AMP Optimizer.
// Instalación: npm install --save-dev @ampproject/toolbox-optimizer
// Documentación: https://amp.dev/es/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/node-amp-optimizer/?format=websites
// Documentación: https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp
function amp_optimizer(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'amp_optimizer'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp amp_optimizer!");  // Imprime el mensaje en la terminal
    return  gulp.src( filesPathDest.html + '/*.html' )
                .pipe(
                    through2.obj(async (file, _, cb) => {
                    if (file.isBuffer()) {
                        const optimizedHtml = await ampOptimizer.transformHtml(file.contents.toString());
                        file.contents = Buffer.from(optimizedHtml);
                    }
                    cb(null, file);
                    })
                )
                .pipe( gulp.dest(filesPathDest.html) );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'amp_optimizer' after xxxx ms

}
exports.amp_optimizer = amp_optimizer;



// FIXME: Tarea Gulp: Validar AMP.
// FIXME: probar a ejecutar los comandos de validación de AMP con una funcion usando https://www.npmjs.com/package/gulp-exec
// Instalación: npm install --save-dev gulp-amphtml-validator
// Documentación: https://www.npmjs.com/package/gulp-amphtml-validator
function validar_amp(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'validar_amp'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp validar_amp!");  // Imprime el mensaje en la terminal
    return  gulp.src( filesPathDest.html + '/*.html' )

                 // Validate the input and attach the validation result to the "amp" property of the file object.
                 .pipe( gulpAmpValidator.validate() )

                 // Print the validation results to the console.
                 .pipe( gulpAmpValidator.format() )

                 // Exit the process with error code (1) if an AMP validation error occurred.
                 .pipe( gulpAmpValidator.failAfterError() );
                 //.pipe( gulpAmpValidator.failAfterWarningOrError() );  // To treat warnings as errors

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'validar_amp' after xxxx ms

}
exports.validar_amp = validar_amp;



// Tarea Gulp: watchear cuando se cambia algún archivo y ejecutar una lista de tareas Gulp. Y activar BrowserSync (ver explicación arriba).
// Instalación: COMANDO_INSTALACION
// Documentación: URL_A_NPMJS_COM
// Para ejecturarla, escribir en la terminal: gulp watch

// |- BrowserSync (sincronizar con el navegador).
//    Instalación: npm install --save-dev browser-sync
//    Documentación: https://browsersync.io/docs/gulp
//    Nota: browserSync inyecta el script #__bs_script__ y el div #motion-extension en el HTML mientras esté activo.
//    Nota: la URL Externa que aparece en la terminal puede ser usada para ver la web desde otro dispositivo, como el móvil.
//    Nota: las URL de UI dan información y opciones sobre BrowserSync.
function watch(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'watch'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp watch!");  // Imprime el mensaje en la terminal
    
    // BrowserSync (sincronizar con el navegador)
    browserSync.init( {  // Nota: browserSync.init(): el primer parámetro es la configuración. El parámetro "browser" indica en qué navegador se abrirá el browser sync. Solo es útil si usas un navegador distinto para uso normal y otro para desarrollo.
        server: {
            baseDir: filesPathDest.dist + "/" + localization  // Vamos a hacer browser-sync desde la carpeta dist.
        },
        browser: "chrome",  // El parámetro "browser" indica en qué navegador se abrirá el browser sync. Solo es útil si usas un navegador distinto para uso normal y otro para desarrollo.
        open: "external",  // Abrir en la URL de desarrollo externa (https://192.168.1.34:3000) en lugar de la local (http://localhost:3000).
        
        // Usar HTTPS en desarrollo local.
        /* Para generar los dos archivos del certificado (key y cert):
            Instrucciones: https://web.dev/how-to-use-local-https/#setup
            1. Instalar Chocolatey: https://chocolatey.org/
            2. Instalar mkcert (una vez en cada ordenador): desde la terminar abierta como administrador: choco install mkcert
            3. Add mkcert to your local root CAs (Certificate Authority): desde la terminar abierta como administrador: mkcert -install
            4. Generar los dos archivos: en la terminal desde la raiz del proyecto: mkcert URL_DESARROLLO.
                Ejemplos:
                    - URL local: mkcert localhost
                    - URL externa: mkcert 192.168.1.34
                    - Con virtual host: mkcert NOMBRE_PROYECTO.EXTENSION_LOCALHOST
            5. Enlazar los dos archivos que se generan más abajo.
            6. Cambiar en la variable url_desarrollo en este archivo.
        */
        https: {
            key: "192.168.1.42-key.pem",
            cert: "192.168.1.42.pem"
            /* key: "localhost-key.pem",
            cert: "localhost.pem" */
        }
    } );

    // Watchear cuando se cambia algún archivo y ejecutar una lista de tareas Gulp
    gulp.
        watch(
            [  // Archivos que se watchean
                // "**/*.html",  // Si se está usando kit, no poner esto, porque entra en bucle de browserSync.reload.
                filesPathSrc.html,  // Objeto filesPathSrc definido arriba.
                filesPathSrc.lang  // Objeto filesPathSrc definido arriba.
            ],
            gulp.series([  // Tareas Gulp que se ejecutan al haber un cambio en los archivos watcheados.
                "plantillas_html_con_multiidioma_y_manejar_errores",
            ])
        );
    
    gulp.
        watch(
            [  // Archivos que se watchean
                filesPathSrc.sass,  // Objeto filesPathSrc definido arriba.
            ],
            gulp.series([  // Tareas Gulp que se ejecutan al haber un cambio en los archivos watcheados.
                "convertir_sass_en_css_con_plantillas_y_sourcemaps_y_anadir_sufijo_min_y_manejar_errores",
            ])
        );
    
    gulp.
        watch(
            [  // Archivos que se watchean
                filesPathSrc.less,  // Objeto filesPathSrc definido arriba.
            ],
            gulp.series([  // Tareas Gulp que se ejecutan al haber un cambio en los archivos watcheados.
                "convertir_less_en_css_con_sourcemaps_y_anadir_sufijo_min_y_manejar_errores",
            ])
        );
    
    gulp.
        watch(
            [  // Archivos que se watchean
                filesPathSrc.js  // Objeto filesPathSrc definido arriba.
            ],
            gulp.parallel([  // Tareas Gulp que se ejecutan al haber un cambio en los archivos watcheados.
                "compilar_js_y_concatenar_y_minificar_y_anadir_sufijo_min"
            ])
        );
    
    gulp.
        watch(
            [  // Archivos que se watchean
                filesPathSrc.img  // Objeto filesPathSrc definido arriba.
            ],
            gulp.parallel([  // Tareas Gulp que se ejecutan al haber un cambio en los archivos watcheados.
                "generar_y_optimizar_imagenes_reponsive_con_cache"
            ])
        );
    
    gulp.
        watch(
            [  // Archivos que se watchean
                "./src/.htaccess",
                "./src/fonts/**/*",
                "./src/**/*.php",
                "./vendor/**/*",
                "./src/iframes/**/*"
            ],
            gulp.parallel([  // Tareas Gulp que se ejecutan al haber un cambio en los archivos watcheados.
                "copiar_otros_archivos_a_dist"
            ])
        );
    
    // Si algo cambia en dist durante el proceso watch, browserSync debe recargar la página.
    // MUY IMPORTANTE: aquí no hay que poner el CSS (ni el SCSS ni LESS), porque ya se actualiza el solo sin actualizar la página con la lína .pipe( browserSync.stream() ) en la función que convierte el SASS y el LESS en CSS.
    gulp
        .watch( [
                    filesPathSrc.html,
                    filesPathSrc.js,
                    // filesPathSrc.img,
                    "./src/.htaccess",
                    "./src/fonts/**/*",
                    "./src/**/*.php",
                    "./vendor/**/*",
                    "./src/iframes/**/*"
                ] )
        // .watch( "./dist/**/*.*" )
        .on('change', browserSync.reload);


    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'watch' after xxxx ms

}
exports.watch = watch;



// Tarea Gulp: limpiar la caché.
// Instalación: npm install --save-dev gulp-cache
// Documentación: https://www.npmjs.com/package/gulp-cache
// Para ejecturarla, escribir en la terminal: gulp borrar_cache
function borrar_cache(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'borrar_cache'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp borrar_cache!");  // Imprime el mensaje en la terminal
    return cache.clearAll(terminar_tarea);

}
exports.borrar_cache = borrar_cache;



// Tarea Gulp: borrar la carpeta dist.
// Instalación: npm install --save-dev del
// Documentación: https://www.npmjs.com/package/del
// Para ejecturarla, escribir en la terminal: gulp borrar_carpeta_dist
function borrar_carpeta_dist(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'borrar_carpeta_dist'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp borrar_carpeta_dist!");  // Imprime el mensaje en la terminal
    return del( [filesPathDest.dist + "/**/*"] );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'borrar_carpeta_dist' after xxxx ms

}
exports.borrar_carpeta_dist = borrar_carpeta_dist;



// Tarea Gulp: borrar la carpeta dist.
// Instalación: npm install --save-dev del
// Documentación: https://www.npmjs.com/package/del
// Para ejecturarla, escribir en la terminal: gulp borrar_carpeta_dist_excepto_img_y_video
function borrar_carpeta_dist_excepto_img_y_video(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'borrar_carpeta_dist_excepto_img_y_video'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp borrar_carpeta_dist_excepto_img_y_video!");  // Imprime el mensaje en la terminal
    return del( [
        filesPathDest.html + '/**/*.html',
        filesPathDest.css,
        filesPathDest.js,
        filesPathDest.iframes,
        filesPathDest.html + "/include",
        filesPathDest.html + "/partials",
        filesPathDest.html + "/vendor",
        filesPathDest.html + "/.htaccess",
        filesPathDest.html + "/robots.txt",
        filesPathDest.html + '/**/*.js',  // Service Workers
        filesPathDest.html + '/sitemap.xml',
    ] );

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'borrar_carpeta_dist_excepto_img_y_video' after xxxx ms

}
exports.borrar_carpeta_dist_excepto_img_y_video = borrar_carpeta_dist_excepto_img_y_video;



// Tarea Gulp: comprimir el proyecto en un ZIP para enviarlo a alguien.
// Nota: esto se puede hacer con WinRAR tranquilamente.
// Instalación: npm install --save-dev gulp-zip
// Documentación: https://www.npmjs.com/package/gulp-zip
// Para ejecturarla, escribir en la terminal: gulp comprimir_el_proyecto_en_un_zip_sin_node_modules
function comprimir_el_proyecto_en_un_zip_sin_node_modules(terminar_tarea) {
    
    // En la terminal, se indica el inicio de esta tarea con: Starting 'comprimir_el_proyecto_en_un_zip_sin_node_modules'...

    // Código que se ejecutará al ejecutar esta tarea de Gulp
    // console.log("Hola desde la tarea de Gulp comprimir_el_proyecto_en_un_zip_sin_node_modules!");  // Imprime el mensaje en la terminal
    return gulp
        .src( [
                "./**/*",
                "!./node_modules/**/*"
            ] )
        .pipe( zip("nombre_proyecto.zip") )  // Nombre del archivo comprimido en ZIP que se va a generar.
        .pipe( gulp.dest("./") )

    // Terminar esta tarea
    terminar_tarea(); // Corresponde con el mensaje de la terminal: Finished 'comprimir_el_proyecto_en_un_zip_sin_node_modules' after xxxx ms

}
exports.comprimir_el_proyecto_en_un_zip_sin_node_modules = comprimir_el_proyecto_en_un_zip_sin_node_modules;



//*** Tarea Gulp: build. ***//
exports.buildDev = series([
                            plantillas_html_con_multiidioma_y_manejar_errores,
                            convertir_sass_en_css_con_plantillas_y_sourcemaps_y_anadir_sufijo_min_y_manejar_errores,
                            // convertir_less_en_css_con_sourcemaps_y_anadir_sufijo_min_y_manejar_errores,  // No uso LESS en este proyecto.
                            compilar_js_y_concatenar_y_minificar_y_anadir_sufijo_min,
                            js_service_workers_minificar_y_anadir_sufijo_min,
                            // generar_y_optimizar_imagenes_reponsive_con_cache,  // NOTA: comentar para builds rápidas
                            copiar_otros_archivos_a_dist
                        ]);

exports.build = series([
                            borrar_carpeta_dist_excepto_img_y_video,
                            exports.buildDev,

                            // Añadir a continuación las tareas de Gulp que quiera ejecutar en build, pero no en watch.

                            combinar_css_y_eliminar_innecesario_y_minimizar_y_autoprefixer_y_borrar_comentarios,
                            inyectar_el_css_generado_en_style_tag,
                            inyectar_el_js_en_el_html,
                            borrar_enlaces_a_css,
                            minificar_html,
                            autoprefixer_css_en_linea,
                            minificar_json_en_linea,
                            minificar_archivos_json,
                            borrar_carpetas_innecesarias_de_dist,
                            reemplazar_url_desarrollo_por_url_produccion,
                            cambiar_nombres_archivos_en_otros_idiomas,
                            amp_optimizer,
                            reemplazar_otros_textos,
                            // FIXME: validar_amp
                            /* TODO: Validar AMP usando la terminar: ejecutar los siguientes comandos todos a la vez comprobar todas las páginas a la vez:
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/aviso-legal.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/contacto.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/error-403.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/error-404.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/error-405.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/error-500.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/error-505.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/gracias.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/index.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/politica-de-cookies.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/politica-de-privacidad.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/portfolio-individual-1.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/portfolio-individual-2.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/portfolio.html
                                amphtml-validator https://davidborge.es/pruebas/gulp-amp-template/sobre-nosotros.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/legal-notice.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/contact.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/error-403.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/error-404.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/error-405.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/error-500.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/error-505.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/thank-you.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/index.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/cookies-policy.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/privacy-policy.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/single-portfolio-1.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/single-portfolio-2.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/portfolio.html
                                amphtml-validator https://davidborge.com/pruebas/gulp-amp-template/about-us.html
                            */
                        ]);



//*** Tarea por defecto de Gulp. Se ejecuta al escribir solo "gulp" en la terminal. ***//
// En este caso, ejecuta todas las tareas y, después, la tarea watch.
exports.default = series([
                            exports.buildDev,
                            watch
                        ]);
