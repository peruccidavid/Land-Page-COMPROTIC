<?php
/**
 * =======================================================================
 * COMPROTIC — Procesador de Formulario de Contacto Institucional
 * =======================================================================
 * Destinatario: somos@comprotic.com.ve (Configurado en cPanel)
 * 
 * Este script procesa las solicitudes enviadas desde la Landing Page,
 * valida y sanitiza los campos, filtra bots mediante Honeypot, y envía
 * un correo en formato HTML institucional con cabecera Reply-To directa.
 * =======================================================================
 */

// Configurar cabeceras de respuesta JSON y CORS (si aplica)
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

// -----------------------------------------------------------------------
// 1. CONFIGURACIÓN INSTITUCIONAL
// -----------------------------------------------------------------------
$correoDestino   = 'somos@comprotic.com.ve';
$nombreDestino   = 'COMPROTIC — UNEFA VIDI';
$correoRemitente = 'somos@comprotic.com.ve'; // Debe pertenecer a tu dominio cPanel para validar SPF/DKIM
$asuntoBase      = 'Nueva Solicitud Institucional — Portal Web COMPROTIC';

// -----------------------------------------------------------------------
// 2. RECEPCIÓN Y PROTECCIÓN CONTRA SPAM (HONEYPOT)
// -----------------------------------------------------------------------
// Campo trampa para bots: si tiene contenido, es un bot automatizado
$honeypot = isset($_POST['website_hp']) ? trim($_POST['website_hp']) : '';
if (!empty($honeypot)) {
    // Simular éxito silencioso para despistar al bot
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

// Si hay errores de validación, responder al cliente
if (!empty($errores)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errores)
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// -----------------------------------------------------------------------
// 5. FORMATEO DE INFORMACIÓN
// -----------------------------------------------------------------------
$institucionTexto = !empty($institucion) 
    ? htmlspecialchars($institucion, ENT_QUOTES, 'UTF-8') 
    : '<span style="color: #8892b0; font-style: italic;">No especificada / Solicitud particular</span>';

// Datos de contexto técnico
date_default_timezone_set('America/Caracas');
$fechaHora = date('d/m/Y - h:i:s A (T)');
$ipRemitente = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'No disponible';

// -----------------------------------------------------------------------
// 6. CONSTRUCCIÓN DEL CORREO ELECTRÓNICO (PLANTILLA HTML INSTITUCIONAL)
// -----------------------------------------------------------------------
$asuntoCompleto = "=?UTF-8?B?" . base64_encode("{$asuntoBase} — {$nombre}") . "?=";

$cuerpoHtml = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud Institucional</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #070b12;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
      line-height: 1.6;
    }
    .container {
      max-width: 640px;
      margin: 30px auto;
      background: #0c121e;
      border: 1px solid #1e293b;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.6);
    }
    .header {
      background: linear-gradient(135deg, #004c9e 0%, #0085bf 100%);
      padding: 28px 32px;
      text-align: center;
      border-bottom: 2px solid #38bdf8;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.5px;
    }
    .header p {
      margin: 6px 0 0;
      font-size: 13px;
      color: #e0f2fe;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content {
      padding: 32px;
    }
    .badge {
      display: inline-block;
      background-color: rgba(0, 133, 191, 0.2);
      border: 1px solid #0085bf;
      color: #38bdf8;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 20px;
    }
    .field-card {
      background-color: #111a2b;
      border: 1px solid #1e2d45;
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 14px;
    }
    .field-label {
      font-size: 11px;
      font-weight: 600;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 4px;
    }
    .field-value {
      font-size: 15px;
      color: #ffffff;
      font-weight: 500;
      word-break: break-word;
    }
    .field-value a {
      color: #38bdf8;
      text-decoration: none;
    }
    .message-box {
      background-color: #070b12;
      border-left: 4px solid #0085bf;
      border-radius: 6px;
      padding: 16px 20px;
      font-size: 14px;
      color: #cbd5e1;
      white-space: pre-wrap;
      line-height: 1.7;
    }
    .footer {
      background-color: #080c14;
      border-top: 1px solid #172030;
      padding: 20px 32px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
    .footer strong {
      color: #94a3b8;
    }
    .reply-tip {
      background: rgba(56, 189, 248, 0.08);
      border: 1px dashed rgba(56, 189, 248, 0.4);
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 12px;
      color: #7dd3fc;
      margin-top: 24px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>COMPROTIC — UNEFA VIDI</h1>
      <p>Notificación de Solicitud de Servicios</p>
    </div>

    <div class="content">
      <div style="text-align: center;">
        <span class="badge">● Nueva Solicitud Recibida</span>
      </div>

      <div class="field-card">
        <div class="field-label">Solicitante</div>
        <div class="field-value">{$nombre}</div>
      </div>

      <div class="field-card">
        <div class="field-label">Correo Electrónico de Contacto</div>
        <div class="field-value">
          <a href="mailto:{$email}">{$email}</a>
        </div>
      </div>

      <div class="field-card">
        <div class="field-label">Institución / Ente Solicitante</div>
        <div class="field-value">{$institucionTexto}</div>
      </div>

      <div class="field-card">
        <div class="field-label">Descripción del Requerimiento</div>
        <div class="message-box">{$mensaje}</div>
      </div>

      <div class="reply-tip">
        💡 <strong>Atención directa:</strong> Puede pulsar directamente en <strong>"Responder"</strong> en su cliente de correo para escribirle de inmediato a <strong>{$email}</strong>.
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 6px;">
        <strong>Fecha de registro:</strong> {$fechaHora} | <strong>IP Remitente:</strong> {$ipRemitente}
      </p>
      <p style="margin: 0;">
        Mensaje generado automáticamente desde la plataforma web institucional de <strong>COMPROTIC</strong>.
      </p>
    </div>
  </div>
</body>
</html>
HTML;

// -----------------------------------------------------------------------
// 7. CABECERAS MIME (RFC 2822 / UTF-8)
// -----------------------------------------------------------------------
$cabeceras = [];
$cabeceras[] = 'MIME-Version: 1.0';
$cabeceras[] = 'Content-Type: text/html; charset=UTF-8';
$cabeceras[] = "From: {$nombreDestino} <{$correoRemitente}>";
$cabeceras[] = "Reply-To: {$nombre} <{$email}>";
$cabeceras[] = 'X-Mailer: PHP/' . phpversion();
$cabeceras[] = 'X-Priority: 1 (Highest)';

// -----------------------------------------------------------------------
// 8. ENVÍO VÍA FUNCIÓN NATIVA MAIL() DE CPANEL (EXIM MTA)
// -----------------------------------------------------------------------
$headersString = implode("\r\n", $cabeceras);
$parametroAdicional = "-f {$correoRemitente}";

$envioExitoso = @mail($correoDestino, $asuntoCompleto, $cuerpoHtml, $headersString, $parametroAdicional);

// Si falló con el parámetro adicional -f, intentar envío estándar
if (!$envioExitoso) {
    $envioExitoso = @mail($correoDestino, $asuntoCompleto, $cuerpoHtml, $headersString);
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
    echo json_encode([
        'success' => false,
        'message' => 'No fue posible enviar el correo en este momento. Por favor escriba directamente a somos@comprotic.com.ve.'
    ], JSON_UNESCAPED_UNICODE);
}
