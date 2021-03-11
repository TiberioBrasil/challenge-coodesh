import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
      envFilePath: process.env.NODE_ENV !== 'production' ? '.env' : null,
      load: [appConfig],
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/', method: RequestMethod.GET })
      .forRoutes('');
  }
}
