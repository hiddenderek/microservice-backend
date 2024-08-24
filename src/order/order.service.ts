import { Injectable } from '@nestjs/common';

import { Order } from './order.interface';;

@Injectable()
export class OrderService {
  constructor(
  ) {}

  async findAll(query): Promise<void> {
    
  }
}