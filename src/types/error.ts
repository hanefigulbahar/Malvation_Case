export interface ErrorDetail {
  data: string;
  error: Error;
  internal: boolean;
  status: number;
  statusText: string;
}

export interface Error {
  message: string;
  stack: string;
}
