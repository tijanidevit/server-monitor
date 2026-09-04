import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any[] | undefined = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resObj = exceptionResponse as any;
        
        // Handle NestJS built-in ValidationPipe errors which return an array of strings in `message`
        if (Array.isArray(resObj.message)) {
          message = 'Validation failed';
          errors = resObj.message.map((msg: string) => ({ message: msg }));
        } else {
          message = resObj.message || resObj.error || exception.message;
        }
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
        message = exception.message;
    }

    response.status(status).json({
      success: false,
      message,
      ...(errors && { errors }),
    });
  }
}
