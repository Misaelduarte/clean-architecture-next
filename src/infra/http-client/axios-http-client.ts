import axios, { AxiosResponse } from 'axios';
import humps from 'humps';

import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http-client';

const UPPER_LETTER_AND_NUMBER_REGEX = /(?=[A-Z0-9])/;

export class AxiosHttpClient implements HttpClient {
  async request({
    url,
    method,
    body,
    headers = {},
    transformPayload = true,
    transformResponse = true,
    transformNumbers = true,
  }: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    const humpsOptions = transformNumbers ? { split: UPPER_LETTER_AND_NUMBER_REGEX } : undefined;

    try {
      axiosResponse = await axios.request({
        url,
        method,
        data: transformPayload ? humps.decamelizeKeys(body, humpsOptions) : body,
        headers,
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }

    if (!axiosResponse) {
      return {
        statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
      };
    }

    return {
      statusCode: axiosResponse.status,
      body: transformResponse
        ? humps.camelizeKeys(axiosResponse.data, humpsOptions)
        : axiosResponse.data,
    };
  }
}
