import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { SubscriptionBlockType } from '../types/SubscriptionBlockType';
import { ColumnNumericTransformer } from '../utils/ColumnNumericTransformer';
import { Payment } from './Payment';
import { Subscription } from './Subscription';

@Entity()
@Index(['orgId', 'startedAt'])
@Index(['subscriptionId', 'startedAt'])
@Index('idx_subscription_block_single_trial', ['orgId'], { where: `type = '${SubscriptionBlockType.Trial}'`, unique: true })
export class SubscriptionBlock {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  subscriptionId: string;

  @Column('uuid')
  orgId: string;

  @Column()
  type: SubscriptionBlockType;

  @Column('uuid', { nullable: true })
  parentBlockId: string;

  @Column('int')
  seats: number;

  @Column({ nullable: true })
  promotionCode: string;

  @Column('decimal', { transformer: new ColumnNumericTransformer(), nullable: false })
  unitPrice: number;

  @Column()
  startedAt: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @Column({ nullable: false })
  endingAt: Date;

  @OneToOne(() => Payment, payment => payment.subscriptionBlock, { onDelete: 'CASCADE', eager: false })
  payment: Payment;

  @ManyToOne(() => Subscription, subscription => subscription.blocks, { onDelete: 'CASCADE' })
  subscription: Subscription;
}
