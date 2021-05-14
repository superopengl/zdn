import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm';
import { PaymentMethod } from '../types/PaymentMethod';
import { PaymentStatus } from '../types/PaymentStatus';
import { ColumnNumericTransformer } from '../utils/ColumnNumericTransformer';
import { CreditTransaction } from './CreditTransaction';
import { Subscription } from './Subscription';

@Entity()
@Index(['orgId', 'createdAt'])
@Index(['subscriptionId', 'paidAt'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @Generated('increment')
  seqId: number;

  @CreateDateColumn()
  createdAt?: Date;

  @Column('uuid')
  @Index()
  orgId: string;

  @Column('decimal', { transformer: new ColumnNumericTransformer(), nullable: false })
  amount: number;

  @Column({ nullable: true })
  stripeCustomerId?: string;

  @Column({ nullable: true })
  stripePaymentMethodId?: string;

  @Column('json', { nullable: true })
  rawResponse: object;

  @Column()
  @Index()
  status: PaymentStatus;

  @Column({nullable: true})
  @Index()
  paidAt?: Date;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column({ default: false })
  auto: boolean;

  @Column({ default: 1 })
  attempt: number;

  @ManyToOne(() => Subscription, subscription => subscription.payments, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'subscriptionId', referencedColumnName: 'id'})
  subscription: Subscription;

  @Column()
  subscriptionId: string;

  @OneToOne(() => CreditTransaction, { nullable: true, cascade: true })
  @JoinColumn({ name: 'creditTransactionId', referencedColumnName: 'id' })
  creditTransaction: CreditTransaction;

  @Column('uuid', { nullable: true })
  creditTransactionId: string;

  @Column('json', { nullable: true })
  geo: object;
}