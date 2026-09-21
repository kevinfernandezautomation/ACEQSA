# Pruebas de rendimiento ACEQSA con k6 + TypeScript

## Requisito
Instale k6 siguiendo la documentación oficial de Grafana.

## Ejecutar contra producción
k6 run aceqsa-sections.ts

## Ejecutar contra otro ambiente
BASE_URL=http://localhost:8080 k6 run aceqsa-sections.ts

## Criterios incluidos
- Menos de 1% de solicitudes HTTP fallidas.
- p95 menor de 1.5 s.
- p99 menor de 2.5 s.
- Más de 99% de checks exitosos.

Ajuste los umbrales después de establecer una línea base real de producción. No ejecute pruebas de carga intensivas contra producción sin autorización y una ventana controlada.
