import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { OrderService } from './order.service';
import { Logger } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';
import axios from 'axios';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrderController {

  constructor(private readonly articleService: OrderService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Return all articles.'})
  @Get()
  async findAll(@Query() query): Promise<void> {
    return await this.articleService.findAll(query);
  }


  @ApiOperation({ summary: 'Check if an order is supported based on distance' })
  @ApiResponse({ status: 200, description: 'Return article feed.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('/supported')
  async getFeed(@Query('destination') destination: number): Promise<boolean | void> {
    try {
        Logger.log('Requesting Google maps information...');
        const result = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${process.env.LOCATION}&units=imperial&key=${process.env.GOOGLE_MAPS_KEY}`);
        Logger.log('Google maps information retrieved. Calculating if supported...');
        const time = result.data?.rows?.[0]?.elements?.[0]?.duration?.value;
        const desiredTime = 15 * 60;
        const supported = time <= desiredTime;
        return supported;
    } catch (e) {
        Logger.error(`Something has gone wrong. Error: ${e}`);
        console.log(e)
    }
    // return await this.articleService.findFeed(userId, query);
  }

//   @Get(':slug')
//   async findOne(@Param('slug') slug): Promise<Order> {
//     return await this.articleService.findOne({slug});
//   }

//   @Get(':slug/comments')
//   async findComments(@Param('slug') slug): Promise<Order> {
//     return await this.articleService.findComments(slug);
//   }

}