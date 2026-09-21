import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://aceqsa.com';
const pages = [
  '/', '/nosotros.html', '/servicios.html', '/productos.html', '/ofertas.html',
  '/academia.html', '/referidos.html', '/noticias.html', '/trabaje-con-nosotros.html',
  '/metodos-pago.html', '/contacto.html', '/cotizador.html', '/ebooks.html',
  '/producto-almacenamiento.html', '/producto-redes.html', '/producto-computadoras.html',
  '/producto-partes.html', '/producto-perifericos.html', '/producto-accesorios.html',
  '/producto-impresion.html', '/producto-videojuegos.html', '/servicio-soporte.html',
  '/servicio-cableado.html', '/servicio-celulares.html'
];

export const options = {
  scenarios: {
    smoke: { executor: 'constant-vus', vus: 3, duration: '30s' },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1500', 'p(99)<2500'],
    checks: ['rate>0.99'],
  },
};

export default function () {
  for (const path of pages) {
    const res = http.get(`${BASE_URL}${path}`, { tags: { page: path } });
    check(res, {
      [`${path} status 2xx/3xx`]: r => r.status >= 200 && r.status < 400,
      [`${path} responds under 2.5s`]: r => r.timings.duration < 2500,
    });
  }
  sleep(1);
}
