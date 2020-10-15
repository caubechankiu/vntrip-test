import { Catch, ArgumentsHost, HttpException, HttpStatus, Logger, ExceptionFilter } from '@nestjs/common';

const ERROR_TYPE = {
  UNKNOW: 'UNKNOW',
  VALIDATION: 'VALIDATION',
  NORMAL: 'NORMAL',
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private errorMessages: { [name: string]: string };
  constructor(errorMessages: { [name: string]: string }) {
    this.errorMessages = errorMessages;
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    Logger.error(exception);
    if (exception instanceof HttpException) {
      const exceptionResponse: any = exception.getResponse();
      const exceptionStatus: number = exception.getStatus();
      if (Array.isArray(exceptionResponse.message) && typeof exceptionResponse.message[0] === 'string') {
        return response.status(exception.getStatus()).json({
          code: undefined,
          type: ERROR_TYPE.VALIDATION,
          message: exceptionResponse.message[0],
        });
      }
      if (exceptionResponse.code) {
        return response.status(exceptionStatus).json({
          ...exceptionResponse,
          type: ERROR_TYPE.NORMAL,
          message: this.errorMessages[exceptionResponse.code],
        });
      } else if (exceptionResponse.message) {
        return response.status(exceptionStatus).json({
          ...exceptionResponse,
          type: ERROR_TYPE.UNKNOW,
        });
      }
    }
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: undefined,
      type: ERROR_TYPE.UNKNOW,
      message: exception ? (exception as any).message : undefined,
      error: exception,
    });
  }
}
