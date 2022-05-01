<?php

/**** PASO 1: Instalar PHP Mailer ****/
/*
    Fuente: https://github.com/PHPMailer/PHPMailer
    
    1.1. Paso previo: Instalar composer, que es un gestor de paquetes PHP:
       1.1.1. Descargar composer: https://getcomposer.org/
       1.1.2. Instalar composer en el ordenador.
       1.1.3. Reiniciar el ordenador.

    1.2. Instalar PHP Mailer:
       1.2.1. En la carpeta del proyecto, ejecutar en la terminal: composer require phpmailer/phpmailer
*/




/**** PASO 2: Importar PHP Mailer ****/

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
// TODO: poner bien esta ruta.
require '../vendor/autoload.php';




/**** PASO 3: Recoger las variables del formulario ****/
// TODO: rellenar estos datos.
// TODO: comentar en desarrollo
// Nota: $_POST['valor_del_atributo_name_en_la_etiqueta_input_o_textarea_en_el_html']
// FIXME: ¿no se puede hacer sin tener que crear una variable para cada una?
$campo_formulario_nombre_y_apellidos = $_POST['nombre_y_apellidos'];
$campo_formulario_correo_electronico = $_POST['correo_electronico'];
$campo_formulario_telefono           = $_POST['telefono'];
$campo_formulario_mensaje            = $_POST['mensaje'];

// Campos de prueba para debugear con Visual Studio Code
// TODO: comentar en producción
/* $campo_formulario_nombre_y_apellidos = "Mi nombre y apellidos de prueba";
$campo_formulario_correo_electronico = "micorreodeprueba@micorreodeprueba.com";
$campo_formulario_mensaje            = "Mi mensaje de prueba."; */


/**** PASO 4: Configuración del correo ****/


/** PASO 4.1: Configuración del correo - Crear el correo de tipo PHPMailer **/
// CUIDADO: si se pone el parámetro true, activamos que el try catch pueda cazar excepciones de PHPMailer.
$correo_a_enviar = new PHPMailer(); // defaults to using php "mail()"; the true param means it will throw exceptions on errors, which we need to catch
// $correo_a_enviar = new PHPMailer(true); // defaults to using php "mail()"; the true param means it will throw exceptions on errors, which we need to catch

// Try-catch para cazar los errores de PHPMailer y de PHP en general.
try {

    /** PASO 4.2: Configuración del correo - Si quiero debuggear **/
    // TODO: CUIDADO: para usar el formulario, hay que poner esto a 0, porque si no, el JSON que se devuelve contiene los mensajes de error en lugar de solo el valor de success
    // 0 = no debuggear
    // 1 = errors and messages
    // 2 = messages only
    // 3 = Enable verbose debug output
    $correo_a_enviar->SMTPDebug  = 0;


    /** PASO 4.3: Configuración del correo - CharSet **/
    // CharSet a UTF-8 para que no haya problemas con los caracteres no ingleses
    $correo_a_enviar->CharSet = 'UTF-8';


    /** PASO 4.4: Configuración del correo - ¿El contenido del body es HTML? **/
    // TODO: cambiar a false si el contenido del body NO es HTML
    $correo_a_enviar->isHTML(true);


    /** PASO 4.5: Configuración del correo - Crear y configurar cuenta de Gmail para enviar los correos **/
    /* 4.5.1. Crear cuenta de Gmail.
    4.5.2. Apuntar datos de la cuenta en el documento del proyecto (correo, contraseña, correo de recuperación, cumpleaños).
    4.5.3. Activar "Less secure app access": "Manage your Google account" > "Security" > "Less secure app access" > Activar.
    */


    /** PASO 4.6: Configuración SMTP que se va a usar para mandar el correo **/
    // TODO: rellenar estos datos
    $correo_a_enviar->isSMTP();
    $correo_a_enviar->Host = 'smtp.gmail.com';
    $correo_a_enviar->SMTPAuth = true;
    $correo_a_enviar->Username = 'enviar.formulario.prueba@gmail.com';  // Correo electrónico
    $correo_a_enviar->Password = 'DG9("v6<Vapj-cCs';
    $correo_a_enviar->SMTPSecure = 'tls';
    $correo_a_enviar->Port = 587;

    /* $correo_a_enviar->SMTPSecure = 'ssl';
    $correo_a_enviar->Port = 465; */


    /** PASO 4.7: Configuración del correo - Desde qué cuenta va a poner que se manda el correo **/
    // NOTA IMPORTANTE: al usar SMTP, el correo desde el que llega es el que se haya puesto en la configuración SMTP (PASO 4.6), este campo de correo es ignorado.
    // TODO: Poner nombre y correo.
    $correo_a_enviar->setFrom( "enviar.formulario.prueba@gmail.com", "NOMBRE_PROYECTO" );


    /** PASO 4.8: Configuración del correo - A qué correos se va a mandar el correo (receptor normal, CC y BCC) **/

    // Receptor/es
    // TODO: añadir receptor/es
    $correo_a_enviar->addAddress( 'david.borge.olmedo@gmail.com', 'David Borge Olmedo' );
    // $correo_a_enviar->addAddress( 'correo_receptor_1@correo_receptor_1.com', 'Nombre Receptor 1' );

    // CC
    // TODO: añadir CC
    // $correo_a_enviar->addCC( 'correo-receptor-cc-1@correo-receptor-cc-1.com', 'Nombre Receptor CC 1' );

    // BCC
    // TODO: añadir BCC
    // $correo_a_enviar->addBCC( 'correo-receptor-cc-1@correo-receptor-cc-1.com', 'Nombre Receptor BCC 1' );


    /** PASO 4.9: Configuración del correo - A quién se responde **/
    // TODO: cambiar dirección de ReplyTo si hace falta
    $correo_a_enviar->addReplyTo( $campo_formulario_correo_electronico, $campo_formulario_nombre_y_apellidos );  // Si quiero que se responda a la persona que ha enviado el formulario
    // $correo_a_enviar->addReplyTo('info@example.com', 'Information');  // También se puede poner a mano en lugar de usar una variable


    /** PASO 4.10: Configuración del correo - Asunto del correo **/
    // TODO: cambiar asunto
    $correo_a_enviar->Subject = 'Contacto web - NOMBRE_PROYECTO - '.$campo_formulario_nombre_y_apellidos;


    /** PASO 4.11: Configuración del correo - Cuerpo del correo (en HTML) **/
    // TODO: cuerpo del correo (en HTML)
    // FIXME: añadir plantilla HTML cogiendo alguna de MailChimp, si es necesario.
    $correo_a_enviar->Body = "<p><strong>Nombre y apellidos:</strong> " . $campo_formulario_nombre_y_apellidos . "</p>" . 
                             "<p><strong>Correo electrónico:</strong> " . $campo_formulario_correo_electronico . "</p>" . 
                             "<p><strong>Teléfono:</strong> "           . $campo_formulario_telefono . "</p>" . 
                             "<p><strong>Mensaje:</strong><br/>"        . nl2br(htmlspecialchars($campo_formulario_mensaje)) . "</p>" . 
                             "<p style='margin-top:60px;font-style:italic'>Este mensaje fue enviado desde el <strong>formulario de contacto</strong> de la web de <strong>NOMBRE_EMPRESA</strong> (<a href='URL_PAGINA_DE_FORMULARIO'>URL_PAGINA_DE_FORMULARIO</a>).</p>";


    /** PASO 4.12: Configuración del correo - Cuerpo del correo (en texto plano para clientes sin HTML) **/
    // TODO: cuerpo del correo (en texto plano para clientes sin HTML)
    $correo_a_enviar->AltBody = $campo_formulario_nombre_y_apellidos . ' - ' . $campo_formulario_correo_electronico . ' - ' . $campo_formulario_mensaje;




    /**** PASO 5: Validar reCAPTCHA ****/


    /** PASO 5.1: Cuenta de Gmail que tiene este reCAPTCHA: **/
    // TODO: rellenar correo y contraseña:
    // Entrar en: https://www.google.com/u/0/recaptcha/admin/
    // Correo: david.borge.olmedo@gmail.com
    // Contraseña: —


    /** PASO 5.2: Validar reCAPTCHA - Clave del sitio web (clave pública) **/
    // TODO: Poner la clave de sitio web (clave pública) en el atributo data-sitekey del la etiqueta amp-recaptcha-input del formulario en el HTML


    /** PASO 5.3: Validar reCAPTCHA - Clave secreta **/
    // TODO: poner la clave secreta en esta variable:
    $recaptcha_clave_secreta = "6LeDKjQdAAAAAKB8CP2iV_8Lm7dJPuOiC_zw_46D";


    /** PASO 5.4: Validar reCAPTCHA - Conectar con el verificador del recaptcha y obtener la respuesta (que estará en la variable boleana $validacion_de_recaptcha->success). **/
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify'; 
    $recaptcha_response = $_POST['recaptcha_token']; 
    $validacion_de_recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_clave_secreta . '&response=' . $recaptcha_response); 
    $validacion_de_recaptcha = json_decode($validacion_de_recaptcha);

    /* Nota: valores internos de $validacion_de_recaptcha:
        {
        "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
        "score": number             // the score for this request (0.0 - 1.0)
        "action": string            // the action name for this request (important to verify)
        "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
        "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
        "error-codes": [...]        // optional
        }
    */




    /**** PASO 6: Preparar las cabeceras de la respuesta que voy a devolver al formulario ****/


    /** PASO 6.1: Preparar las cabeceras de la respuesta que voy a devolver al formulario - Las necesarias para indicar éxito o error en la respuesta **/
    // Nota: van asociadas al contenido de devolver_exito() y devolver_error()
    $domain_url = (isset($_SERVER['HTTPS']) ? "https" : "http") .  "://$_SERVER[HTTP_HOST]";
    header("Content-type: application/json");  // En AMP hay que devolver un JSON con los valores que quieras y que se pueden usar en un amp-moustache.
    header("AMP-Access-Control-Allow-Source-Origin: " . $domain_url);
    header("Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin");


    /** PASO 6.2: Preparar las cabeceras de la respuesta que voy a devolver al formulario - Redirección a la página de gracias **/
    // Nota: esto no hace falta si uso los mensajes de error y éxito de submit-success y submit-error
    // TODO: cambiar URL de la página de gracias
    /* header('AMP-Redirect-To: https://PENDIENTE.es/PENDIENTE.html');
    header('Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To'); */




    /**** PASO 7: En función de la validación de reCAPTCHA, o enviar el correo o enviar un mensaje de error. ****/

    // Si la validación de reCAPTCHA ha fallado, enviar un mensaje de error
    if ( $validacion_de_recaptcha->success == false ) {

        // Si hay que devolver texto
        // echo "La validación de reCAPTCHA ha fallado.";

            // Devolver error
            devolver_error();

            // En este array pongo los datos que quiera mostrar en el <template type="amp-mustache"> de <div submit-error> del formulario.
            echo json_encode( array(
                'estado_recaptcha' => 'NO válido',
                'se_ha_enviado_el_correo' => 'No se ha llegado ni a validar el reCAPTCHA',
                'nombre_y_apellidos_desde_enviar_formulario_contacto' => $campo_formulario_nombre_y_apellidos,
                'correo_electronico_desde_enviar_formulario_contacto' => $campo_formulario_correo_electronico,
                'telefono_desde_enviar_formulario_contacto' => $campo_formulario_telefono,
                'mensaje_desde_enviar_formulario_contacto' => $campo_formulario_mensaje
                ) );
    }

    // Si la validación de reCAPTCHA ha sido exitosa, enviar el correo
    else if ( $validacion_de_recaptcha->success == true ) {

        // Si el correo se ha enviado correctamente, enviar un mensaje de éxito
        if ( $correo_a_enviar->Send() ) {

            // Si hay que devolver texto
            // echo 'Correo enviado correctamente y reCAPTCHA validado correctamente!';
            
            // Devolver éxito
            devolver_exito();

            // En este array pongo los datos que quiera mostrar en el <template type="amp-mustache"> de <div submit-error> del formulario.
            echo json_encode( array(
                'estado_recaptcha' => 'Válido',
                'puntuacion_recaptcha' => $validacion_de_recaptcha->score,
                'se_ha_enviado_el_correo' => 'El correo se ha enviado correctamente',
                'nombre_y_apellidos_desde_enviar_formulario_contacto' => $campo_formulario_nombre_y_apellidos,
                'correo_electronico_desde_enviar_formulario_contacto' => $campo_formulario_correo_electronico,
                'telefono_desde_enviar_formulario_contacto' => $campo_formulario_telefono,
                'mensaje_desde_enviar_formulario_contacto' => $campo_formulario_mensaje
                ) );

        }
        
        // Si ha habido algún problema al enviar el correo (aunque reCAPTCHA fue validado correctamente)
        else {

            // Si hay que devolver texto
            // echo 'Error al enviar el correo, aunque reCAPTCHA fue validado correctamente.';

            // Devolver error
            devolver_error();

            // En este array pongo los datos que quiera mostrar en el <template type="amp-mustache"> de <div submit-error> del formulario.
            echo json_encode( array(
                'estado_recaptcha' => 'Válido',
                'puntuacion_recaptcha' => $validacion_de_recaptcha->score,
                'se_ha_enviado_el_correo' => 'Ha habido algún problema al enviar el correo',
                'nombre_y_apellidos_desde_enviar_formulario_contacto' => $campo_formulario_nombre_y_apellidos,
                'correo_electronico_desde_enviar_formulario_contacto' => $campo_formulario_correo_electronico,
                'telefono_desde_enviar_formulario_contacto' => $campo_formulario_telefono,
                'mensaje_desde_enviar_formulario_contacto' => $campo_formulario_mensaje,
                'error' => 'reCAPTCHA válido, pero ha habido algún problema al enviar el correo'
                ) );
        }

    }

} catch (phpmailerException $e) {  // Excepciones de PHPMailer

    // Devolver error
    devolver_error();

    // En este array pongo los datos que quiera mostrar en el <template type="amp-mustache"> de <div submit-error> del formulario.
    echo json_encode( array(
        'estado_recaptcha' => 'Válido',
        'puntuacion_recaptcha' => $validacion_de_recaptcha->score,
        'se_ha_enviado_el_correo' => 'Ha habido algún problema al enviar el correo',
        'nombre_y_apellidos_desde_enviar_formulario_contacto' => $campo_formulario_nombre_y_apellidos,
        'correo_electronico_desde_enviar_formulario_contacto' => $campo_formulario_correo_electronico,
        'telefono_desde_enviar_formulario_contacto' => $campo_formulario_telefono,
        'mensaje_desde_enviar_formulario_contacto' => $campo_formulario_mensaje,
        'error' => $e->errorMessage()  // Pretty error messages from PHPMailer
        ) );

} catch (Exception $e) {  // Excepciones de todo lo demás

    // Devolver error
    devolver_error();

    // En este array pongo los datos que quiera mostrar en el <template type="amp-mustache"> de <div submit-error> del formulario.
    echo json_encode( array(
        'estado_recaptcha' => 'Válido',
        'puntuacion_recaptcha' => $validacion_de_recaptcha->score,
        'se_ha_enviado_el_correo' => 'Ha habido algún problema al enviar el correo',
        'nombre_y_apellidos_desde_enviar_formulario_contacto' => $campo_formulario_nombre_y_apellidos,
        'correo_electronico_desde_enviar_formulario_contacto' => $campo_formulario_correo_electronico,
        'telefono_desde_enviar_formulario_contacto' => $campo_formulario_telefono,
        'mensaje_desde_enviar_formulario_contacto' => $campo_formulario_mensaje,
        'error' => $e->getMessage()  // Mensajes de error de PHP
        ) );
}



// MUY IMPORTANTE: esto indica el estado de la respuesta. En este caso, exitosa.
function devolver_exito() {

    header("HTTP/1.1 200 OK");
    
}

// MUY IMPORTANTE: esto indica el estado de la respuesta. En este caso, fallida.
function devolver_error() {

    header("HTTP/1.1 404 Not Found");
    
}




/**** MUY IMPORTANTE: PASO 8: Debuggear ****/
/*
    Se ven los mensajes de error en la consola de desarrollo de Chrome:
        · Consola.
        · Poner $correo_a_enviar->SMTPDebug a un valor distinto de 0. Después, en el apartado "Network" en herramientas de desarrollo de Chrome, click en la llamada con el nombre de este archivo PHP, pestaña "Response".
*/


// FIXME: añadir attatchments (ver db.com)