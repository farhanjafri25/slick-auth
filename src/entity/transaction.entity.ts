import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn({ name: 'TransactionID' })
  TransactionID: string;

  @Column({
    name: 'UserID',
    unique: true,
    nullable: false,
  })
  userId: string;
  @Column({ name: 'Amount', unique: false, nullable: false })
  amount: number;

  @Column({ name: 'Timestamp', nullable: false, unique: false })
  timestamp: string;
}
