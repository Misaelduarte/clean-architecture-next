import { HttpClient } from '@/data/protocols/http-client';
import { AxiosHttpClient } from '@/infra/http-client/axios-http-client';

export function makeHttpClient(): HttpClient {
  return new AxiosHttpClient();
}
