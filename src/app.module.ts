import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TestModule } from './managers/testManager/test.module';
import { ApiModule } from './managers/apiManager/api.module';
import { ApplicationModule2 } from './managers/applicationManager/application.module';

@Module({
    imports: [TestModule, ApplicationModule2, ApiModule],
    controllers: [AppController],
    providers: [],
})
export class ApplicationModule {
    constructor() {}
}
