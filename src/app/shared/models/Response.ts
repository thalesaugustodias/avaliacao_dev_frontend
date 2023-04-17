export interface Response{
  collections: any;
  message: string;
  hasErrors: boolean;
  errorMessages: Array<string>;
  statusCode: number;
  count: number;
}
