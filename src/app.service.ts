import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'REST Back-end Challenge 20201209 Running';
  }
}
