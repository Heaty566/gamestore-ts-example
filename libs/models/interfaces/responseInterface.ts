export interface ResponseInterface<T> {
  success: boolean;
  msg: string;
  data: T;
}
