export type GenericError<T extends string> = {
  errorType: T;
  explanation: string;
};
