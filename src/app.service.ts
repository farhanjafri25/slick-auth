import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private transactionRepository: TransactionRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  getAvgTransaction(): Promise<number> {
    return this.transactionRepository.getAvgTransactionAmt();
  }
  getTransInMonth(startDate: string, endDate: string): Promise<any> {
    return this.transactionRepository.getTransactionOnDate(startDate, endDate);
  }
  getTopUsers(startDate: string, limit: number): Promise<any> {
    return this.transactionRepository.topUsersInMonth(startDate, limit);
  }
  getPotentialUsers(): Promise<any> {
    return this.transactionRepository.potentialUsers();
  }
  getLoyalUsers(startDate: string, endDate: string): Promise<any> {
    return this.transactionRepository.loyaltyUsers(startDate, endDate);
  }
}
