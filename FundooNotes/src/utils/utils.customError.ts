// src/utils/customError.ts

export class CustomError extends Error {
  public code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = this.constructor.name; // set the error name to the class name
  }
}
