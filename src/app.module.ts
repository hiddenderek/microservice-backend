import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TestModule } from './managers/testManager/test.module';
import { ApiModule } from './managers/apiManager/api.module';

@Module({
    imports: [TestModule, ApiModule],
    controllers: [AppController],
    providers: [],
})
export class ApplicationModule {
    constructor() {}
}
