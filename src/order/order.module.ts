import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { AuthMiddleware } from '../auth.middleware';

@Module({
  imports: [],
  providers: [OrderService],
  controllers: [
    OrderController
  ]
})
export class OrderModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'orders/supported', method: RequestMethod.GET},
        );
  }
}