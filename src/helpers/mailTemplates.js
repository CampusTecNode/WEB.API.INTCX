const resetPasswordTemplate = (resetLink) => {
  return `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablece tu contraseña</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #E4002B;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
        }
        .content p {
            margin-bottom: 20px;
        }
        .content a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #E4002B;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
            background-color: #f4f4f4;
        }
        .footer p {
            margin: 5px 0;
        }
        .footer a {
            color: #E4002B;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Solicitud para restablecer la contraseña</h1>
        </div>
        <div class="content">
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el botón a continuación para continuar con el proceso:</p>
            <p style="text-align: center;">
                <a href="${ resetLink }" target="_blank">Restablecer Contraseña</a>
            </p>
            <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo o ponerte en contacto con el soporte si tienes preguntas.</p>
            <p>Gracias,<br>El equipo de soporte</p>
        </div>
        <div class="footer">
            <p>Si tienes problemas para hacer clic en el botón "Restablecer Contraseña", copia y pega la URL siguiente en tu navegador:</p>
            <p><a href="${ resetLink }">${ resetLink }</a></p>
            <p>© 2024 Tu Empresa. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
  `;
}

module.exports = {
  resetPasswordTemplate,
};