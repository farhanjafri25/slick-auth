import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/transactions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/avg-trans-amt')
  public async avgTransaction(): Promise<number> {
    return this.appService.getAvgTransaction();
  }

  @Get('/all-trans')
  public async getAllTransaction(@Query() query: any): Promise<any> {
    const startDate =
      query?.startDate ||
      new Date(Number(new Date().getTime()) - 86400000).toISOString();
    const endDate = query?.endDate || new Date().toISOString();
    return this.appService.getTransInMonth(startDate, endDate);
  }

  @Get('/top-users')
  public async getTopUsers(@Query() query: any): Promise<any> {
    const startDate = query.startDate;
    const limit = query.limit;
    return this.appService.getTopUsers(startDate, limit);
  }
  @Get('/potential-users')
  public async getPotentialUsers(): Promise<any> {
    return this.appService.getPotentialUsers();
  }

  @Get('/loyalty-score')
  public async getLoyaltyScore(@Query() query: any): Promise<any> {
    const startDate =
      query?.startDate ||
      new Date(Number(new Date().getTime()) - 86400000).toISOString();
    const endDate = query?.endDate || new Date().toISOString();
    return this.appService.getLoyalUsers(startDate, endDate);
  }
}
