import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import moment from 'moment';
import { performance } from 'perf_hooks';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: any, res: any, next: () => void) {
    const startTime = performance.now();
    const { ip, method, originalUrl: url } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const endTime = performance.now();
      const totalTime = (endTime - startTime).toFixed(2);

      console.info(
        `${method} ${url} - ${statusCode} ${totalTime}ms - ${userAgent} ${ip} - ${moment().format()}`,
      );
    });
    next();
  }
}
