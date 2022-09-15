export type HttpMethod = 'post' | 'get' | 'put' | 'patch' | 'delete';

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}
export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
  transformResponse?: boolean;
  transformPayload?: boolean;
  transformNumbers?: boolean;
};

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}
