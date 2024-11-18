import {
    Get,
    Post,
    Body,
    Put,
    Delete,
    Query,
    Param,
    Controller,
    InternalServerErrorException,
    Inject,
} from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './test.dto';
import { ApiBearerAuth, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { REQUEST } from '@nestjs/core';

@ApiBearerAuth()
@ApiTags('test')
@Controller('tests')
export class TestController {
    constructor(private readonly articleService: TestService, @Inject(REQUEST) private readonly request: { token: string }) {}

    @ApiOperation({ summary: 'Gets test data' })
    @ApiResponse({ status: 200, description: 'Returns test data' })
    @Get()
    async find(
        @Query('testid') testId: string,
        @Query('testvalue') testValue?: number,
        @Query('wowfactor') wowFactor?: string,
    ): Promise<Test[]> {
        try {
            return (await this.articleService.findTestData({ testId, testValue, wowFactor })) ?? [];
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e, 'Unknown Error');
        }
    }

    @ApiOperation({ summary: 'Posts test data' })
    @ApiResponse({ status: 200, description: 'Returns test data' })
    @Post()
    async post(@Body() body: Test): Promise<Test | null> {
        try {
            const result = new Test(body);
            return await this.articleService.postTestData(result);
        } catch (e) {
            throw new InternalServerErrorException(e, 'Unknown Error');
        }
    }

    @ApiOperation({ summary: 'Posts external data' })
    @ApiResponse({ status: 200, description: 'Returns test data' })
    @Post('/external')
    async postExternal(@Body() body: { testId: string }): Promise<Test | null> {
        try {
            return await this.articleService.recordExternalData(body.testId);
        } catch (e) {
            throw new InternalServerErrorException(e, 'Unknown Error');
        }
    }

    @ApiOperation({ summary: 'Upserts test data' })
    @ApiResponse({ status: 200, description: 'Returns test data' })
    @Post('/upsert')
    async postUpsert(@Body() body: Test): Promise<Test | null> {
        try {
            const result = new Test(body);
            return await this.articleService.upsertTestData(result);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e, 'Unknown Error');
        }
    }

    @ApiOperation({ summary: 'Updates test data' })
    @ApiResponse({ status: 200, description: 'Returns test data' })
    @Put('/update')
    async postUpdate(@Body() body: Test): Promise<Partial<Test> | null> {
        try {
            const result = new Test(body);
            return await this.articleService.updateTestData(result);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e, 'Unknown Error');
        }
    }

    @ApiOperation({ summary: 'Posts test data' })
    @ApiResponse({ status: 200, description: 'Returns test data' })
    @Delete()
    async delete(        
      @Query('testid') testId: string
    ): Promise<Test | null> {
        try {
            return await this.articleService.deleteTestData(testId);
        } catch (e) {
            throw new InternalServerErrorException(e, 'Unknown Error');
        }
    }
}
