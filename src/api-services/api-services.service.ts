import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class ApiServicesService {
  constructor(private httpService: HttpService) {}

  async getHttpResponse(url: string): Promise<any> {
    return await this.httpService
      .get(url)
      .toPromise()
      .then((res) => {
        return res.data;
      });
  }
}
