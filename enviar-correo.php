<?php
/**
 * =======================================================================
 * COMPROTIC — Procesador de Formulario de Contacto Institucional
 * =======================================================================
 * Destinatario: somos@comprotic.com.ve (Configurado en cPanel)
 * 
 * Este script procesa las solicitudes enviadas desde la Landing Page,
 * valida y sanitiza los campos, filtra bots mediante Honeypot, y envía
 * el correo vía SMTP directo (sockets) para máxima compatibilidad con
 * servidores cPanel donde la función nativa mail() está deshabilitada.
 * =======================================================================
 */

// Configurar cabeceras de respuesta JSON y seguridad
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Solo permitir peticiones POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Solo se aceptan peticiones POST.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    // -----------------------------------------------------------------------
    // 1. CONFIGURACIÓN INSTITUCIONAL Y SMTP (cPanel)
    // -----------------------------------------------------------------------
    $correoDestino   = 'somos@comprotic.com.ve';
    $nombreDestino   = 'COMPROTIC — UNEFA VIDI';
    $correoRemitente = 'somos@comprotic.com.ve';
    $asuntoBase      = 'Nueva Solicitud Institucional — Portal Web COMPROTIC';

    /**
     * Parámetros SMTP para cPanel:
     * Por defecto, los servidores cPanel aceptan conexiones directas en localhost:25
     * para correos destinados al propio dominio (@comprotic.com.ve) sin requerir contraseña.
     * Si su proveedor exige autenticación SMTP obligatoria, configure:
     *   'auth'     => true,
     *   'password' => 'SU_CONTRASEÑA_AQUÍ'
     */
    $smtpConfig = [
        'host'     => 'localhost',            // 'localhost', '127.0.0.1' o 'mail.comprotic.com.ve'
        'port'     => 25,                     // 25 (local), 465 (SSL), 587 (TLS)
        'secure'   => '',                     // '' para local, 'ssl' para puerto 465, 'tls' para 587
        'auth'     => false,                  // Cambiar a true si se define contraseña
        'username' => 'somos@comprotic.com.ve',
        'password' => ''                      // Contraseña del correo cPanel (si auth = true)
    ];

    // -----------------------------------------------------------------------
    // 2. RECEPCIÓN Y PROTECCIÓN CONTRA SPAM (HONEYPOT)
    // -----------------------------------------------------------------------
    $honeypot = isset($_POST['website_hp']) ? trim($_POST['website_hp']) : '';
    if (!empty($honeypot)) {
        // Simular éxito silencioso para despistar bots automatizados
        echo json_encode([
            'success' => true,
            'message' => 'Solicitud procesada correctamente.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // -----------------------------------------------------------------------
    // 3. CAPTURA Y SANITIZACIÓN DE CAMPOS
    // -----------------------------------------------------------------------
    $nombre      = isset($_POST['nombre']) ? trim(strip_tags($_POST['nombre'])) : '';
    $institucion = isset($_POST['institucion']) ? trim(strip_tags($_POST['institucion'])) : '';
    $email       = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $mensaje     = isset($_POST['mensaje']) ? trim(strip_tags($_POST['mensaje'])) : '';

    // -----------------------------------------------------------------------
    // 4. VALIDACIÓN ESTRICTA
    // -----------------------------------------------------------------------
    $errores = [];

    if (mb_strlen($nombre, 'UTF-8') < 3) {
        $errores[] = 'Por favor indique su nombre y apellido completo (mínimo 3 caracteres).';
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = 'El correo electrónico suministrado no posee un formato válido.';
    }

    if (mb_strlen($mensaje, 'UTF-8') < 10) {
        $errores[] = 'La descripción de su requerimiento debe contener al menos 10 caracteres.';
    }

    if (!empty($errores)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => implode(' ', $errores)
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // -----------------------------------------------------------------------
    // 5. FORMATEO DE INFORMACIÓN Y CONTEXTO TÉCNICO
    // -----------------------------------------------------------------------
    $institucionTexto = !empty($institucion) 
        ? htmlspecialchars($institucion, ENT_QUOTES, 'UTF-8') 
        : '<span style="color: #8892b0; font-style: italic;">No especificada / Solicitud particular</span>';

    date_default_timezone_set('America/Caracas');
    $fechaHora = date('d/m/Y - h:i:s A (T)');
    $ipRemitente = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'No disponible';

    // -----------------------------------------------------------------------
    // 6. RESPALDO LOCAL DE SEGURIDAD (Previene pérdida ante caídas del MTA)
    // -----------------------------------------------------------------------
    try {
        $backupDir = __DIR__ . '/registros-contacto';
        if (!is_dir($backupDir)) {
            @mkdir($backupDir, 0750, true);
            @file_put_contents($backupDir . '/.htaccess', "Order deny,allow\nDeny from all\n");
        }
        $backupFile = $backupDir . '/solicitud_' . date('Ymd_His') . '_' . substr(md5(uniqid()), 0, 6) . '.json';
        @file_put_contents($backupFile, json_encode([
            'fecha'       => $fechaHora,
            'nombre'      => $nombre,
            'email'       => $email,
            'institucion' => $institucion,
            'mensaje'     => $mensaje,
            'ip'          => $ipRemitente
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    } catch (\Throwable $tb) {
        // El fallo en respaldo local no interrumpe el flujo principal
    }

    // -----------------------------------------------------------------------
    // 7. CONSTRUCCIÓN DE LA PLANTILLA HTML INSTITUCIONAL
    // -----------------------------------------------------------------------
    $asuntoCompleto = "{$asuntoBase} — {$nombre}";

    $cuerpoHtml = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud Institucional — COMPROTIC</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #030712;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #f8fafc;
      line-height: 1.6;
    }
    .container {
      max-width: 650px;
      margin: 28px auto;
      background-color: #0f172a;
      border: 1px solid #334155;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
    }
    .header {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      padding: 30px 32px;
      text-align: center;
      border-bottom: 3px solid #38bdf8;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.5px;
    }
    .header p {
      margin: 8px 0 0;
      font-size: 15px;
      font-weight: 600;
      color: #e0f2fe;
      text-transform: uppercase;
      letter-spacing: 1.2px;
    }
    .content {
      padding: 32px 28px;
      background-color: #0f172a;
    }
    .badge {
      display: inline-block;
      background-color: #0369a1;
      border: 1px solid #38bdf8;
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      padding: 6px 18px;
      border-radius: 24px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 24px;
    }
    .field-card {
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 18px 22px;
      margin-bottom: 16px;
    }
    .field-label {
      font-size: 13px;
      font-weight: 700;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }
    .field-value {
      font-size: 18px;
      color: #ffffff;
      font-weight: 600;
      word-break: break-word;
      line-height: 1.5;
    }
    .field-value a {
      color: #38bdf8 !important;
      text-decoration: underline !important;
      font-weight: 700 !important;
      font-size: 18px !important;
    }
    .message-box {
      background-color: #020617;
      border-left: 5px solid #38bdf8;
      border-top: 1px solid #1e293b;
      border-right: 1px solid #1e293b;
      border-bottom: 1px solid #1e293b;
      border-radius: 8px;
      padding: 20px 22px;
      font-size: 17px;
      color: #f8fafc;
      white-space: pre-wrap;
      line-height: 1.7;
    }
    .footer {
      background-color: #090d16;
      border-top: 1px solid #1e293b;
      padding: 22px 28px;
      text-align: center;
      font-size: 13px;
      color: #94a3b8;
    }
    .footer strong {
      color: #cbd5e1;
    }
    .reply-tip {
      background-color: #172554;
      border: 1px solid #3b82f6;
      border-radius: 10px;
      padding: 16px 20px;
      font-size: 15px;
      color: #bfdbfe;
      margin-top: 24px;
      text-align: center;
      line-height: 1.6;
    }
    .reply-tip strong {
      color: #ffffff;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc; line-height: 1.6;">
  <div class="container" style="max-width: 650px; margin: 28px auto; background-color: #0f172a; border: 1px solid #334155; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);">
    
    <!-- Encabezado -->
    <div class="header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); background-color: #0284c7; padding: 30px 32px; text-align: center; border-bottom: 3px solid #38bdf8;">
      <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; text-shadow: 0 1px 2px rgba(0,0,0,0.25);">COMPROTIC — UNEFA VIDI</h1>
      <p style="margin: 8px 0 0; font-size: 15px; font-weight: 600; color: #e0f2fe; text-transform: uppercase; letter-spacing: 1.2px;">Notificación de Solicitud de Servicios</p>
    </div>

    <!-- Contenido Principal -->
    <div class="content" style="padding: 32px 28px; background-color: #0f172a;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span class="badge" style="display: inline-block; background-color: #0369a1; border: 1px solid #38bdf8; color: #ffffff; font-size: 13px; font-weight: 700; padding: 6px 18px; border-radius: 24px; text-transform: uppercase; letter-spacing: 1px;">
          ● Nueva Solicitud Recibida
        </span>
      </div>

      <!-- Campo Solicitante -->
      <div class="field-card" style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 18px 22px; margin-bottom: 16px;">
        <div class="field-label" style="font-size: 13px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
          Solicitante
        </div>
        <div class="field-value" style="font-size: 18px; color: #ffffff; font-weight: 600; word-break: break-word; line-height: 1.5;">
          {$nombre}
        </div>
      </div>

      <!-- Campo Correo Electrónico -->
      <div class="field-card" style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 18px 22px; margin-bottom: 16px;">
        <div class="field-label" style="font-size: 13px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
          Correo Electrónico de Contacto
        </div>
        <div class="field-value" style="font-size: 18px; color: #ffffff; font-weight: 600; word-break: break-word; line-height: 1.5;">
          <a href="mailto:{$email}" style="color: #38bdf8 !important; text-decoration: underline !important; font-weight: 700 !important; font-size: 18px !important; display: inline-block;">{$email}</a>
        </div>
      </div>

      <!-- Campo Institución -->
      <div class="field-card" style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 18px 22px; margin-bottom: 16px;">
        <div class="field-label" style="font-size: 13px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
          Institución / Ente Solicitante
        </div>
        <div class="field-value" style="font-size: 18px; color: #ffffff; font-weight: 600; word-break: break-word; line-height: 1.5;">
          {$institucionTexto}
        </div>
      </div>

      <!-- Campo Requerimiento -->
      <div class="field-card" style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 18px 22px; margin-bottom: 16px;">
        <div class="field-label" style="font-size: 13px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
          Descripción del Requerimiento
        </div>
        <div class="message-box" style="background-color: #020617; border-left: 5px solid #38bdf8; border-top: 1px solid #1e293b; border-right: 1px solid #1e293b; border-bottom: 1px solid #1e293b; border-radius: 8px; padding: 20px 22px; font-size: 17px; color: #f8fafc; white-space: pre-wrap; line-height: 1.7;">{$mensaje}</div>
      </div>

      <!-- Aviso de Respuesta Rápida -->
      <div class="reply-tip" style="background-color: #172554; border: 1px solid #3b82f6; border-radius: 10px; padding: 16px 20px; font-size: 15px; color: #bfdbfe; margin-top: 24px; text-align: center; line-height: 1.6;">
        💡 <strong style="color: #ffffff;">Atención directa:</strong> Puede pulsar directamente en <strong style="color: #ffffff;">"Responder"</strong> en su cliente de correo para escribirle de inmediato a <a href="mailto:{$email}" style="color: #38bdf8 !important; text-decoration: underline !important; font-weight: 700 !important;">{$email}</a>.
      </div>
    </div>

    <!-- Pie de Correo -->
    <div class="footer" style="background-color: #090d16; border-top: 1px solid #1e293b; padding: 22px 28px; text-align: center; font-size: 13px; color: #94a3b8;">
      <p style="margin: 0 0 8px;">
        <strong style="color: #cbd5e1;">Fecha de registro:</strong> {$fechaHora} &nbsp;|&nbsp; <strong style="color: #cbd5e1;">IP Remitente:</strong> {$ipRemitente}
      </p>
      <p style="margin: 0; font-size: 13px;">
        Mensaje generado automáticamente desde la plataforma web institucional de <strong style="color: #ffffff;">COMPROTIC</strong>.
      </p>
    </div>
  </div>
</body>
</html>
HTML;

    // -----------------------------------------------------------------------
    // 8. MOTOR DE ENVÍO SMTP DIRECTO (Pura implementación en sockets)
    // -----------------------------------------------------------------------
    $envioExitoso = false;
    $detalleError = '';

    // Intento 1: Envío vía SMTP Socket (Configurado)
    $envioExitoso = sendSmtpSocketMail(
        $smtpConfig['host'],
        $smtpConfig['port'],
        $smtpConfig['secure'],
        $smtpConfig['auth'] ? $smtpConfig['username'] : '',
        $smtpConfig['auth'] ? $smtpConfig['password'] : '',
        $correoRemitente,
        $nombreDestino,
        $correoDestino,
        $asuntoCompleto,
        $cuerpoHtml,
        $email,
        $nombre,
        $detalleError
    );

    // Intento 2: Fallback local en 127.0.0.1:25 si falló localhost
    if (!$envioExitoso && ($smtpConfig['host'] === 'localhost' || empty($smtpConfig['host']))) {
        $detalleError2 = '';
        $envioExitoso = sendSmtpSocketMail(
            '127.0.0.1',
            25,
            '',
            '',
            '',
            $correoRemitente,
            $nombreDestino,
            $correoDestino,
            $asuntoCompleto,
            $cuerpoHtml,
            $email,
            $nombre,
            $detalleError2
        );
        if ($envioExitoso) {
            $detalleError = '';
        }
    }

    // Intento 3: Si la función mail() nativa llegase a existir (no deshabilitada)
    if (!$envioExitoso && function_exists('mail')) {
        $encodedSubject = "=?UTF-8?B?" . base64_encode($asuntoCompleto) . "?=";
        $headersNative = [
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            "From: {$nombreDestino} <{$correoRemitente}>",
            "Reply-To: {$nombre} <{$email}>",
            'X-Mailer: PHP/' . phpversion()
        ];
        $headersString = implode("\r\n", $headersNative);
        $envioExitoso = @mail($correoDestino, $encodedSubject, $cuerpoHtml, $headersString, "-f {$correoRemitente}");
        if (!$envioExitoso) {
            $envioExitoso = @mail($correoDestino, $encodedSubject, $cuerpoHtml, $headersString);
        }
    }

    // -----------------------------------------------------------------------
    // 9. RESPUESTA AL CLIENTE
    // -----------------------------------------------------------------------
    if ($envioExitoso) {
        echo json_encode([
            'success' => true,
            'message' => '¡Solicitud enviada exitosamente! El equipo técnico de COMPROTIC ha recibido su mensaje en somos@comprotic.com.ve y se comunicará a la brevedad.'
        ], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(500);
        $msgFinal = 'No fue posible completar el envío en este momento. La solicitud ha quedado respaldada en el servidor. Por favor escriba a somos@comprotic.com.ve.';
        if (!empty($detalleError)) {
            $msgFinal .= " (Detalle técnico: {$detalleError})";
        }
        echo json_encode([
            'success' => false,
            'message' => $msgFinal
        ], JSON_UNESCAPED_UNICODE);
    }

} catch (\Throwable $t) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Ocurrió un error inesperado al procesar la solicitud: ' . $t->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

/**
 * Función autónoma de envío SMTP mediante Sockets nativos de PHP.
 * Funciona perfectamente en servidores donde mail() está deshabilitada.
 */
function sendSmtpSocketMail($host, $port, $secure, $user, $pass, $fromEmail, $fromName, $toEmail, $subject, $htmlBody, $replyToEmail, $replyToName, &$errorMsg = '') {
    $timeout = 12;
    $context = stream_context_create([
        'ssl' => [
            'verify_peer'       => false,
            'verify_peer_name'  => false,
            'allow_self_signed' => true
        ]
    ]);

    $prefix = (strtolower($secure) === 'ssl') ? 'ssl://' : '';
    $socket = @stream_socket_client($prefix . $host . ':' . $port, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
    
    if (!$socket) {
        $errorMsg = "Conexión rechazada en $host:$port ($errstr, código $errno)";
        return false;
    }

    stream_set_timeout($socket, $timeout);

    $readResponse = function($expectedCode) use ($socket, &$errorMsg) {
        $response = '';
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        $code = substr($response, 0, 3);
        if ($code !== (string)$expectedCode) {
            $errorMsg = "Respuesta inesperada del servidor SMTP: " . trim($response);
            return false;
        }
        return true;
    };

    $sendCommand = function($cmd, $expectedCode) use ($socket, $readResponse) {
        fputs($socket, $cmd . "\r\n");
        return $readResponse($expectedCode);
    };

    // Saludo inicial 220
    if (!$readResponse(220)) {
        fclose($socket);
        return false;
    }

    // Identificación EHLO
    $clientDomain = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'comprotic.com.ve';
    if (!$sendCommand("EHLO $clientDomain", 250)) {
        if (!$sendCommand("HELO $clientDomain", 250)) {
            fclose($socket);
            return false;
        }
    }

    // TLS dinámico si se solicita
    if (strtolower($secure) === 'tls') {
        if (!$sendCommand("STARTTLS", 220)) {
            fclose($socket);
            return false;
        }
        if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            $errorMsg = "Fallo en la negociación TLS segura";
            fclose($socket);
            return false;
        }
        if (!$sendCommand("EHLO $clientDomain", 250)) {
            fclose($socket);
            return false;
        }
    }

    // Autenticación SMTP AUTH LOGIN (si se especifican credenciales)
    if (!empty($user) && !empty($pass)) {
        if (!$sendCommand("AUTH LOGIN", 334)) {
            fclose($socket);
            return false;
        }
        if (!$sendCommand(base64_encode($user), 334)) {
            fclose($socket);
            return false;
        }
        if (!$sendCommand(base64_encode($pass), 235)) {
            fclose($socket);
            return false;
        }
    }

    // Dirección de origen (Envelope From)
    if (!$sendCommand("MAIL FROM:<$fromEmail>", 250)) {
        fclose($socket);
        return false;
    }

    // Dirección de destino (Envelope To)
    if (!$sendCommand("RCPT TO:<$toEmail>", 250)) {
        fclose($socket);
        return false;
    }

    // Inicio de cuerpo de datos DATA
    if (!$sendCommand("DATA", 354)) {
        fclose($socket);
        return false;
    }

    // Construcción de cabeceras MIME
    $encodedSubject   = "=?UTF-8?B?" . base64_encode($subject) . "?=";
    $encodedFromName  = "=?UTF-8?B?" . base64_encode($fromName) . "?=";
    $encodedReplyName = "=?UTF-8?B?" . base64_encode($replyToName) . "?=";

    $headers = [
        "Date: " . date('r'),
        "To: <$toEmail>",
        "From: $encodedFromName <$fromEmail>",
        "Reply-To: $encodedReplyName <$replyToEmail>",
        "Subject: $encodedSubject",
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "Content-Transfer-Encoding: 8bit",
        "X-Mailer: COMPROTIC-SmtpEngine/2.5 (cPanel Optimized)",
        "X-Priority: 1 (Highest)"
    ];

    $payload = implode("\r\n", $headers) . "\r\n\r\n" . $htmlBody . "\r\n.";
    fputs($socket, $payload . "\r\n");

    if (!$readResponse(250)) {
        fclose($socket);
        return false;
    }

    // Finalizar sesión SMTP
    $sendCommand("QUIT", 221);
    fclose($socket);
    return true;
}
