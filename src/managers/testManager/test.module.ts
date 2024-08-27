import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { AuthMiddleware } from '../../auth.middleware';
import { ApiService } from '../apiManager/api.service';

@Module({
    imports: [],
    providers: [TestService],
    controllers: [TestController],
})
export class TestModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({ path: 'tests', method: RequestMethod.GET });
    }
}
