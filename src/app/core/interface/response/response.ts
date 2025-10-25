import { NumberedHttpStatus } from '../../enums/numbered-http-status';

export interface ApResponse<T> {
  errors: [];
  data: T;
  message: string;
  exception: null;
  statusCode: NumberedHttpStatus;
}
