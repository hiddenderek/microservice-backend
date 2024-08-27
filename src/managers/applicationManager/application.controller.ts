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
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationPost, ApplicationResult } from './application.dto';
import { ApiBearerAuth, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('application')
@Controller('application')
export class ApplicationController {
    constructor(private readonly articleService: ApplicationService) {}


    @ApiOperation({ summary: 'Posts test data' })
    @ApiResponse({ status: 200, description: 'Returns test data' })
    @Post('/user')
    async post(@Body() body: ApplicationPost): Promise<ApplicationResult | null> {
        try {
            const result = new ApplicationPost(body);
            return await this.articleService.postApplicationData(result);
        } catch (e) {
            throw new InternalServerErrorException(e, 'Unknown Error');
        }
    }
}
