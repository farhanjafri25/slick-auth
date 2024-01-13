import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class TransactionRepository extends Repository<TransactionRepository> {
  constructor(private db: Connection) {
    super();
  }
  public async getAvgTransactionAmt() {
    const query = `select AVG(Amount) from users.transactions`;
    const res = await this.db.query(query);
    return res;
  }

  public async getTransactionOnDate(startDate: string, endDate: string) {
    const query = `select * from users.transactions where Timestamp between "${startDate}" and "${endDate}"`;
    const res = await this.db.query(query);
    return res;
  }

  public async topUsersInMonth(startDate: string, limit: number) {
    const query = `select UserID, SUM(amount) as amount from users.transactions where Timestamp >= DATE_SUB("${startDate}", INTERVAL 1 MONTH)
        and Timestamp < "${startDate}"
        group by UserID
        order by amount desc
        limit ${limit}`;
    const res = await this.db.query(query);
    return res;
  }

  public async potentialUsers() {
    const query = `select UserID from users.transactions where Timestamp >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
        and Timestamp < CURDATE()
        group by UserID HAVING COUNT(Distinct TransactionID) > (
    select count(DISTINCT TransactionID) from users.transactions where Timestamp >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH)
        and Timestamp < DATE_SUB(curdate(), INTERVAL 1 MONTH)
        group by UserID
        limit 1)`;
    const res = await this.db.query(query);
    return res;
  }

  public async loyaltyUsers(startDate: string, endDate: string) {
    const query = `select UserId, (0.4 * transactionCount + 0.6 * amount) as loyalty
        from (select UserID,
            percent_rank() over (Order by count(distinct TransactionId)) as transactionCount,
            percent_rank() over (order by sum(amount)) as amount
            from users.transactions where Timestamp between "${startDate}" and "${endDate}"
            group by UserID
            ) as loyaltyPoint order by loyalty desc`;
    const res = await this.db.query(query);
    return res;
  }
}
