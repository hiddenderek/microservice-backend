import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { AuthMiddleware } from '../../auth.middleware';
import { ApiService } from '../apiManager/api.service';

@Module({
    imports: [],
    providers: [ApplicationService],
    controllers: [ApplicationController],
})
export class ApplicationModule2 implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({ path: 'tests', method: RequestMethod.GET });
    }
}
