import http from 'k6/http';
import { check, sleep } from 'k6';

// La práctica se ejecuta únicamente contra la API local.
const baseUrl = (__ENV.BASE_URL || 'http://localhost:4000').replace(/\/$/, '');
if (baseUrl !== 'http://localhost:4000') {
  throw new Error('BASE_URL debe ser http://localhost:4000');
}

const vus = Number(__ENV.VUS || '1');
if (![1, 5, 20].includes(vus)) {
  throw new Error('VUS debe ser 1, 5 o 20');
}

// Cada corrida empieza con cero usuarios y dura 45 segundos.
export const options = {
  scenarios: {
    busqueda: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: vus },
        { duration: '30s', target: vus },
        { duration: '5s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<300'],
  },
};

// Se comprueban el estado HTTP y el formato de la lista, igual que en Postman.
export default function () {
  const response = http.get(baseUrl + '/productos/buscar?q=remera', {
    redirects: 0,
    responseCallback: http.expectedStatuses(200),
  });
  check(response, {
    'HTTP 200': (res) => res.status === 200,
    'productos es una lista': (res) => {
      try {
        return Array.isArray(res.json('productos'));
      } catch {
        return false;
      }
    },
  });
  sleep(1);
}
