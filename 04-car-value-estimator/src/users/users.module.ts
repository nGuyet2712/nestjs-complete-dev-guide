import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.service';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/currrent-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // // CurrentUserInterceptor, // make the current user interceptor go controller scope
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor, // make the current user interceptor go globally -> it intercept any request handler
    // },
  ],
})
export class UsersModule {
  // apply current user middleware instead of applying current user interceptor
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
