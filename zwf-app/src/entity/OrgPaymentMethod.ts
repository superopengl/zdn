import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';



@Entity()
@Index('idx_paymentMethod_org_primary', ['orgId'], { where: '"primary" IS TRUE', unique: true })
export class OrgPaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('uuid')
  @Index()
  orgId: string;

  @Column({ default: false })
  primary: boolean;

  @Column()
  @Index()
  stripePaymentMethodId: string;

  @Column()
  cardBrand: string;

  @Column()
  cardExpiry: string;

  @Column()
  cardLast4: string;
}
