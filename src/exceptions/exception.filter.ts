import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";

@Catch()
export class ExceptionsFilter implements ExceptionsFilter {
    constructor(private readonly httpAdapter: AbstractHttpAdapter) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        
        const responseBody = {
            statusCode: httpStatus,
            message: exception instanceof HttpException ? exception.message : undefined,
            timestamp: new Date().toISOString(),
            path: this.httpAdapter.getRequestUrl(ctx.getRequest())
        }

        this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
    }
}