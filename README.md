# ACEQSA – rediseño mejorado
Incluye sitio responsive, ES/EN, modo claro/oscuro, accesibilidad ampliada, iconos SVG de redes, WhatsApp, mapa, contacto, cotizador multítem, SEO técnico, sitemap, robots.txt y archivos de seguridad.

## Seguridad
El proyecto es estático y no almacena datos. Los formularios preparan un correo local. Se añadió CSP, referrer policy, `rel=noopener noreferrer`, validación y límites de longitud, `security.txt` y `_headers` para hosts compatibles. GitHub Pages no aplica `_headers`; para cabeceras HTTP reales se requiere Cloudflare/hosting compatible.

## Verificación recomendada
Ejecutar Lighthouse, axe/WAVE, validación HTML, pruebas de teclado, zoom 200–400 %, lector de pantalla, OWASP ZAP passive scan sobre el despliegue y revisión de cabeceras HTTP.
