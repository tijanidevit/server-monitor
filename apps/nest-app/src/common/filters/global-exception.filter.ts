import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resObj = exceptionResponse as any;
        
        if (Array.isArray(resObj.message) && resObj.message.length > 0 && resObj.message[0].property) {
          // We received raw ValidationError[] from class-validator
          message = 'The given data was invalid.';
          errors = {};
          resObj.message.forEach((err: any) => {
            errors[err.property] = Object.values(err.constraints || {});
          });
        } else if (resObj.errors) {
          // Fallback if errors were manually passed
          message = resObj.message || 'The given data was invalid.';
          errors = resObj.errors;
        } else if (Array.isArray(resObj.message)) {
          // Fallback for default ValidationPipe behavior
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
