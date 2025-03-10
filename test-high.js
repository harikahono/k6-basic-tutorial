import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50, // 50 Virtual Users
  duration: '1m', // Durasi tes: 1 menit
};

export default function () {
  let res = http.get('https://www.kampusgratis.id/api/auth/session');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}