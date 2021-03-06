import { HttpModule, Module } from '@nestjs/common';
import { ApiServicesService } from './api-services.service';

@Module({
  imports: [HttpModule],
  providers: [ApiServicesService],
  exports: [ApiServicesService],
})
export class ApiServicesModule {}
